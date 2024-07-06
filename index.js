//import express and cors
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/index.js'

//init app
const app = express()

// use cors
app.use(cors())

// use body parser
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

//define port
const port = 3000;

//route
app.get('/', (req, res) => {
  res.send('Hello world!')
})

// define router
app.use('/api', router)

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})