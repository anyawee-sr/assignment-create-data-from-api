import type { IUserResponse } from '../types/services/user.js';
import type {
  IDepartmentAccumulator,
  TTransformUserListGroupByDepartment,
} from '../types/transform/user.js';

export const transformUserListGroupByDepartment = (
  users: IUserResponse[],
): TTransformUserListGroupByDepartment => {
  const groups = users.reduce<IDepartmentAccumulator>(
    (acc, user) => {
      let meta = acc.meta[user.company.department];
      let summary = acc.summary[user.company.department];

      // #region - init department on first user
      if (!meta || !summary) {
        meta = { minAge: user.age, maxAge: user.age };
        summary = {
          male: 0,
          female: 0,
          ageRange: '',
          hair: {},
          addressUser: {},
        };

        acc.meta[user.company.department] = meta;
        acc.summary[user.company.department] = summary;
      }
      // #endregion - init department on first user

      summary.hair[user.hair.color] = (summary.hair[user.hair.color] ?? 0) + 1;
      summary.addressUser[`${user.firstName}${user.lastName}`] = user.address.postalCode;

      if (user.gender === 'male') {
        summary.male++;
      } else if (user.gender === 'female') {
        summary.female++;
      }

      // #region - age handle
      meta.minAge = Math.min(meta.minAge, user.age);
      meta.maxAge = Math.max(meta.maxAge, user.age);

      summary.ageRange = `${meta.minAge}-${meta.maxAge}`;
      // #endregion - age handle

      return acc;
    },
    { meta: {}, summary: {} },
  );

  return groups.summary;
};
