
// all the imports here
import { Types } from "mongoose";
import { reactName } from "./react.constant";


// react name type
export type TReactName = keyof typeof reactName;


// react type
export type TReact = {
    reactName: TReactName;
    userId: Types.ObjectId;
    postId?: Types.ObjectId;
    commentId?: Types.ObjectId;
    isDone?: boolean;
};