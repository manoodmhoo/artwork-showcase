import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Artist } from '../artist/artist.entity';
import { MongoRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { response } from 'express';
import * as jwt from 'jsonwebtoken';
import { ArtistService } from 'src/artist/artist.service';

require('dotenv').config();

@Injectable()
export class AuthService {
     constructor(
        @InjectRepository(User)
        private userRepository: MongoRepository<User>,
        @InjectRepository(Artist) 
        private artistRepository: MongoRepository<Artist>,
     ) { }

    async register(user: User) {
       const userVerify = await this.userRepository.findOne({
            where: { email: user.email } 
       });

       if (!userVerify) {
            const HashedPassword = await bcrypt.hash(user.password, 12); 
            const role = user.role ? user.role : 'user';

            const newUser = await this.userRepository.save({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: role,
                password: HashedPassword,
                registerAt: new Date(),
            });

            if(newUser && newUser.role === 'artist') {
               console.log('newUser', newUser._id.toString());
               const newArtist = await this.artistRepository.save({
                    userId: newUser._id.toString(),
               });
               
               if(newArtist) {
                    return newUser;
               }
            } else {
               return newUser;
            }

       } else  {
            const status = response.status(422);
            const msg = (response.statusMessage = 'This email has already been registered.');
            return status;
       }
       return await this.userRepository.save(user);
    }

    async login(user: User) {
        const userVerify = await this.userRepository.findOne({
            where: { email: user.email } 
       });

       if (!userVerify) {
            const status = response.status(422);
            const msg = (response.statusMessage = 'This email has not been registered.');
            return status;
       }

       const passwordMatch = await bcrypt.compare(user.password, userVerify.password);
       if (!passwordMatch) {
            const status = response.status(422);
            const msg = (response.statusMessage = 'Password does not match.');
            return status;
       }

       const userId = userVerify._id.toString();
       const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
       const userAuthenticationInfo = {
            id: userVerify._id,
            firstname: userVerify.firstname,
            lastname: userVerify.lastname,
            email: userVerify.email,
            role: userVerify.role,
            token: token,
       }

       return userAuthenticationInfo;
    } 

    async getAllUser() {
        return await this.userRepository.find();
    }

    async getUserById(id: string) {
        const ObjectId = require('mongodb').ObjectId;
        const user =  await this.userRepository.findOne(new ObjectId(id));
        return user;
    }
}
