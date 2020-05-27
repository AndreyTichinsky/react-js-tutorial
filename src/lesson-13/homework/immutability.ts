// Задание 1
export type OriginalTeam = {
  size: number;
  name: string;
  league: string;
};

export type ExpectedTeam = {
  name: string;
  league: string;
  roster: number;
};

export const originalTeamToExpectedTeamA = (
  originalTeam: OriginalTeam
): ExpectedTeam => {
  return Object.assign(
    { league: originalTeam.league },
    { name: "New York Badgers", roster: 25 }
  );
};

// Задание 2
type FreezeArray = ReadonlyArray<number | string>;
type SomeArray = Array<number | string>;

export const originalArrayToExpectedArray = (
  originalArray: FreezeArray
): SomeArray => {
  const copyArray = originalArray.slice();
  return copyArray.map((el: any) => {
    el++;
    if (el === 2) return "two";
    return el;
  });
};

// Задание 3
type TeamKeyType = string | number | {} | undefined;

export type Team = {
  name?: string;
  captain?: {
    name?: string;
    age?: number;
  };
  [index: string]: TeamKeyType;
};

export const originalTeamToExpectedTeamB = (originalTeam: Team): Team => {
  const resultObj: Team = {};
  const recursive = (originalObject: any, resultObject: any) => {
    for (const prop in originalObject) {
      if (typeof originalObject[prop] === "object") {
        resultObject[prop] = {} as TeamKeyType;
        recursive(originalObject[prop], resultObject[prop]);
      } else {
        if (prop === "age") {
          resultObject[prop] = originalObject[prop] + 1;
        } else {
          resultObject[prop] = originalObject[prop];
        }
      }
    }
    return;
  };
  recursive(originalTeam, resultObj);
  return resultObj;
};
