import {User} from "./User";

export interface Comment {
  id?: number,
  content?: string,
  owner?: User,
  createdOn?: Date
}
