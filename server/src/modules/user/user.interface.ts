export interface User {
    email: string,
    userName: string,
    phone: string,
    studentId: string,
    checkPassword(attempt, callback);
    getStudentId(id);

}