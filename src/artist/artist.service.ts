import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity'; 
import { MongoRepository } from 'typeorm';

@Injectable()
export class ArtistService {
    @InjectRepository(Artist)
    private artistRepository: MongoRepository<Artist>;

    async addArtist(id: string) {
        return await this.artistRepository.save({
            userId: id,
        });
    }

    async getAllArtists() {
        return await this.artistRepository.find();
    } 
}
