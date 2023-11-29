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
