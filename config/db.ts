const mongoose = require('mongoose')

const dbURI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbURI, 
      { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true 
      })
    console.log("\x1b[36m%s\x1b[0m", `Connected to Mongo ${conn.connection.host}`);
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", "Connection error:", error);
    process.exit(1)
  }
}

export default connectDB;