export default interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export type Login = {
  email: string;
  password: string;
};

export type IUserResponse = Omit<IUser, 'password'>;
