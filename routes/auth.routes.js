const { verifySignUp } = require("../middlewares");
const signUpController = require("../controllers/signupController")
const signInController = require("../controllers/signinController");
const { googlelogin } = require("../controllers/googleLoginController");
const { facebooklogin } = require("../controllers/facebookloginController");

module.exports = app => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next();
    })
    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted,
        ],
        signUpController.signup
    );
    app.post("/api/auth/signin", signInController.signin);

    app.post("/api/auth/googlelogin", googlelogin);

    app.post("/api/auth/facebooklogin", facebooklogin);

};
