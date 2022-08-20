const mongoose = require('mongoose');

const connectDB = async () => {

    try {
        const connect = await mongoose.connect(process.env.LOCAL_MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`MongoDB  successfully connected to ${connect.connection.host}`)
    } catch (error) {
        console.log('Connection could not be created, possible cause: ' + error.message);
    }

}

module.exports = connectDB;