
export const initializeArrayWithRange = (end, start = 0) =>
Array.from({ length: end - start }).map((v, i) => i + start + 1);

export const isSameDate = (one = [],two = []) => new Date(...one).getTime() === new Date(...two).getTime()


