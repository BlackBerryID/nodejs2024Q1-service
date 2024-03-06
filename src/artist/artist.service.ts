import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { db } from 'src/db';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './interfaces';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;

    const newArtist: Artist = {
      id: uuidv4(),
      name,
      grammy,
    };

    db.artists.push(newArtist);

    return newArtist;
  }

  findAll() {
    return db.artists;
  }

  findOne(id: string) {
    return db.artists.find((artist) => artist.id === id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = db.artists.find((artist) => artist.id === id);
    if (!artist) return null;

    const updatedArtist: Artist = {
      ...artist,
      name: updateArtistDto.name,
      grammy: updateArtistDto.grammy,
    };

    db.artists = db.artists.map((artist) =>
      artist.id === id ? updatedArtist : artist,
    );

    return updatedArtist;
  }

  remove(id: string) {
    const artist = db.artists.find((artist) => artist.id === id);
    if (!artist) return null;

    db.tracks = db.tracks.map((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
      return track;
    });

    db.albums = db.albums.map((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
      return album;
    });

    db.favorites.artists = db.favorites.artists.filter(
      (artistId) => artistId !== id,
    );

    db.artists = db.artists.filter((artist) => artist.id !== id);

    return true;
  }
}
