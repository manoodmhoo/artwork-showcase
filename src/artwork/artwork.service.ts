import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artwork } from './artwork.entity';
import { MongoRepository } from 'typeorm/repository/MongoRepository';

@Injectable()
export class ArtworkService {
    @InjectRepository(Artwork)
    // @InjectRepository(LikeArtwork)
    private artworkRepository: MongoRepository<Artwork>;
    // private likeArtworkRepository: MongoRepository<LikeArtwork>;

    async addArtwork(artwork: Artwork) {
        return await this.artworkRepository.save({
            imgPath: artwork.imgPath,
            artistId: artwork.artistId,
            createdAt: new Date(),
        });
    }

    async getAllArtwork() {
        return await this.artworkRepository.find();
    }

    async getArtworkById(id: string) {
        const ObjectId = require('mongodb').ObjectId;
        return await this.artworkRepository.findOne(new ObjectId(id));
    }


    
}
