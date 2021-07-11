export function getKeys(path) {
    return path.replace(/\[(\d*)\]/g, ":array.$1").split(".").map((key) => key.split(":"));
}
