import { User } from "./../entity/User";
import { Mapper } from "./../utils/Mapper";
import { DataObject } from "decorated-router";

@DataObject()
export class UserDto {
    id: number;
    username: string;
    password: string;
    token: string;

    public static fromEntity(entity: User): UserDto {
        if (!entity) {
            return null;
        }

        const user = Mapper.map<UserDto>(entity, new UserDto());
        return user;
    }

    public toEntity(): User {
        return Mapper.map<User>(this, new User());
    }
}