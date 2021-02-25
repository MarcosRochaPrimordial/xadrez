import { Room } from "./../../domain/entity/Room";
import { BaseRepository } from "./BaseRepository";

export class RoomRepository extends BaseRepository {
    constructor() {
        super('room');
    }

    public getRoomByCode(gameCode: string): Promise<Room> {
        return new Promise((resolve, reject) => {
            this.Query<Room[]>('SELECT * FROM room WHERE game_code = ?', [gameCode])
                .then((rooms: Room[]) => {
                    if (!!rooms.length) {
                        resolve(rooms[0]);
                    } else {
                        resolve(null);
                    }
                })
                .catch(err => reject(err));
        });
    }

    public getRooms(startPage: number, endPage: number): Promise<Room[]> {
        return new Promise((resolve, reject) => {
            this.Query<Room[]>(`SELECT r.id
                                     , u_one.id id_one
                                     , u_one.username username_one
                                     , u_two.id id_two
                                     , u_two.username username_two
                                     , r.d_start
                                  FROM room r
                                  JOIN user u_one
                                    ON r.player_one_id = u_one.id
                             LEFT JOIN user u_two
                                    ON r.player_two_id = u_two.id
                                 LIMIT ?
                                OFFSET ?`, [endPage, startPage])
                .then((rooms: any[]) => {
                    resolve(rooms.map(room => ({
                        id: room.id,
                        player_one: {
                            id: room.id_one,
                            username: room.username_one,
                        },
                        player_two: {
                            id: room.id_two,
                            username: room.username_two,
                        },
                        d_start: room.d_start,
                    }) as Room));
                })
                .catch(err => reject(err));
        })
    } 
}