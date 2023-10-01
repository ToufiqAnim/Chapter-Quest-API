export type IUserLogin = {
  email: string;
  password: string;
};

export type ILoginResponse = {
  accessToken: string;
  user: object;
  refreshToken?: string;
};
