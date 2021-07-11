import { getKeys } from './getKeys';

export function getFromPath(path, obj, defaultValue = "") {
    const keys = getKeys(path);

    return keys.reduce((prev, [key]) => {
      if (typeof prev[key] === "undefined") return defaultValue;
      return (prev = prev[key]);
    }, obj || {});
}
