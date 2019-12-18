export enum apiMys3Pages {
    Base = "/",
    SignUp = "/api/auth/signup/",
    SignIn = "/api/auth/signin/"
};

export const apiMys3Domain = (
    (process.env.REACT_APP_ENV == "production")
        ? "https://mys3.herokuapp.com"
        : (process.env.REACT_APP_ENV == "development")
            ? "http://localhost:4000"
            : "https://mys3dev.herokuapp.com"
)