const express = require("express")
const mongoose = require("mongoose")
const booksRoutes = require('./#routes/books_routes')
const path = require('path')

//Define global variables
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

//handeling CORS errors:
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    if (res.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
      return res.status(200).json({})
    }
    next()
  })


  app.use('/api', booksRoutes)

  //step 3
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('#client/build'))

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')) //relative path
    })
  }


 
  try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      process.env.MONGODB_URL || 'mongodb+srv://kirill:kirill@cluster0.ohvr9.mongodb.net/lrc2_backend?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );

  } catch (e) {
    console.log("could not connect");
  }
 
 app.listen(PORT, () => console.log('application is running on port 5000'))