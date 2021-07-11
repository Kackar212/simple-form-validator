import { getKeys } from './getKeys';

export function put(path = "", obj, value) {
    const keys = getKeys(path);
    let currObj = obj || {};
    keys.forEach(([key], index) => {
      if (index === keys.length - 1) {
        if (typeof value === 'function') {
          value(currObj[key], currObj, key);
        } else {
          currObj[key] = value;
        }
      }

      currObj = currObj[key];
    });

    return obj;
}
 