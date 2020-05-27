// Задание 1
export type Team = { name: string; score: number };

export const getTopName = (teams: Team[]): string => {
  return teams.reduce((prev, cur) => {
    return cur.score > prev.score ? cur : prev;
  }).name;
};

// Задание 2
export type QsObj = Record<string, string | number | boolean | object>;

export const createQs = (qsObj: QsObj): string => {
  return Object.keys(qsObj).reduce((prev, cur, idx) => {
    return `${prev}${idx !== 0 ? "&" : ""}${cur}=${qsObj[cur]}`;
  }, "?");
};

// Задание 3
type objectType = {
  [index: string]: string;
};

export const parseQs = (qs: string): QsObj => {
  const splitted = qs.slice(1).split("&");
  const result: objectType = {};
  return splitted.reduce((prev, cur) => {
    const [key, value] = cur.split("=");
    prev[key] = value;
    return prev;
  }, result);
};
