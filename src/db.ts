import { Artist } from './artist/interfaces';
import { User } from './user/interfaces';

interface IDb {
  users: User[];
  artists: Artist[];
}

export const db: IDb = {
  users: [],
  artists: [],
};
