import {createAction, props} from "@ngrx/store";
import {RegisterRequest} from "../model/RegisterRequest";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginRequest} from "../model/LoginRequest";
import {RegisterResponse} from "../model/RegisterResponse";
import {LoginResponse} from "../model/LoginResponse";
import {User} from "../model/User";
import {Project} from "../model/Project";
import {Team} from "../model/Team";
import {Sprint} from "../model/Sprint";
import {Task, TaskState} from "../model/Task";
import {TaskTypeCount} from "../model/TaskTypeCount";
import {BreadCrumb} from "../model/BreadCrumb";

export const ClearStore = createAction(
  "[Store] Clear store"
);

export const SetBreadCrumbs = createAction(
  "[Store] Set breadcrumbs",
  props<{ breadCrumbs: BreadCrumb[] }>()
);

export const ClearBreadCrumbs = createAction(
  "[Store] Clear breadcrumbs"
);

export const NavigateToDashboardPage = createAction(
  "[App] Navigate to dashboard"
);

export const RegisterUser = createAction(
  '[Authentication] Register user',
  props<{ registerRequest: RegisterRequest }>()
);

export const RegisterUserSuccess = createAction(
  '[Authentication] Register user success',
  props<{ registerResponse: RegisterResponse }>()
);

export const RegisterUserFailure = createAction(
  '[Authentication] Register user failure',
  props<{ error: HttpErrorResponse }>()
);

export const LoginUser = createAction(
  '[Authentication] Login user',
  props<{ loginRequest: LoginRequest }>()
);

export const LoginUserSuccess = createAction(
  '[Authentication] Login user success',
  props<{ loginResponse: LoginResponse }>()
);

export const LoginUserFailure = createAction(
  '[Authentication] Login user failure',
  props<{ error: HttpErrorResponse }>()
);

export const LogoutUser = createAction(
  '[Authentication] Logout user'
);

export const SaveJWTCookie = createAction(
  '[Authentication] Save JWT cookie',
  props<{ jwt: string }>()
);

export const LoadCurrentUser = createAction(
  '[Authentication] Load current user'
);

export const LoadCurrentUserSuccess = createAction(
  '[Authentication] Load current user success',
  props<{ currentUser: User}>()
);

export const ClearCookies = createAction(
  '[Utility] Clear cookies'
);

export const ClearErrors = createAction(
  '[Utility] Clear errors'
);

export const LoadUserProfile = createAction(
  '[User] Load user profile',
  props<{ username: string}>()
);

export const LoadUserProfileSuccess = createAction(
  '[User] Load user profile success',
  props<{ userProfile: User}>()
);

export const NavigateToUserProfile = createAction(
  '[User] Navigate to user profile',
  props<{ user: User }>()
);

export interface UpdateUserProflieParams {
  userProfile: User,
  image?: File
  removeImage?: boolean
}
export const UpdateUserProfile = createAction(
  '[User] Update user profile',
  props<UpdateUserProflieParams>()
);

export const UpdateUserProfileFailure = createAction(
  '[User] Update user profile failure',
  props<{ error: HttpErrorResponse }>()
);

export const UpdateUserProfileSuccess = createAction(
  '[User] Update user profile success',
  props<{ userProfile: User}>()
);

export const UploadUserProfileImage = createAction(
  '[User] Upload user profile image',
  props<{ userProfile: User, image: File }>()
);

export const UploadUserProfileImageFailure = createAction(
  '[User] Upload user profile image failure',
  props<{ error: HttpErrorResponse }>()
);

export const CreateProject = createAction(
  '[Project] Create new project',
  props<{project: Project}>()
);

export const CreateProjectSuccess = createAction(
  '[Project] Create new project success',
  props<{ project: Project }>()
);

export const LoadTaskRatioForProject = createAction(
  '[Project] Load task ratio for project',
  props<{ projectId: number }>()
);

export const LoadProjectAdmins = createAction(
  '[Project] Load admins for project',
  props<{ projectId: number }>()
);

export const LoadProjectAdminsSuccess = createAction(
  '[Project] Load admins for project success',
  props<{ admins: User[] }>()
);

export const RequestProjectAdmin = createAction(
  '[Project] Request project admin participation',
  props<{ projectId: number, email: string}>()
);

export const RequestProjectAdminSuccess = createAction(
  '[Project] Request project admin participation success',
);

