import { connect } from "mongoose";
const connectDB = async () => {
    try{
        await connect(process.env.MONGO_URI);
    }
    catch(e){
        console.log(e);
    }
}

export default connectDB;