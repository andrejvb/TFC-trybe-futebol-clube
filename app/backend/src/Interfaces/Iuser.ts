export default interface Iuser {
  id: number;
  userName: string;
  role: string;
  email: string;
  password: string;
}

export type IuserLogin = {
  email: string;
  password: string;
};
