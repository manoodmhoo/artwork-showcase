import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/user.entity';
import { ArtworkModule } from './artwork/artwork.module';
import { Artwork } from './artwork/artwork.entity';
import { LikeArtwork } from './artwork/like-artwork.entity';
import { ArtistModule } from './artist/artist.module';
import { Artist } from './artist/artist.entity';

require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mongodb',
        url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@artworkshowcasedb.peozp0j.mongodb.net/?retryWrites=true&w=majority&appName=artworkShowCaseDB`,
        entities: [User, Artwork, LikeArtwork, Artist], // เติมทุกครั้งเมื่อสร้าง Entity ใหม่
    }),
    AuthModule,
    ArtworkModule,
    ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
