import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/conversafe'

const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 5000;

export const connectDB = async () => {
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      await mongoose.connect(MONGO_URI)
      console.log('MongoDB connected')
      return;
    } catch (error) {
      retries++;
      console.error(`MongoDB connection error (attempt ${retries}):`, error.message)
      if (retries >= MAX_RETRIES) {
        process.exit(1)
      }
      console.log(`Retrying in ${RETRY_DELAY_MS / 1000} seconds...`)
      await new Promise(res => setTimeout(res, RETRY_DELAY_MS))
    }
  }
}
