export interface ICoordinatesResponse {
  lat: number;
  lng: number;
}

export interface IAddressResponse {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: ICoordinatesResponse;
  country: string;
}

export interface IHairResponse {
  color: string;
  type: string;
}

export interface IBankResponse {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface ICompanyResponse {
  department: string;
  name: string;
  title: string;
  address: IAddressResponse;
}

export interface ICryptoResponse {
  coin: string;
  wallet: string;
  network: string;
}

export interface IUserResponse {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: IHairResponse;
  ip: string;
  address: IAddressResponse;
  macAddress: string;
  university: string;
  bank: IBankResponse;
  company: ICompanyResponse;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: ICryptoResponse;
  role: string;
}

export interface IUsersResponse {
  users: IUserResponse[];
  total: number;
  skip: number;
  limit: number;
}
