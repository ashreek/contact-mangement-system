const express  = require('express');
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
const errorHandler = require("./middleware/errorHandlers");
const connectDB = require("./config/dbConnection");
connectDB();
// we need to use express.json before the usage of routes because express first parse
//the data then send it to the routes

app.use(express.json()); 

app.use('/',require("./routes/ContactRoutes"));
app.use('/user',require("./routes/userRoutes"));
// for the same reasons the error handler should be after the route
app.use(errorHandler);

app.listen(port,(req,res)=>
console.log(`The app is running on http://localhost:${port}`)
);