export const LoadTaskRatioForProjectSuccess = createAction(
  '[Project] Load task ratio for project success',
  props<{ taskTypeRatio: TaskTypeCount[] }>()
);

export const LoadProjectsForCurrentUser = createAction(
  '[Project] Load projects for current user'
);

export const LoadProjectsForCurrentUserSuccess = createAction(
  '[Project] Load projects for current user success',
  props<{ projects: Project[] }>()
);

export const LoadProjectsForMenu = createAction(
 '[Project] Load projects for menu'
);

export const LoadProjectsForMenuSuccess = createAction(
 '[Project] Load projects for menu success',
 props<{ projects: Project[] }>()
);

export const LoadCurrentProject = createAction(
  '[Project] Load project',
  props<{ projectId: number }>()
);

export const LoadCurrentProjectSuccess = createAction(
  '[Project] Load project success',
  props<{ project: Project }>()
);

export const UpdateProject = createAction(
  '[Project] Update project',
  props<{ project: Project }>()
);

export const UpdateProjectSuccess = createAction(
  '[Project] Update project success',
  props<{ project: Project }>()
);

export const NavigateToProjectPage = createAction(
 '[Project] Navigate to project page',
 props<{ project: Project }>()
);

export const RegisterProjectAdmin = createAction(
  '[Project] Register project admin',
  props<{ project: Project }>()
);

export const RegisterProjectAdminSuccess = createAction(
  '[Project] Register project admin success',
  props<{ project: Project }>()
);

export const CreateTeam = createAction(
  '[Team] Create new team',
  props<{ team: Team }>()
);

export const CreateTeamSuccess = createAction(
  '[Team] Create new team success',
  props<{ team: Team }>()
);

export const LoadTeamsForCurrentUser = createAction(
  '[Team] Load teams for current user'
);

export const LoadTeamsForProject = createAction(
 '[Team] Load teams for project',
 props<{ projectId: number }>()
);

export const LoadTeamsForMenu = createAction(
 '[Team] Load teams for menu'
);

export const LoadTeamsForMenuSuccess = createAction(
 '[Team] Load teams for menu success',
 props<{ teams: Team[] }>()
);

export const LoadTeamsSuccess = createAction(
  '[Team] Load teams success',
  props<{ teams: Team[] }>()
);

export const LoadCurrentTeam = createAction(
 '[Team] Load current team',
 props<{ teamId: number }>()
);

export const LoadCurrentTeamSuccess = createAction(
 '[Team] Load current team success',
 props<{ team: Team }>()
);

export const NavigateToTeamPage = createAction(
 '[Team] Navigate to team page',
 props<{ team: Team }>()
);

export const NavigateToTeamSprintBoardPage = createAction(
 '[Team] Navigate to team sprint board page',
 props<{ team: Team }>()
);

export const NavigateToTeamBacklogPage = createAction(
 '[Team] Navigate to team backlog page',
 props<{ team: Team }>()
);

export const NavigateToTeamMembersPage = createAction(
 '[Team] Navigate to team members page',
 props<{ team: Team }>()
);

export const LoadTeamMembers = createAction(
 '[Team] Load team members',
 props<{ teamId: number }>()
);

export const LoadTeamMembersSuccess = createAction(
 '[Team] Load team members success',
 props<{ members: User[] }>()
);

export const LoadSprintsForTeam = createAction(
 '[Sprint] Load sprints for team',
  props<{ teamId: number}>()
);

export const LoadArchivedSprintsForTeam = createAction(
  '[Sprint] Load archived sprints for team',
  props<{ teamId: number}>()
);

export const LoadSprintsWithTasksForTeam = createAction(
 '[Sprint] Load sprints with tasks for team',
 props<{ teamId: number}>()
);

export const LoadArchivedSprintsWithTasksForTeam = createAction(
  '[Sprint] Load archived sprints with tasks for team',
  props<{ teamId: number}>()
);

export const LoadCurrentSprint = createAction(
 '[Sprint] Load current sprint',
 props<{ sprintId: number}>()
);

export const LoadCurrentSprintSuccess = createAction(
 '[Sprint] Load current sprint success',
 props<{ sprint: Sprint }>()
);

export const CreateSprint = createAction(
 '[Sprint] Create sprint',
 props<{ sprint: Sprint }>()
);

export const CreateSprintSuccess = createAction(
 '[Sprint] Create sprint success',
 props<{ sprint: Sprint }>()
);

