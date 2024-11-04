import { isByteLength } from './isByteLength.js';
import { isFQDN } from './isFQDN.js';
import { isIP } from './isIP.js';
import { merge } from './utils.js';

type EmailOptions = {
  allowDisplayName: boolean;
  allowUnderscores: boolean;
  requireDisplayName: boolean;
  allowUtf8LocalPart: boolean;
  requireTld: boolean;
  blacklistedChars: string;
  /**
   * Email should not be longer then 254 chars.
   * If you want to allow longer email, set this setting to `true`
   * @default false
   */
  ignoreMaxLength: boolean;
  hostBlacklist: string[];
  hostWhitelist: string[];
  domainSpecificValidation: boolean;
  allowIpDomain: boolean;
};

const DEFAULT_EMAIL_OPTIONS = {
  allowDisplayName: false,
  allowUnderscores: false,
  requireDisplayName: false,
  allowUtf8LocalPart: true,
  requireTld: true,
  blacklistedChars: '',
  ignoreMaxLength: false,
  hostBlacklist: [],
  hostWhitelist: [],
  domainSpecificValidation: false,
  allowIpDomain: false,
} satisfies EmailOptions;

const splitNameAddress = /^([^\x00-\x1F\x7F-\x9F]+)</i;
const emailUserPart = /^[a-z\d!#$%&'*+\-/=?^_`{|}~]+$/i;
const gmailUserPart = /^[a-z\d]+$/;
const quotedEmailUser =
  /^([\s\x01-\x08\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
const emailUserUtf8Part =
  /^[a-z\d!#$%&'*+\-/=?^_`{|}~\u00A1-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
const quotedEmailUserUtf8 =
  /^([\s\x01-\x08\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
const DEFAULT_MAX_EMAIL_LENGTH = 254;

/**
 * Validate display name according to the RFC2822: https://tools.ietf.org/html/rfc2822#appendix-A.1.2
 * @param {String} displayName
 */
function validateDisplayName(displayName: string) {
  const display_name_without_quotes = displayName.replace(/^"(.+)"$/, '$1');
  // display name with only spaces is not valid
  if (!display_name_without_quotes.trim()) {
    return false;
  }

  // check whether display name contains illegal character
  const contains_illegal = /[.";<>]/.test(display_name_without_quotes);
  if (contains_illegal) {
    // if contains illegal characters,
    // must to be enclosed in double-quotes, otherwise it's not a valid display name
    if (display_name_without_quotes === displayName) {
      return false;
    }

    // the quotes in display name must start with character symbol \
    const all_start_with_back_slash =
      display_name_without_quotes.split('"').length ===
      display_name_without_quotes.split('\\"').length;
    if (!all_start_with_back_slash) {
      return false;
    }
  }

  return true;
}

export function isEmail(str: string, userOptions: Partial<EmailOptions>) {
  const options = merge(userOptions, DEFAULT_EMAIL_OPTIONS);

  if (options.requireDisplayName || options.allowDisplayName) {
    const display_email = splitNameAddress.exec(str);
    if (display_email) {
      let display_name = display_email[1];

      // Remove display name and angle brackets to get email address
      // Can be done in the regex but will introduce a ReDOS (See  #1597 for more info)
      str = str.replace(display_name, '').replace(/(^<|>$)/g, '');

      // sometimes need to trim the last space to get the display name
      // because there may be a space between display name and email address
      // eg. myname <address@gmail.com>
      // the display name is `myname` instead of `myname `, so need to trim the last space
      if (display_name.endsWith(' ')) {
        display_name = display_name.slice(0, -1);
      }

      if (!validateDisplayName(display_name)) {
        return false;
      }
    } else if (options.requireDisplayName) {
      return false;
    }
  }

  if (!options.ignoreMaxLength && str.length > DEFAULT_MAX_EMAIL_LENGTH) {
    return false;
  }

  const parts = str.split('@');
  const domain = parts.pop();

  // domain should be specified
  if (!domain) {
    return false;
  }

  const lower_domain = domain.toLowerCase();

  if (options.hostBlacklist.includes(lower_domain)) {
    return false;
  }

  if (
    options.hostWhitelist.length > 0 &&
    !options.hostWhitelist.includes(lower_domain)
  ) {
    return false;
  }

  let user = parts.join('@');

  if (
    options.domainSpecificValidation &&
    (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com')
  ) {
    /*
    Previously we removed dots for gmail addresses before validating.
    This was removed because it allows `multiple..dots@gmail.com`
    to be reported as valid, but it is not.
    Gmail only normalizes single dots, removing them from here is pointless,
    should be done in normalizeEmail
    */
    user = user.toLowerCase();

    // Removing sub-address from username before gmail validation
    const username = user.split('+')[0];

    // Dots are not included in gmail length restriction
    if (!isByteLength(username.replace(/\./g, ''), { min: 6, max: 30 })) {
      return false;
    }

    const user_parts = username.split('.');
    for (const part of user_parts) {
      if (!gmailUserPart.test(part)) {
        return false;
      }
    }
  }

  if (
    options.ignoreMaxLength === false &&
    (!isByteLength(user, { max: 64 }) || !isByteLength(domain, { max: 254 }))
  ) {
    return false;
  }

  if (
    !isFQDN(domain, {
      requireTld: options.requireTld,
      ignoreMaxLength: options.ignoreMaxLength,
      allowUnderscores: options.allowUnderscores,
    })
  ) {
    if (!options.allowIpDomain) {
      return false;
    }

    if (!isIP(domain)) {
      if (!domain.startsWith('[') || !domain.endsWith(']')) {
        return false;
      }

      const noBracketDomain = domain.slice(1, -1);

      if (noBracketDomain.length === 0 || !isIP(noBracketDomain)) {
        return false;
      }
    }
  }

  if (options.blacklistedChars) {
    if (user.search(new RegExp(`[${options.blacklistedChars}]+`, 'g')) !== -1)
      return false;
  }

  if (user.startsWith('"') && user.endsWith('"')) {
    user = user.slice(1, user.length - 1);
    return options.allowUtf8LocalPart
      ? quotedEmailUserUtf8.test(user)
      : quotedEmailUser.test(user);
  }

  const pattern = options.allowUtf8LocalPart
    ? emailUserUtf8Part
    : emailUserPart;

  const user_parts = user.split('.');
  for (const part of user_parts) {
    if (!pattern.test(part)) {
      return false;
    }
  }

  return true;
}
