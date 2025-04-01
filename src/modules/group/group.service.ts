
// all the imports here
import { groupModel } from "./group.model";
import { TGroup } from "./group.type";


// create group in to db
const createGroupIntoDb = async (payload: TGroup) => {
    const result = await groupModel.create(payload);
    return result;
};


// export all the group services
export const groupServices = {
    createGroupIntoDb,
};