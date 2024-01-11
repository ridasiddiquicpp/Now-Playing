//backend server
//seperate main server code from the code that is accessing the database
//all routes are going to be in seperate files

import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient
//const mongo_username = "rida"
//const mongo_password = "3364"

const  MONGODB_CONNECTION_STRING = 'mongodb+srv://rida:3364@cluster0.gm3dmu3.mongodb.net/?retryWrites=true&w=majority'

//'mongodb+srv://rida:3364@cluster0.gm3dmu3.mongodb.net/'
//const uri = process.env.MONGODB_CONNECTION_STRING
const uri = MONGODB_CONNECTION_STRING
const port = 8000;

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    //send database connection to ReviewsDAO
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})

