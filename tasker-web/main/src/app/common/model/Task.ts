import {User} from "./User";
import {Comment} from "./Comment";

export interface Task {
  id?: number,
  summary?: string,
  description?: string,
  sprintId?: number,
  state?: TaskState,
  position?: number,
  reporter?: User,
  assignee?: User,
  comments?: Comment[],
  type?: TaskType,
  estimation?: number
}

export enum TaskState {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  DONE = 'DONE'
}

export enum TaskType {
  DEFECT = "DEFECT",
  STORY = "STORY",
  TASK = "TASK",
}
