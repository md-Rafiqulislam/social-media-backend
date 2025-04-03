
// all the imports here
import { Types } from "mongoose";
import { reactionName } from "./reaction.constant";


// react name type
export type TReactionName = keyof typeof reactionName;


// react type
export type TReaction = {
    reactionName: TReactionName;
    user: Types.ObjectId;
    post?: Types.ObjectId;
    comment?: Types.ObjectId;
    isDone?: boolean;
};