// require('dotenv').config();

export enum apiMys3Pages {
    Base = "/",
    SignUp = "/api/auth/signup/",
    SignIn = "/api/auth/signin/"
};

export const apiMys3Domain = "http://localhost:4000";
// export const apiMys3Domain = process.env.ENV == "dev" ? "http://localhost:4000" : "https://git.heroku.com/mys3dev.git"