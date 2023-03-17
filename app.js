require('dotenv').config()
// Libraries
const express = require('express')
const cookieParser = require('cookie-parser')
const Routers = require('./Routes/api.Router')
const { graphqlHTTP } = require('express-graphql');


// Custom Libraries
const connectDB = require('./Utils/database.Util');
const root = require('./GraphQL/schema.Graphql')
const schema = require('./GraphQL/resolver.Graphql')

// Calling functions from Libraries
const app = express()
app.use(cookieParser())

// Application configurations
app.use(express.json());

// GraphQL Server
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.use('/api', Routers);
app.use((req, res)=>res.send('<h1 style="position: absolute;top: 10%;left: 50%;transform: translate(-50%, -50%);"><p style="color:red;font-size: 10rem">404</p></h1><h2 style="position: absolute;top: 45%;left: 50%;transform: translate(-50%, -50%);">Page Not Found!... :-(</h2>'))


// Database Connection
connectDB().then(() => {
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is Running at http://${process.env.HOST}:${process.env.PORT}`);
    })
})