export const LoadSprintsForTeamSuccess = createAction(
 '[Sprint] Load sprints for current team success',
 props<{ sprints: Sprint[] }>()
);

export const LoadArchivedSprintsForTeamSuccess = createAction(
  '[Sprint] Load archived sprints for current team success',
  props<{ archivedSprints: Sprint[] }>()
);

export const UpdateSprint = createAction(
 '[Sprint] Update sprint',
 props<{ sprint: Sprint }>()
);

export const UpdateSprintSuccess = createAction(
 '[Sprint] Update sprint success',
 props<{ sprint: Sprint }>()
);

export const RemoveSprint = createAction(
 '[Sprint] Remove sprint',
 props<{ sprintId: number}>()
);

export const StartSprint = createAction(
 '[Sprint] Start sprint',
 props<{ sprintId: number}>()
);

export const StopSprint = createAction(
  '[Sprint] Stop sprint',
  props<{ sprintId: number}>()
);

export const ArchiveSprint = createAction(
  '[Sprint] Archive sprint',
  props<{ sprintId: number}>()
);

export const UnarchiveSprint = createAction(
  '[Sprint] Unarchive sprint',
  props<{ sprintId: number}>()
);

export const RemoveSprintSuccess = createAction(
 '[Sprint] Remove sprint success',
 props<{ sprintId: number}>()
);

export const CreateTask = createAction(
 '[Task] Create new task',
 props<{task: Task}>()
);

export const LoadCurrentTask = createAction(
 '[Task] Load current task',
 props<{ taskId: number }>()
);

export const LoadCurrentTaskSuccess = createAction(
 '[Task] Load current task success',
 props<{ task: Task }>()
);

export const CreateTaskSuccess = createAction(
 '[Task] Create new task success',
 props<{ task: Task }>()
);

export const LoadTasksForSprints = createAction(
 '[Task] Load tasks for current sprints',
  props<{ sprintsIds: number[] }>()
);

export const LoadArchivedTasksForSprints = createAction(
  '[Task] Load archived tasks for current sprints',
  props<{ sprintsIds: number[] }>()
);

export const LoadTasksForSprint = createAction(
 '[Task] Load tasks for sprint',
 props<{ sprintId: number }>()
);

export const LoadTasksForSprintSuccess = createAction(
 '[Task] Load tasks for sprint success',
 props<{ tasks: Task[], sprintId: number}>()
);

export const LoadTasksSuccess = createAction(
 '[Task] Load tasks success',
 props<{ tasks: Task[] }>()
);

export const LoadArchivedTasksSuccess = createAction(
  '[Task] Load archived tasks success',
  props<{ archivedTasks: Task[] }>()
);

export const UpdateTaskState = createAction(
 '[Task] Update task state',
 props<{ taskId: number, state: TaskState }>()
);

export const UpdateTaskEstimation = createAction(
  '[Task] Update task estimation',
  props<{ taskId: number, estimation: number }>()
);

export const UpdateTaskDetails = createAction(
 '[Task] Update task details',
 props<{ task: Task }>()
);

export const UpdateTaskAssignee = createAction(
  '[Task] Update task assignee',
  props<{ taskId: number, username: string }>()
);

export const UpdateTaskSuccess = createAction(
 '[Task] Update task success',
 props<{ task: Task }>()
);

export const MoveTaskToSprint = createAction(
 '[Task] Move task to sprint',
 props<{ task: Task, sprint: Sprint, position: number, teamId: number}>()
);

export const LoadTaskAssignableUsers = createAction(
  '[Task] Load task assignable users',
  props<{ task: Task }>()
);

export const CreateTaskComment = createAction(
  '[Task] Create task comment',
  props<{ taskId: number, content: string }>()
);

export const LoadTaskAssignableUsersSuccess = createAction(
  '[Task] Load task assignable users success',
  props<{ members: User[] }>()
);

export const NavigateToTaskDetails = createAction(
 '[Team] Navigate to task details',
 props<{ task: Task }>()
);

export const RequestTeamMember = createAction(
 '[Team] Send a join team request to an email address',
 props<{ email: string }>()
);

export const RequestTeamMemberSuccess = createAction(
 '[Team] Done sending a join team request'
);

export const RegisterTeamMember = createAction(
 '[Team] Register team member',
  props<{ team: Team }>()
);

export const RegisterTeamMemberSuccess = createAction(
 '[Team] Register new team member success',
  props<{ team: Team }>()
);

