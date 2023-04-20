import { Record, Seq } from 'immutable';

export function convertJs<T>(data: T) {
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  if (Array.isArray(data) || data instanceof Map) {
    return Seq<any>(data).map(convertJs).toList();
  }

  if (data instanceof Date) {
    return data;
  }

  if (typeof data === 'object') {
    const Factory = Record(data as unknown as object);

    return new Factory(Seq<any>(data).map(convertJs));
  }

  throw new Error(`data type '${typeof data}' is not valid`);
}
