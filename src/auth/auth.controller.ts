import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { Authorize } from '../authorize.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    async register(@Body() user: User) {
        const register = await this.authService.register(user);
        return register;
    }

    @Get()
    @UseGuards(Authorize)
    async getAllUser() {
        return await this.authService.getAllUser();
    }

    @Get(':id')
    async getUserById(@Param() params: any) {
        const id = params.id;
        return await this.authService.getUserById(id);
    }

    @Post('login')
    async login(@Body() user: User) {
        const login = await this.authService.login(user);
        return login;
    }
}
