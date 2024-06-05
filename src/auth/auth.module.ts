import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Artist } from 'src/artist/artist.entity';
import { ArtistService } from 'src/artist/artist.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Artist]),
  ],
  controllers: [AuthController],
  providers: [AuthService, ArtistService],
})
export class AuthModule {}
