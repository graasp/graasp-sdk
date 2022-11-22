import qs from 'qs';

import { DEFAULT_PROTOCOL, PROTOCOL_REGEX } from '../config';
import { getUrlForRedirection } from './cookie';

interface RedirectOptions {
  openInNewTab?: boolean;
  name?: string;
}

/**
 * @param  {string} url link to redirect to
 * @param  {RedirectOptions} options
 */
export const redirect = (url: string, options?: RedirectOptions) => {
  const { openInNewTab = false, name = '_blank' } = options ?? {};

  if (openInNewTab) {
    window.open(url, name);
  } else {
    window.location.assign(url);
  }
};

/**
 * @param  {string} defaultLink link to redirect to if no url for redirection is defined
 * @param  {RedirectOptions} options
 * @returns {false|void} return false if no redirection has been triggered
 */
export const redirectToSavedUrl = (
  defaultLink?: string,
  options?: RedirectOptions,
) => {
  const link = getUrlForRedirection();
  // prevent / to avoid possible infinite loop
  if (link && link !== '/') {
    return redirect(link, options);
  }
  if (defaultLink) {
    return redirect(defaultLink, options);
  }

  return false;
};

/**
 * @param  {string} host authentication host
 * @returns {string} sign in path
 */
export const buildSignInPath = ({ host }: { host: string }) => `${host}/signin`;

/**
 * @deprecated This definition will be removed, please use the new variant with the `origin` property instead.
 */
type OldBuildItemLinkParams = {
  protocol?: string;
  host: string;
  itemId: string;
  chatOpen?: boolean;
};

/**
 * @param {string | {hostName: string; protocol: string}} origin the full origin for the url (i.e. https://example.com)
 * @param {string} itemId the id of the ite you would like to redirect to
 * @param {boolean=} chatOpen whether to open the chat in the builder
 */
type BuildItemLinkParams = {
  origin: string | { hostName: string; protocol?: string };
  itemId: string;
  chatOpen?: boolean;
};
interface BuildItemLinkFunc {
  /** @deprecated
   * Use { origin: string | { hostName: string; protocol: string }; itemId: string; chatOpen?: boolean; } object instead
   * */
  (args: OldBuildItemLinkParams): string;

  (args: BuildItemLinkParams): string;
}

export const buildItemLinkForBuilder: BuildItemLinkFunc = (
  args: BuildItemLinkParams | OldBuildItemLinkParams,
): string => {
  const { itemId, chatOpen } = args;
  let origin;
  if ('origin' in args) {
    if (typeof args.origin === 'string') {
      origin = args.origin;
    } else {
      origin = `${args.origin.protocol}://${args.origin.hostName}`;
    }
  } else {
    // todo: LEGACY code, will be removed once the Old type is removed
    // check if the host contains the protocol
    const hostIncludesProto = args.host.match(PROTOCOL_REGEX);
    if (hostIncludesProto) {
      origin = args.host;
    } else {
      origin = `${args.protocol || DEFAULT_PROTOCOL}://${args.host}`;
    }
  }

  return `${origin}/items/${itemId}${qs.stringify(
    { chat: chatOpen },
    { addQueryPrefix: true },
  )}`;
};

/**
 * Return a link to display a pdf, embedded in a custom pdf viewer if provided
 * @param assetsUrl assets url where the pdf viewer is hosted
 * @returns embedded link to display a pdf
 */
export const buildPdfLink = (assetsUrl?: string) =>
  assetsUrl
    ? `https://${assetsUrl}/pdf-viewer/web/viewer.html?file=`
    : '';
