import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity'; 
import { MongoRepository } from 'typeorm';

@Injectable()
export class ArtistService {
    constructor(
        @InjectRepository(Artist)
        private artistRepository: MongoRepository<Artist>
    ) { }

    async addArtist(artist: Artist) {
        return await this.artistRepository.save({
            userId: artist.userId,
            bio: artist.bio,
        });
    }

    async getAllArtists() {
        return await this.artistRepository.find();
    } 

    async getArtistById(id: string) {
        const ObjectId = require('mongodb').ObjectId;
        return await this.artistRepository.findOne(new ObjectId(id));
    }

    async getAwardsAll() {
        // mock data awards of artist
        return [
            {
                title: 'Award 1',
                year: 2020,
                description: 'Description 1',
            },
            {
                title: 'Award 2',
                year: 2021,
                description: 'Description 2',
            },
            {
                title: 'Award 3',
                year: 2022,
                description: 'Description 3',
            },
        ];
    }

    async getAllPartner() {
        // mock data business partner
        return [
            {
                name: 'Partner 1',
                logo: 'https://via.placeholder.com/150',
                link: 'https://www.partner1.com',
            },
            {
                name: 'Partner 2',
                logo: 'https://via.placeholder.com/150',
                link: 'https://www.partner2.com',
            },
            {
                name: 'Partner 3',
                logo: 'https://via.placeholder.com/150',
                link: 'https://www.partner3.com',
            },
        ];
    }
}
