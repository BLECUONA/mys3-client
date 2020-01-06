export interface User {
    nickname: string,
    email: string,
    password: string,
    uuid?: string
}

export interface Response {
    data: {
        user: User
    },
    meta: {
        token: string
    },
    error: string
}