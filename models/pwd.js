import { Schema, models, model } from "mongoose";

const pwdSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        default: "Account",
    }
});

const Pwd = models.Pwd || model("Pwd", pwdSchema);
export default User;