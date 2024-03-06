import { Injectable } from '@nestjs/common';
import { db } from 'src/db';
import { FavoritesResponse } from './response';

@Injectable()
export class FavoritesService {
  findAll(): FavoritesResponse {
    const artists = db.artists.filter((artist) =>
      db.favorites.artists.includes(artist.id),
    );
    const albums = db.albums.filter((album) =>
      db.favorites.albums.includes(album.id),
    );
    const tracks = db.tracks.filter((tracks) =>
      db.favorites.tracks.includes(tracks.id),
    );

    return {
      artists,
      albums,
      tracks,
    };
  }

  addTrack(id: string) {
    const track = db.tracks.find((track) => track.id === id);
    if (!track) return null;

    const trackId = db.favorites.tracks.find((trackId) => trackId === id);
    if (!trackId) {
      db.favorites.tracks.push(id);
    }

    return true;
  }

  removeTrack(id: string) {
    const trackId = db.favorites.tracks.find((trackId) => trackId === id);
    if (!trackId) return null;

    db.favorites.tracks = db.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );

    return true;
  }

  addAlbum(id: string) {
    const album = db.albums.find((album) => album.id === id);
    if (!album) return null;

    const albumId = db.favorites.albums.find((albumId) => albumId === id);
    if (!albumId) {
      db.favorites.albums.push(id);
    }

    return true;
  }

  removeAlbum(id: string) {
    const albumId = db.favorites.albums.find((albumId) => albumId === id);
    if (!albumId) return null;

    db.favorites.albums = db.favorites.albums.filter(
      (albumId) => albumId !== id,
    );

    return true;
  }

  addArtist(id: string) {
    const artist = db.artists.find((artist) => artist.id === id);
    if (!artist) return null;

    const artistId = db.favorites.artists.find((artistId) => artistId === id);
    if (!artistId) {
      db.favorites.artists.push(id);
    }

    return true;
  }

  removeArtist(id: string) {
    const artistId = db.favorites.artists.find((artistId) => artistId === id);
    if (!artistId) return null;

    db.favorites.artists = db.favorites.artists.filter(
      (artistId) => artistId !== id,
    );

    return true;
  }
}
