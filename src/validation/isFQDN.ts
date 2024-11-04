import { merge } from './utils.js';

const DEFAULT_FQDN_OPTIONS = {
  requireTld: true,
  allowUnderscores: false,
  allowTrailingDot: false,
  allowNumericTld: false,
  allowWildcard: false,
  ignoreMaxLength: false,
} satisfies FQDNOptions;

type FQDNOptions = {
  /**
   * Require presence of top level domain
   * @default true
   */
  requireTld: boolean;
  /**
   * Allow underscores in the domain name
   * @default false
   */
  allowUnderscores: boolean;
  /**
   * Allow trailing dot
   * @default false
   */
  allowTrailingDot: boolean;
  /**
   * Allow numeric top level domain
   * @default false
   */
  allowNumericTld: boolean;
  /**
   * Allow wildcard domain
   * @default false
   */
  allowWildcard: boolean;
  /**
   * Ignore max length for domain name
   * @default false
   */
  ignoreMaxLength: boolean;
};

export function isFQDN(str: string, userOptions: Partial<FQDNOptions>) {
  const options = merge(userOptions, DEFAULT_FQDN_OPTIONS);

  /* Remove the optional trailing dot before checking validity */
  if (options.allowTrailingDot && str.endsWith('.')) {
    str = str.substring(0, str.length - 1);
  }

  /* Remove the optional wildcard before checking validity */
  if (options.allowWildcard === true && str.startsWith('*.')) {
    str = str.substring(2);
  }

  const parts = str.split('.');
  const tld = parts[parts.length - 1];

  if (options.requireTld) {
    // disallow fqdns without tld
    if (parts.length < 2) {
      return false;
    }

    if (
      !options.allowNumericTld &&
      !/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(
        tld,
      )
    ) {
      return false;
    }

    // disallow spaces
    if (/\s/.test(tld)) {
      return false;
    }
  }

  // reject numeric TLDs
  if (!options.allowNumericTld && /^\d+$/.test(tld)) {
    return false;
  }

  return parts.every((part) => {
    if (part.length > 63 && !options.ignoreMaxLength) {
      return false;
    }

    if (!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    }

    // disallow full-width chars
    if (/[\uff01-\uff5e]/.test(part)) {
      return false;
    }

    // disallow parts starting or ending with hyphen
    if (/(^-)|(-$)/.test(part)) {
      return false;
    }

    if (!options.allowUnderscores && /_/.test(part)) {
      return false;
    }

    return true;
  });
}
