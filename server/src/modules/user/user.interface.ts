export interface User {
    email: string,
    checkPassword(attempt, callback);

}