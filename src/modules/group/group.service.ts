
// all the imports here
import { JwtPayload } from "jsonwebtoken";
import { groupModel } from "./group.model";
import { TGroup } from "./group.type";
import { groupUserType } from "./group.constant";


// create group in to db
const createGroupIntoDb = async (userPayload: JwtPayload, payload: TGroup) => {

    const newPayload = {
        ...payload, isDeleted: false, members: [
            {
                userId: userPayload.userId,
                userType: groupUserType.superAdmin,
                isDeleted: false,
            },
        ]
    };

    const result = await groupModel.create(newPayload);
    return result;
};


// export all the group services
export const groupServices = {
    createGroupIntoDb,
};