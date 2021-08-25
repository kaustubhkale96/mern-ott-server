const db = require('../models');
const config = require('../config/auth.config');
const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(`${process.env.OAUTH_CLIENT}`)
const User = db.user;

var jwt = require('jsonwebtoken');

exports.googlelogin = (req, response) => {
    const { tokenId } = req.body;

    client.verifyIdToken({ idToken: tokenId, audience: '1073248472355-dv8f7054642rmmqoshu3rt491639b4jb.apps.googleusercontent.com' })
        .then(res => {
            const { email_verified, name, email } = res.payload;
            if (email_verified) {
                User.findOne({ email }).exec((err, user) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    else {
                        if (user) {
                            var token = jwt.sign({ id: user.id }, config.secret, {
                                expiresIn: 86400 //24hours
                            });
                            var authorites = [];
                            for (let i = 0; i < user.roles.length; i++) {
                                authorites.push("ROLES_" + user.roles[i].name.toUpperCase());
                            }
                            response.status(200).send({
                                id: user._id,
                                username: user.username,
                                email: user.email,
                                roles: authorites,
                                accessToken: token
                            });
                        }
                        else {
                            let password = email + config.secret;
                            const newUser = new User({ username: name, email, password });
                            newUser.save((err, user) => {
                                if (err) {
                                    response.status(500).send({ message: err });
                                    return;
                                }
                                var token = jwt.sign({ id: user.id }, config.secret, {
                                    expiresIn: 86400 //24hours
                                });
                                var authorites = [];
                                for (let i = 0; i < user.roles.length; i++) {
                                    authorites.push("ROLES_" + user.roles[i].name.toUpperCase());
                                }
                                response.status(200).send({
                                    id: user._id,
                                    username: user.username,
                                    email: user.email,
                                    roles: authorites,
                                    accessToken: token
                                });
                            })
                        }
                    }
                })
            }
        })
};