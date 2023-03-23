export interface IUser {
  name: string;
  email: string;
}

export interface IUserRegistered {
  id: number;
  name: string;
  confirmedPresence: boolean;
}
