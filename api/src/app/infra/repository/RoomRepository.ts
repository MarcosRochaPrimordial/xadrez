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

    public verifyRoomCode(roomId: number, gameCode: string): Promise<Room> {
        return new Promise((resolve, reject) => {
            this.Query<Room[]>('SELECT * FROM room WHERE game_code = ? AND id = ?', [gameCode, roomId])
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

    public getRooms(startPage: number, endPage: number, search: string = null): Promise<Room[]> {
        return new Promise((resolve, reject) => {
            this.Query<any[]>(`SELECT r.id
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
                                 WHERE (? IS NULL
                                    OR (u_one.username LIKE ?)
                                    OR (u_two.username LIKE ?))
                                 LIMIT ?
                                OFFSET ?`, [search, `%${search}%`, `%${search}%`, endPage, startPage])
                .then((rooms: any[]) => {
                    resolve(this.mapRoom(rooms));
                })
                .catch(err => reject(err));
        });
    }

    public getRoomByIdValidateUser(roomId: number, userId: number = null): Promise<Room> {
        return new Promise((resolve, reject) => {
            this.Query<any[]>(`SELECT r.id
                                   , u_one.id id_one
                                   , u_one.username username_one
                                   , u_two.id id_two
                                   , u_two.username username_two
                                   , r.d_start
                                   , r.game_code
                                FROM room r
                                JOIN user u_one
                                  ON r.player_one_id = u_one.id
                           LEFT JOIN user u_two
                                  ON r.player_two_id = u_two.id
                               WHERE r.id = ?
                                 AND ((? IS NULL
                                  OR (u_one.id = ?))
                                  OR (u_two.id IS NULL
                                  OR u_two.id = ?))`, [roomId, userId, userId, userId])
                .then((rooms: any[]) => {
                    resolve(this.mapRoom(rooms)[0]);
                })
                .catch(err => reject(err));
        });
    }

    public setPlayer2ToUser(roomId, userId: number): Promise<number> {
        return new Promise((resolve, reject) => {
            this.Query(`UPDATE room
                           SET player_two_id = ?
                         WHERE id = ?`, [userId, roomId])
                .then((result: any) => {
                    resolve(result.changedRows);
                })
                .catch(err => reject(err));
        })
    }

    private mapRoom(rooms: any[]): Room[] {
        return rooms.map(room => ({
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
            game_code: !!room.game_code ? room.game_code : '',
        }) as Room);
    }
}