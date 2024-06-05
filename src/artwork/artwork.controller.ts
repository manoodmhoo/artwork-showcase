import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { Artwork } from './artwork.entity';
import { Authorize } from 'src/authorize.guard';

@Controller('artwork')
export class ArtworkController {
    constructor(private artworkService: ArtworkService) {}

    @Post()
    @UseGuards(Authorize)
    async addArtwork(@Body() artwork: Artwork) {
        return await this.artworkService.addArtwork(artwork);
    }

    @Get()
    @UseGuards(Authorize)
    async getAllArtwork() {
        return await this.artworkService.getAllArtwork();
    }

    @Get(':id')
    @UseGuards(Authorize)
    async getArtworkById(@Param() id: string) {
        return await this.artworkService.getArtworkById(id);
    }
}
