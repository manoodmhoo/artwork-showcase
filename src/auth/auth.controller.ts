import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    async register(@Body() user: User) {
        const register = await this.authService.register(user);
        return register;
    }

    @Get()
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
