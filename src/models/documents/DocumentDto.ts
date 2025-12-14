export interface DocumentDto {
  id: string;
  workspaceId: string;
  title: string;
  icon?: string;
  contentJson: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt?: string;
}