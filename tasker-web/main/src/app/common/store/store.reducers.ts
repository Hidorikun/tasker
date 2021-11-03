import {Action, createReducer, on} from '@ngrx/store';
import {User} from "../model/User";
import {
  ClearBreadCrumbs,
  ClearErrors,
  CreateSprintSuccess,
  LoadArchivedSprintsForTeamSuccess, LoadArchivedTasksSuccess,
  LoadCurrentProjectSuccess,
  LoadCurrentSprintSuccess,
  LoadCurrentTaskSuccess,
  LoadCurrentTeamSuccess,
  LoadCurrentUserSuccess,
  LoadProjectAdminsSuccess,
  LoadProjectsForCurrentUserSuccess,
  LoadProjectsForMenuSuccess,
  LoadSprintsForTeamSuccess,
  LoadTaskAssignableUsersSuccess,
  LoadTaskRatioForProjectSuccess,
  LoadTasksForSprintSuccess,
  LoadTasksSuccess,
  LoadTeamMembersSuccess,
  LoadTeamsForMenuSuccess,
  LoadTeamsSuccess,
  LoadUserProfileSuccess,
  LoginUserFailure,
  RegisterUserFailure,
  RemoveSprintSuccess,
  SetBreadCrumbs,
  UpdateSprintSuccess,
  UpdateTaskSuccess,
  UpdateUserProfileFailure,
  UploadUserProfileImageFailure
} from "./store.actions";
import {Project} from "../model/Project";
import {Team} from "../model/Team";
import {Sprint} from "../model/Sprint";
import {Task} from '../model/Task';
import {TaskTypeCount} from "../model/TaskTypeCount";
import {BreadCrumb} from "../model/BreadCrumb";

export interface AppState {
  currentUser: User;
  userProfile: User;
  currentProject: Project;
  currentTeam: Team;
  currentSprint: Sprint;
  currentTask: Task;
  currentTeamMembers: User[];
  assignableTaskUsers: User[];
  currentProjectAdmins: User[];

  projects: Project[];
  teams: Team[];
  sprints: Sprint[];
  archivedSprints: Sprint[];
  tasks: Task[];
  archivedTasks: Task[];

  taskTypeRatio: TaskTypeCount[];

  menuProjects: Project[],
  menuTeams: Task[],

  registrationError: string;
  loginError: string;
  profileError: string;

  breadCrumbs: BreadCrumb[]
}

export const initialState: AppState = {
  currentUser: null,
  userProfile: null,
  currentProject: null,
  currentTeam: null,
  currentSprint: null,
  currentTask: null,
  currentTeamMembers: [],
  assignableTaskUsers: [],
  currentProjectAdmins: [],

  projects: [],
  teams: [],
  sprints: [],
  archivedSprints: [],
  tasks: [],
  archivedTasks: [],

  taskTypeRatio: [],

  menuProjects: [],
  menuTeams: [],

  registrationError: '',
  loginError: '',
  profileError: '',

  breadCrumbs: []
};

function getMessageFromError(error: any) {
  return error?.error?.details[0] || '';
}

const reducer = createReducer<AppState>(
  initialState,
  on(RegisterUserFailure, () => (initialState)),
  on(RegisterUserFailure, (state, { error }) => ({
    ...state,
    registrationError: getMessageFromError(error)
  })),
  on(LoginUserFailure, (state, { error }) => ({
    ...state,
    loginError: getMessageFromError(error)
  })),
  on(LoadCurrentUserSuccess, (state, { currentUser }) => ({
    ...state,
    currentUser
  })),
  on(LoadUserProfileSuccess, (state, { userProfile }) => ({
    ...state,
    userProfile
  })),
  on(UpdateUserProfileFailure, UploadUserProfileImageFailure,  (state, { error }) => ({
    ...state,
    profileError: getMessageFromError(error)
  })),
  on(ClearErrors, (state) => ({
    ...state,
    registrationError: '',
    loginError: '',
    profileError: ''
  })),
  on(LoadProjectsForCurrentUserSuccess, (state, { projects }) => ({
    ...state,
    projects
  })),
  on(LoadProjectsForMenuSuccess, (state, { projects }) => ({
    ...state,
    menuProjects: projects
  })),
  on(LoadTeamsSuccess, (state, { teams }) => ({
    ...state,
    teams
  })),
  on(LoadTeamsForMenuSuccess, (state, { teams }) => ({
    ...state,
    menuTeams: teams
  })),
  on(LoadCurrentProjectSuccess, (state, { project }) => ({
    ...state,
    currentProject: project
  })),
  on(LoadCurrentTeamSuccess, (state, { team }) => ({
    ...state,
    currentTeam: team
  })),
  on(LoadSprintsForTeamSuccess, (state, { sprints }) => ({
    ...state,
    sprints
  })),
  on(LoadArchivedSprintsForTeamSuccess, (state, { archivedSprints }) => ({
    ...state,
    archivedSprints
  })),
  on(LoadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks
  })),
  on(LoadArchivedTasksSuccess, (state, { archivedTasks }) => ({
    ...state,
    archivedTasks
  })),
  on(LoadTasksForSprintSuccess, (state, { tasks, sprintId}) => ({
    ...state,
    tasks: [...state.tasks.filter(t => t.sprintId !== sprintId), ...tasks]
  })),
  on(CreateSprintSuccess, (state, { sprint }) => ({
    ...state,
    sprints: [sprint, ...state.sprints]
  })),
  on(UpdateSprintSuccess, (state, { sprint }) => ({
    ...state,
    sprints: state.sprints.map(s => {
      if (s.id === sprint.id) {
        return sprint;
      }
      return s;
    })
  })),
  on(RemoveSprintSuccess, (state, { sprintId }) => ({
    ...state,
    sprints: state.sprints.filter(s => s.id !== sprintId)
  })),
  on(LoadCurrentSprintSuccess, (state, { sprint }) => ({
    ...state,
    currentSprint: sprint
  })),
  on(UpdateTaskSuccess, (state, { task }) => ({
      ...state,
      tasks: state.tasks.map(t => (t.id === task.id) ? task : t)
  })),
  on(LoadCurrentTaskSuccess, (state, { task }) => ({
    ...state,
    currentTask: task
  })),
  on(LoadTeamMembersSuccess, (state, { members }) => ({
    ...state,
    currentTeamMembers: members
  })),
  on(LoadTaskAssignableUsersSuccess, (state, { members }) => ({
    ...state,
    assignableTaskUsers: members
  })),
  on(LoadTaskRatioForProjectSuccess, (state, { taskTypeRatio }) => ({
    ...state,
    taskTypeRatio
  })),
  on(LoadProjectAdminsSuccess, (state, { admins }) => ({
    ...state,
    currentProjectAdmins: admins
  })),
  on(SetBreadCrumbs, (state, { breadCrumbs }) => ({
    ...state,
    breadCrumbs
  })),
  on(ClearBreadCrumbs, (state) => ({
    ...state,
    breadCrumbs: []
  })),
);


export function storeReducer(state: AppState | undefined, action: Action): AppState {
  return reducer(state, action);
}
