export enum apiMys3Pages {
    Base = '/',
    SignUp = '/api/auth/signup/',
    SignIn = '/api/auth/signin/',
    Delete = '/api/user/',
};

export const apiMys3Domain: string = (
    (process.env.REACT_APP_ENV === 'production')
        ? 'https://mys3.herokuapp.com'
        : (process.env.REACT_APP_ENV === 'development')
            ? 'http://localhost:3000'
            : 'https://mys3dev.herokuapp.com'
);