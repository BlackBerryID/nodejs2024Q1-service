import { User } from './user/interfaces';

interface IDb {
  users: User[];
}

export const db: IDb = {
  users: [],
};
