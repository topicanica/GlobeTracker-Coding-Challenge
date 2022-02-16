export type IUser = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    userType: string,
    dateCreated: Date,
}

export interface IUsers {
    users: {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        userType: string,
        dateCreated: Date,
    }[]
}

export interface IUserForm {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    userType: any,
}



