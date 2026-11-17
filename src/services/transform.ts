import type { IUser } from "../types.js";

type THairColor = Record<string, number>;
type TAddressUser = Record<string, string>;

interface IDepartmentSummary {
  male: number;
  female: number;
  ageRange: string;
  hair: THairColor;
  addressUser: TAddressUser;
}

interface IDepartmentGroup {
  summary: IDepartmentSummary;
  minAge: number;
  maxAge: number;
}

type TGroupByDepartment = (users: IUser[]) => Record<string, IDepartmentSummary>;

export const groupByDepartment: TGroupByDepartment = (users) => {
  const groups = new Map<string, IDepartmentGroup>();

  for (const user of users) {
    const {
      company: { department },
      age,
      gender,
      hair: { color },
      address: { postalCode },
      firstName,
      lastName
    } = user;

    let group = groups.get(department);

    if (!group) {
      group = {
        summary: {
          male: 0,
          female: 0,
          ageRange: '',
          hair: {},
          addressUser: {},
        },
        minAge: age,
        maxAge: age,
      }

      groups.set(department, group);
    }

    const { summary } = group;

    if (gender === 'male') {
      summary.male++;
    } else if (gender === 'female') {
      summary.female++;
    }

    if (age < group.minAge) {
      group.minAge = age;
    } else if (age > group.maxAge) {
      group.maxAge = age;
    }

    summary.hair[color] = (summary.hair[color] ?? 0) + 1;
    summary.addressUser[`${firstName}${lastName}`] = postalCode;
  }

  const result: Record<string, IDepartmentSummary> = {};

  for (const [department, group] of groups) {
    group.summary.ageRange = `${group.minAge}-${group.maxAge}`;
    result[department] = group.summary;
  }

  return result;
}