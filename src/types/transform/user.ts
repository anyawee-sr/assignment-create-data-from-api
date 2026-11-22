import type { ICompanyResponse } from '../services/user.js';

type TDepartment = ICompanyResponse['department'];
type THairColor = Record<string, number>;
type TAddressUser = Record<string, string>;

interface ITransformDepartmentSummary {
  male: number;
  female: number;
  ageRange: string;
  hair: THairColor;
  addressUser: TAddressUser;
}

export type TTransformUserListGroupByDepartment = Record<TDepartment, ITransformDepartmentSummary>;

interface IMetaAgeRange {
  minAge: number;
  maxAge: number;
}

export interface IDepartmentAccumulator {
  meta: Record<TDepartment, IMetaAgeRange>;
  summary: TTransformUserListGroupByDepartment;
}
