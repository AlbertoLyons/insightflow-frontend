import { UserModel } from "./UserModel";

export interface getWorkspaceById {
    name: string;
    url: string;
    users: UserModel[];
    createdAt: string;
}
export type GetWorkspaceById = getWorkspaceById;

