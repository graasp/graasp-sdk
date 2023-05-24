
const isoDateFormat =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

const isIsoDateString = (value: any): boolean =>
  value && isoDateFormat.test(value);

export const parseStringToDate = (data: any): any => {
  if (!data || typeof data === 'string') {
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
