

// all the imports here
import { model, Schema } from "mongoose";
import { TUser } from "./user.type";
import { userGender, userRole, userStatus } from "./user.constant"; // user role type
import bcrypt from 'bcrypt';
import { envFile } from "../../envConfig";


// user model schema
const useerSchema = new Schema<TUser>({
    firstName: {
        type: String,
        required: [true, 'user name is required.'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long.'],
        maxlength: [50, 'Name cannot exceed 50 characters.'],
    },
    lastName: {
        type: String,
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long.'],
        maxlength: [50, 'Name cannot exceed 50 characters.'],
    },
    email: {
        type: String,
        required: [true, 'user email address is required.'],
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    password: {
        type: String,
        required: [true, 'user password is required.'],
        trim: true,
        validate: {
            validator: function (value: string) {
                return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/g.test(value);
            },
            message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
        },
    },
    gender: {
        type: String,
        enum: Object.values(userGender),
        trim: true,
    },
    userRole: {
        type: String,
        enum: Object.values(userRole),
        default: userRole.user,
        trim: true,
    },
    userStatus: {
        type: String,
        default: userStatus.active,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});


// hash password before save
useerSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(envFile.saltRounds));
    next();
});


// don't show the password after save
useerSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});


// create user model and export
export const userModel = model('User', useerSchema);