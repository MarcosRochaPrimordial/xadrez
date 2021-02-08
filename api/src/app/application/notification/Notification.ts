export class Notification<T> {
    private result: T = null;
    private success: boolean;
    private errors: string[] = [];

    public Success(success: boolean = true): Notification<T> {
        this.success = success;
        return this;
    }

    public getSuccess(): boolean {
        return this.success;
    }

    public setResult(result: T): Notification<T> {
        this.result = result;
        return this.Success();
    }

    public getResult(): T {
        return this.result;
    }

    public addError(error: string | any): Notification<T> {
        this.errors.push(error);
        return this.Success(false);
    }

    public clearErrors() {
        this.errors = [];
    }

    public hasError(): boolean {
        return !this.errors.length;
    }
}