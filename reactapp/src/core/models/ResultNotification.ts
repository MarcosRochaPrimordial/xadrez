export interface ResultNotification<T> {
    result: T;
    success: boolean;
    errors: string[];
}