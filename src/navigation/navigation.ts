import { getUrlForRedirection } from '../cookie/cookie.js';

type RedirectOptions = {
  openInNewTab?: boolean;
  name?: string;
};

type TargetType = {
  open: (
    url?: string | URL | undefined,
    target?: string | undefined,
    features?: string | undefined,
  ) => void;
  location: { assign: (url: string | URL) => void };
};

/**
 * Redirect to url supplied in the parameters
 * @param  {TargetType} target window object on which to act
 * @param  {string} url link to redirect to
 * @param  {RedirectOptions} options
 */
export const redirect = (
  target: TargetType,
  url: string,
  options?: RedirectOptions,
) => {
  const { openInNewTab = false, name = '_blank' } = options ?? {};

  if (openInNewTab) {
    target.open(url, name);
  } else {
    target.location.assign(url);
  }
};

/**
 * Redirect to url saved in a cookie
 * @param  {TargetType} target window object on which to act
 * @param  {string} defaultLink link to redirect to if no url for redirection is defined
 * @param  {RedirectOptions} options
 * @returns {false|void} return false if no redirection has been triggered
 */
export const redirectToSavedUrl = (
  target: TargetType,
  defaultLink?: string,
  options?: RedirectOptions,
) => {
  const link = getUrlForRedirection();
  // prevent / to avoid possible infinite loop
  if (link && link !== '/') {
    return redirect(target, link, options);
  }
  if (defaultLink) {
    return redirect(target, defaultLink, options);
  }

  return false;
};

/**
 * @deprecated Use `buildPdfViewerURL` instead
 * Return a link to display a pdf, embedded in a custom pdf viewer if provided
 * @param assetsUrl assets url where the pdf viewer is hosted
 * @returns embedded link to display a pdf
 */
export const buildPdfViewerLink = (assetsUrl?: string) =>
  assetsUrl ? `https://${assetsUrl}/pdf-viewer/web/viewer.html?file=` : '';

/**
 * Returns the URL object of the resource that hosts a pdf viewer
 * If url contains protocol and path, it needs to end with a trailing
 * slash otherwise the last segment will be dropped
 * @param assetsUrl assets url where the pdf viewer is hosted
 * @returns embedded link to display a pdf
 */
export const buildPdfViewerURL = (assetsUrl?: string): URL | undefined => {
  if (!assetsUrl) {
    console.debug('No assets url provided');
    return undefined;
  }

  let baseUrl = '';
  // check if input contains protocol
  try {
    baseUrl = new URL(assetsUrl).href;
  } catch {
    // is not a valid url, so we should append the protocol
    baseUrl = `https://${assetsUrl}`;
  }
  return new URL('pdf-viewer/web/viewer.html', baseUrl);
};
