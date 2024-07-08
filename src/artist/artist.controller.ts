import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Authorize } from '../authorize.guard';
import { Artist } from './artist.entity';

@Controller('artist')
export class ArtistController {
    constructor(private artistService: ArtistService) {}

    @Post()
    @UseGuards(Authorize)
    async addArtist(@Body() artist: Artist) {
        return await this.artistService.addArtist(artist);
    }

    @Get()
    @UseGuards(Authorize)
    async getAllArtists() {
        return await this.artistService.getAllArtists();
    }

    @Get(':id')
    @UseGuards(Authorize)
    async getArtistById(id: string) {
        return await this.artistService.getArtistById(id);
    }

    @Get('awards')
    async getAwardsAll() {
        return await this.artistService.getAwardsAll();
    }

    @Get('partner')
    async getAllPartner() {
        return await this.artistService.getAllPartner();
    }
}
