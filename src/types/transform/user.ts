type THairColor = Record<string, number>;
type TAddressUser = Record<string, string>;

export interface IDepartmentSummary {
  male: number;
  female: number;
  ageRange: string;
  hair: THairColor;
  addressUser: TAddressUser;
}

export interface IDepartmentGroup {
  summary: IDepartmentSummary;
  minAge: number;
  maxAge: number;
}
