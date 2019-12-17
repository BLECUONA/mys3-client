export enum apiMys3Pages {
    Base = "/",
    SignUp = "/api/auth/signup/",
    SignIn = "/api/auth/signin/"
};

export const apiMys3Domain = (
    (process.env.NODE_ENV == "production")
        ? "https://git.heroku.com/mys3.git"
        : (process.env.NODE_ENV == "development")
            ? "http://localhost:4000"
            : "https://git.heroku.com/mys3dev.git"
)