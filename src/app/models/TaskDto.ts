export interface TaskDto {
  progress: any;
  comment: any;
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate?: string;
  assignedToUsername: string;
}