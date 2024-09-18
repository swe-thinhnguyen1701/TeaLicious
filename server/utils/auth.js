const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.AUTH_SECRET_KEY;
const expiration = "3h";

module.exports = {
    /**
     * Custom GraphQLError for authentication failures.
     * 
     * This error is thrown when a user is not authenticated, 
     * typically during the use of protected GraphQL resolvers.
     * 
     * @type {GraphQLError}
     */
    AuthenticationError: new GraphQLError("Fail to authenticate user", {
        extensions: { code: "UNAUTHENTICATED" }
    }),

    /**
     * Middleware function to verify the JWT token from the request.
     * 
     * The token can be passed via the request body, query parameters, 
     * or authorization headers. If a valid token is found and verified, 
     * the user data is attached to `req.user`. Otherwise, the request proceeds without user data.
     * 
     * @function
     * @param {Object} req - The HTTP request object containing token in body, query, or headers.
     * @returns {Object} - The modified request object with the user data (if verified), or the original request.
     * 
     * @example
     * const { authMiddleware } = require('./auth');
     * const modifiedRequest = authMiddleware(req);
     */
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

    /**
     * Generates a JWT token for the given user data.
     * 
     * The token is signed using the secret key and expires in the defined expiration time.
     * The payload typically includes the user's username, email, and ID.
     * 
     * @function
     * @param {Object} user - The user object containing `username`, `email`, and `_id` fields.
     * @param {string} user.username - The username of the user.
     * @param {string} user.email - The email address of the user.
     * @param {string} user._id - The unique ID of the user.
     * @returns {string} - The signed JWT token.
     * 
     * @example
     * const { signToken } = require('./auth');
     * const token = signToken({ username: 'JohnDoe', email: 'john@example.com', _id: '12345' });
     */
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    }
}