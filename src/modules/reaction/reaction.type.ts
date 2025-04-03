
// all the imports here
import { Types } from "mongoose";
import { reactName } from "./reaction.constant";


// react name type
export type TReactName = keyof typeof reactName;


// react type
export type TReact = {
    reactName: TReactName;
    user: Types.ObjectId;
    post?: Types.ObjectId;
    comment?: Types.ObjectId;
    isDone?: boolean;
};