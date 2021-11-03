import {AppState} from "./store.reducers";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const storeKey = 'store';

const taskerStore = createFeatureSelector<AppState>(storeKey);

export const GetBreadCrumbs = createSelector(taskerStore, state => state.breadCrumbs);

export const GetCurrentUser = createSelector(taskerStore, state => state.currentUser);
export const GetUserProfile = createSelector(taskerStore, state => state.userProfile);

export const GetProjects = createSelector(taskerStore, state => state.projects);
export const GetMenuProjects = createSelector(taskerStore, state => state.menuProjects);
export const GetCurrentProject = createSelector(taskerStore, state => state.currentProject);
export const GetProjectTaskRatio = createSelector(taskerStore, state => state.taskTypeRatio);
export const GetCurrentProjectAdmins = createSelector(taskerStore, state => state.currentProjectAdmins);

export const GetCurrentTeam = createSelector(taskerStore, state => state.currentTeam);
export const GetCurrentTeamMembers = createSelector(taskerStore, state => state.currentTeamMembers);
export const GetTeams = createSelector(taskerStore, state => state.teams);
export const GetMenuTeams = createSelector(taskerStore, state => state.menuTeams);
export const GetTeamsForCurrentProject = createSelector(taskerStore, state => state.teams
  .filter(team => team?.projectId === state.currentProject.id));

export const GetCurrentSprint = createSelector(taskerStore, state => state.currentSprint);
export const GetSprintsForCurrentTeam = createSelector(taskerStore, state => state.sprints
  .filter(sprint => sprint?.teamId === state.currentTeam.id));
export const GetArchivedSprintsForCurrentTeam = createSelector(taskerStore, state => state.archivedSprints
  .filter(sprint => sprint?.teamId === state.currentTeam.id));

export const GetTasksForCurrentSprint = createSelector(taskerStore, state => state.tasks
  .filter(task => task?.sprintId === state.currentSprint.id));
export const GetTasks = createSelector(taskerStore, state => state.tasks);
export const GetArchivedTasks = createSelector(taskerStore, state => state.archivedTasks);
export const GetCurrentTask = createSelector(taskerStore, state => state.currentTask);
export const GetTaskAssignableUsers  = createSelector(taskerStore, state => state.assignableTaskUsers);

export const GetLoginError = createSelector(taskerStore, state => state.loginError);
export const GetRegistrationError = createSelector(taskerStore, state => state.registrationError);
export const GetProfileError = createSelector(taskerStore, state => state.profileError);


