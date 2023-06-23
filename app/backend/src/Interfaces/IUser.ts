export default interface Iuser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export type IuserLogin = {
  email: string;
  password: string;
};
