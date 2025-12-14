export interface DocumentDto {
  id: string;
  name: string;
  workspaceId: string;
  contentJson: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}