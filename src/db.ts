import { Artist } from './artist/interfaces';
import { User } from './user/interfaces';
import { Track } from './track/interfaces';
import { Album } from './album/interfaces';

interface IDb {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
}

export const db: IDb = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
};
