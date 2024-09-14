const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.AUTH_SECRET_KEY;
const expiration = "3h";

module.exports = {
    AuthenticationError: new GraphQLError("Fail to authenticate user", {
        extensions: { code: "UNAUTHENTICATED" }
    }),
    authMiddleware: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (!token) return req;
        console.log("Authorization Header: ", req.headers.authorization);
        if (req.headers.authorization) token = token.split(" ").pop().trim();

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch (err) {
            console.log("Invalid token");
        }

        return req;
    },
    signToken: function ({ username, email, _id }) {
        const payload = {username, email, _id};
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    }
}