import { curry } from "ramda";

const compose = function (...arrFn: Array<(data: any) => any>) {
  return function (args: any) {
    return arrFn.reduceRight((data, curFn) => {
      return curFn(data);
    }, args);
  };
};

const reduce = curry((fn, x) => x.reduce(fn));

// Задание 1
export type Team = { name: string; score: number };

const getBiggestScore = (a: Team, b: Team) => (a.score > b.score ? a : b);
const getBiggestScoreReduce = reduce(getBiggestScore);
const getTopTeam = (teams: Team[]) => getBiggestScoreReduce(teams);
const getTeamName = (team: Team) => team.name;
export const getTopName = compose(getTeamName, getTopTeam);

// Задание 2
export type QsObj = Record<string, string | number | boolean | object>;
const getObjectKeys = (obj: QsObj) => ({
  queries: Object.keys(obj),
  originalObject: obj,
});
type ReduceStringType = {
  queries: string[];
  originalObject: {
    [index: string]: string | number;
  };
};
const reduceString = ({ queries, originalObject }: ReduceStringType): string =>
  queries.reduce((prev: string, cur: string, idx: number) => {
    return `${prev}${idx !== 0 ? "&" : ""}${cur}=${originalObject[cur]}`;
  }, "?");
export const createQs = compose(reduceString, getObjectKeys);

// Задание 3

type objectType = {
  [index: string]: string;
};

const withoutHead = (qs: string): string => qs.slice(1);
const splitQs = (qs: string): string[] => qs.split("&");
const splittedReduce = (splitted: string[]) =>
  splitted.reduce((prev, cur) => {
    const [key, value] = cur.split("=");
    prev[key] = value;
    return prev;
  }, {} as objectType);
export const parseQs = compose(splittedReduce, splitQs, withoutHead);
