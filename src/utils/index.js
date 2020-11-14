import { map } from 'ramda';

export const parserObject = object => {
  return map(
    key => ({ id: key, info: object[key] }),
    Object.keys(object)
  );
}