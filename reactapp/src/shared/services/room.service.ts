import { Room } from '../../core/models/Room';
import Api from './api';
import UserStorage from './user.storage';

class RoomService {
    public createRoom() {
        return Api.Post('/room', { id: UserStorage.getUser().id });
    }

    public getRooms(startPage: number, endPage: number, searchWord: string = '') {
        return Api.Get<Room[]>(`/room/${startPage}/${endPage}${!!searchWord ? `?search=${searchWord}` : ''}`);
    }
}

export default new RoomService();