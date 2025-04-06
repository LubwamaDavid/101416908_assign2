const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
require('dotenv').config();

const app = express();

async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    // ✅ Use specific database name: 'employeeApp'
    const mongoUri = process.env.MONGO_URI || 'mongodb+srv://101416908:jesusislord1671@labs-3133.nczjk.mongodb.net/?retryWrites=true&w=majority&appName=Labs-3133';

    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('✅ MongoDB Connected to employeeApp database'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer();
