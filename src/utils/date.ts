import { differenceInDays, intlFormat, intlFormatDistance } from 'date-fns';

type TYear = `${number}${number}${number}${number}`;
type TMonth = `${number}${number}`;
type TDay = `${number}${number}`;
type THours = `${number}${number}`;
type TMinutes = `${number}${number}`;
type TSeconds = `${number}${number}`;
type TMilliseconds = `${number}${number}${number}`;

/**
 * Represent a string like `2021-01-08`
 */
type TDateISODate = `${TYear}-${TMonth}-${TDay}`;

/**
 * Represent a string like `14:42:34.678`
 */
type TDateISOTime = `${THours}:${TMinutes}:${TSeconds}.${TMilliseconds}`;

/**
 * Represent a string like `2021-01-08T14:42:34.678Z` (format: ISO 8601).
 *
 * It is not possible to type more precisely (list every possible values for months, hours etc) as
 * it would result in a warning from TypeScript:
 *   "Expression produces a union type that is too complex to represent. ts(2590)
 */
type TDateISO = `${TDateISODate}T${TDateISOTime}Z`;

const isoDateFormat =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

export const formatDate = (
  datetime: Date | undefined,
  args: { locale: string; defaultValue?: string },
): string => {
  const { locale, defaultValue = 'Unknown' } = args;
  if (!datetime) {
    return defaultValue;
  }
  try {
    const now = new Date();

    // return human readable date if less than a month ago
    if (differenceInDays(now, datetime) < 7) {
      return intlFormatDistance(datetime, now, { locale });
    }

    // compute best intl date
    return intlFormat(
      datetime,
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      },
      { locale },
    );
  } catch (e) {
    console.error(e);
    return defaultValue;
  }
};

const isIsoDateString = (value: string): value is TDateISO =>
  Boolean(value && isoDateFormat.test(value));

export const parseStringToDate = (data: any): any => {
  if (!data) {
    return data;
  }
  if (typeof data === 'string') {
    if (isIsoDateString(data)) {
      return new Date(data);
    }
    return data;
  }
  if (Array.isArray(data)) {
    return data.map(parseStringToDate);
  }
  if (typeof data === 'object') {
    const d = Object.entries(data).map(([k, v]) => {
      if (typeof v === 'string' && isIsoDateString(v)) {
        return [k, new Date(v)];
      }
      if (Array.isArray(v)) {
        return [k, parseStringToDate(v)];
      }
      if (typeof v === 'object') {
        return [k, parseStringToDate(v)];
      }
      return [k, v];
    });
    return Object.fromEntries(d);
  }

  return data;
};
