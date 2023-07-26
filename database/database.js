const mongoose = require('mongoose')

function connectToDB () {
  // connect db
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(res => console.log('Database Connected Succesfully'))
    .catch(error => console.log(error))
}

connectToDB()