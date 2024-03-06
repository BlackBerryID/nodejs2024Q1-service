import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { db } from 'src/db';
import { Album } from './interfaces';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const { name, year, artistId } = createAlbumDto;

    const newAlbum: Album = {
      id: uuidv4(),
      name,
      year,
      artistId: artistId ?? null,
    };

    db.albums.push(newAlbum);

    return newAlbum;
  }

  findAll() {
    return db.albums;
  }

  findOne(id: string) {
    return db.albums.find((album) => album.id === id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = db.albums.find((album) => album.id === id);
    if (!album) return null;

    const updatedAlbum: Album = {
      ...album,
      name: updateAlbumDto.name,
      year: updateAlbumDto.year,
      artistId:
        updateAlbumDto.artistId !== undefined
          ? updateAlbumDto.artistId
          : album.artistId,
    };

    db.albums = db.albums.map((album) =>
      album.id === id ? updatedAlbum : album,
    );

    return updatedAlbum;
  }

  remove(id: string) {
    const album = db.albums.find((album) => album.id === id);
    if (!album) return null;

    db.albums = db.albums.filter((album) => album.id !== id);

    return true;
  }
}
