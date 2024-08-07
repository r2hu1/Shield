import { Schema, models, model } from "mongoose";

const pwdSchema = new Schema({
    name: {
        type: String,
        default: "Account",
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    }
});

const Pwd = models.Pwd || model("Pwd", pwdSchema);
export default User;