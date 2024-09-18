const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { authMiddleware } = require("./utils/auth");
const { resolvers, typeDefs } = require("./schemas");
// cors package is optional. The reason I add because I have a problem with backend url. For some reasons, it always complains me that the link is not found and return 404 error code.
const cors = require("cors");
const path = require("path");
const db = require("./config/db-connection");

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const app = express();
const PORT = process.env.PORT || 3001;

const startApolloServer = async () => {
    await server.start();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());

    app.use("/graphql", expressMiddleware(server, {
        context: authMiddleware,
    }));

    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../client/dist")));

        app.get("*", (_req, res) => {
            res.sendFile(path.join(__dirname, "../client/dist/index.html"));
        });
    }

    db.once("open", () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at XXXXXXXXXXXXXXXX:${PORT}/graphql`);
        });
    });
};

startApolloServer();