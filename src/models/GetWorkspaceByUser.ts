export interface GetWorkspaceByUser {
    id: string;
    name: string;
    imageUrl: string;
    userRole: string;
}
export type WorkspacesByUser = GetWorkspaceByUser[];

