
// all the imports here
import { TUser } from "./user.type";

// Check if the user is deleted
export const checkIsDeleted = (user: Record<string, unknown> | null): boolean => {
    if (!user) return false;
    return user?.isDeleted !== true;
};