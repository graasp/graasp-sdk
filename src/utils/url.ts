/**
 * This function helps to ensure to construct good urls.
 * With standard urls like the followings, it exist a risk to not have the attempted url:
 *
 * - additional_path = 'test-1';
 * - url_with_trail = 'http://localhost:3001/items/short-links/';
 * - url_no_trail = 'http://localhost:3001/items/short-links';
 *
 * Here *url_no_trail* doesn't end with a trail, the URL obtained from:
 * - `const url = new URL(additional_path, url_no_trail);`
 * - will be "http://localhost:3001/items/test-1"
 * - instead of "http://localhost:3001/items/short-links/test-1".
 *
 * This function solves this problem by ensuring to have a path ending with a trail.
 *
 * @param baseURL The current url to append the path.
 * @param pathname The path to add at the end of the base url separated by a trail.
 * @returns The new URL object.
 */
export function appendPathToUrl({
  baseURL,
  pathname,
}: {
  baseURL: string;
  pathname?: string;
}) {
  const url = new URL(baseURL);
  const { origin } = url;
  // If there are zero or more than one forward slashes at the end,
  // it replaces them with a single forward slash.
  let path = url.pathname.replace(/\/?$/, '/');

  if (pathname) {
    // Remove all the trails at the beginning of the pathname
    path += pathname.replace(/^\/+/, '');
  }

  return new URL(path, origin);
}

/**
 * Utility method to append new query parameters to a url.
 * The initial url is allowed to contain some query parameters already.
 * Any key in the `params` argument will override the value of already present query parameters in `initialUrl`.
 * @param initialUrl a string representing the url that you want to append queries to
 * @param params an object of key values that should be added to the query string of the url
 * @param overrideExisting a boolean that controls whether the keys in the `params` object
 * should override existing keys or be added (default)
 * @returns new string representing the url with added parameters
 */
export const appendQueryParamToUrl = (
  initialUrl: string,
  params: { [key: string]: string },
  overrideExisting = false,
): string => {
  const url = new URL(initialUrl);
  const queryString = new URLSearchParams(url.search);
  Object.entries(params).forEach(([key, value]) =>
    overrideExisting
      ? queryString.set(key, value)
      : queryString.append(key, value),
  );
  url.search = queryString.toString();
  return url.toString();
};
