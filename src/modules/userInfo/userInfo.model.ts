
// all the imports here
import { model, Schema } from "mongoose";
import { userMaritalStatus } from "./userInfo.constant";
import { TUserInfo } from "./userInfo.type";


// user info schema
const userInfoSchema: Schema = new Schema<TUserInfo>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    userBio: {
        type: String,
        required: false
    },
    userNickName: {
        type: String,
        required: false
    },
    aboutUser: {
        type: String,
        required: false
    },
    maritalStatus: {
        type: String,
        enum: Object.values(userMaritalStatus),
        required: false,
    },
    birthDate: {
        type: String,
        required: false,
    },
    profileImage: {
        type: String,
        required: false,
    },
    coverImage: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});


// creating the userInfoModel and Export
export const userInfoModel = model<TUserInfo>("UserInfo", userInfoSchema);