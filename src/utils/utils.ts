let id = 0;
export function getNextUniqueId() {
    return `componentId-${id += 1}`;
}
