import { UserDto } from './../../domain/dto/UserDto';
import { Body, Controller, Post } from 'decorated-router';
import { UserService } from './../../domain/service/UserService';

@Controller({
    url: '/login',
    cors: '*',
    auth: null
})
export class LoginController {
    constructor(
        private userService: UserService
    ) { }

    @Post()
    login(@Body() userDto: UserDto) {
        return this.userService.signIn(userDto);
    }

    @Post('/signup')
    signUp(@Body() userDto: UserDto) {
        return this.userService.signUp(userDto);
    }
}