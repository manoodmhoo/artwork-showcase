import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artwork } from './artwork.entity';
import { MongoRepository } from 'typeorm/repository/MongoRepository';
import { LikeArtwork } from './like-artwork.entity';

@Injectable()
export class ArtworkService {
    constructor(
        @InjectRepository(Artwork) private artworkRepository: MongoRepository<Artwork>,
        @InjectRepository(LikeArtwork) private likeArtworkRepository: MongoRepository<LikeArtwork>
    ) { }

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

    async countArtwork() {
        return await this.artworkRepository.count();
    }

    async getArtworkById(id: string) {
        const ObjectId = require('mongodb').ObjectId;
        return await this.artworkRepository.findOne(new ObjectId(id));
    }

    async likeArtwork(likeArtwork: LikeArtwork) {
        return await this.likeArtworkRepository.save({
            userId: likeArtwork.userId,
            artworkId: likeArtwork.artworkId,
        });
    }
}
