import { Album } from 'src/album/interfaces';
import { Artist } from 'src/artist/interfaces';
import { Track } from 'src/track/interfaces';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
