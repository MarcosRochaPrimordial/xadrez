export class Mapper {
    public static map<T>(from: any, to: T) {
        Object.keys(from).forEach(fromValue => {
            if (from[fromValue] !== null && from[fromValue] !== undefined) {
                to[fromValue] = from[fromValue];
            }
        });

        return to;
    }
}