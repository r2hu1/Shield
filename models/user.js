import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        default: "unverified",
    }
});

const User = models.User || model("User", userSchema);
export default User;