import { getKeys } from './getKeys';

export function createFromPath(path, value, obj = {}) {
  let currObj = obj;
  const keys = getKeys(path);
  keys.forEach((key, index) => {
    const [keyName, type] = key;
   
    if (index < keys.length - 1) {
      if (!currObj[keyName]) {
        currObj[keyName] = type ? [] : {};
      }
      currObj = currObj[keyName];
    }

    if (index === keys.length - 1) {
      currObj[keyName] = value;
    }
  });

  return obj;
}
