import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { db } from 'src/db';
import { Track } from './interfaces';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = createTrackDto;

    const newTrack: Track = {
      id: uuidv4(),
      name,
      artistId: artistId ?? null,
      albumId: albumId ?? null,
      duration,
    };

    db.tracks.push(newTrack);

    return newTrack;
  }

  findAll() {
    return db.tracks;
  }

  findOne(id: string) {
    return db.tracks.find((track) => track.id === id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = db.tracks.find((track) => track.id === id);
    if (!track) return null;

    const updatedTrack: Track = {
      ...track,
      name: updateTrackDto.name,
      artistId: updateTrackDto.artistId,
      albumId: updateTrackDto.albumId,
      duration: updateTrackDto.duration,
    };

    db.tracks = db.tracks.map((track) =>
      track.id === id ? updatedTrack : track,
    );

    return updatedTrack;
  }

  remove(id: string) {
    const track = db.tracks.find((track) => track.id === id);
    if (!track) return null;

    db.tracks = db.tracks.filter((track) => track.id !== id);

    return true;
  }
}
