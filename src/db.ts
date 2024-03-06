import { Artist } from './artist/interfaces';
import { User } from './user/interfaces';
import { Track } from './track/interfaces';

interface IDb {
  users: User[];
  artists: Artist[];
  tracks: Track[];
}

export const db: IDb = {
  users: [],
  artists: [],
  tracks: [],
};
