import { Notification } from "./../../application/notification/Notification";
import { Encrypt } from "./../../infra/configs/Encrypt";
import { Security } from "./../../infra/configs/Security";
import { UserRepository } from "./../../infra/repository/UserRepository";
import { Injectable } from "decorated-router";
import { UserDto } from "../dto/UserDto";
import { User } from "../entity/User";

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository
    ) { }

    public signIn(userDto: UserDto): Promise<Notification<UserDto>> {
        let resultNotification = new Notification<UserDto>();
        return this.userRepository
            .getUserByUsername(userDto.username)
            .then((result: User) => {
                if (result && Encrypt.compareHash(userDto.password, result.password)) {
                    userDto = UserDto.fromEntity(result);
                    userDto.password = null;
                    userDto.token = Security.sign(userDto.username, 86400);
                    return resultNotification.setResult(userDto);
                } else {
                    return resultNotification.addError('Invalid login').Success(false);
                }
            })
            .catch(err => resultNotification.addError(err).Success(false));
    }

    public signUp(userDto: UserDto): Promise<Notification<number>> {
        let resultNotification = new Notification<number>();
        return this.userRepository
            .getUserByUsername(userDto.username)
            .then((result: User) => {
                if (!result) {
                    const user = userDto.toEntity();
                    user.password = Encrypt.genHash(user.password);
                    return this.userRepository.Insert<User>(user)
                        .then((insertedId: number) => {
                            return resultNotification.setResult(insertedId);
                        })
                        .catch(err => resultNotification.addError(err).Success(false))
                } else {
                    return resultNotification.addError('Username already registered').Success(false);
                }
            })
            .catch(err => resultNotification.addError(err).Success(false));
    }
}