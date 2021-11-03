import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  ClearCookies,
  ClearErrors,
  ClearStore,
  CreateProject,
  CreateProjectSuccess,
  CreateSprint,
  CreateSprintSuccess,
  CreateTask,
  CreateTaskComment,
  CreateTaskSuccess,
  CreateTeam,
  CreateTeamSuccess,
  LoadArchivedSprintsWithTasksForTeam,
  LoadArchivedSprintsForTeamSuccess,
  LoadCurrentProject,
  LoadCurrentProjectSuccess,
  LoadCurrentSprint,
  LoadCurrentSprintSuccess,
  LoadCurrentTask,
  LoadCurrentTaskSuccess,
  LoadCurrentTeam,
  LoadCurrentTeamSuccess,
  LoadCurrentUser,
  LoadCurrentUserSuccess,
  LoadProjectAdmins,
  LoadProjectAdminsSuccess,
  LoadProjectsForCurrentUser,
  LoadProjectsForCurrentUserSuccess,
  LoadProjectsForMenu,
  LoadProjectsForMenuSuccess,
  LoadSprintsForTeam,
  LoadSprintsForTeamSuccess,
  LoadSprintsWithTasksForTeam,
  LoadTaskAssignableUsers,
  LoadTaskAssignableUsersSuccess,
  LoadTaskRatioForProject,
  LoadTaskRatioForProjectSuccess,
  LoadTasksForSprint,
  LoadTasksForSprints,
  LoadTasksForSprintSuccess,
  LoadTasksSuccess,
  LoadTeamMembers,
  LoadTeamMembersSuccess,
  LoadTeamsForCurrentUser,
  LoadTeamsForMenu,
  LoadTeamsForMenuSuccess,
  LoadTeamsForProject,
  LoadTeamsSuccess,
  LoadUserProfile,
  LoadUserProfileSuccess,
  LoginUser,
  LoginUserFailure,
  LogoutUser,
  MoveTaskToSprint,
  NavigateToDashboardPage,
  NavigateToProjectPage,
  NavigateToTaskDetails,
  NavigateToTeamBacklogPage,
  NavigateToTeamMembersPage,
  NavigateToTeamPage,
  NavigateToTeamSprintBoardPage,
  NavigateToUserProfile,
  RegisterProjectAdmin,
  RegisterProjectAdminSuccess,
  RegisterTeamMember,
  RegisterTeamMemberSuccess,
  RegisterUser,
  RegisterUserFailure,
  RemoveSprint,
  RemoveSprintSuccess,
  RequestProjectAdmin,
  RequestProjectAdminSuccess,
  RequestTeamMember,
  RequestTeamMemberSuccess,
  SaveJWTCookie,
  StartSprint,
  UpdateProject,
  UpdateProjectSuccess,
  UpdateSprint,
  UpdateSprintSuccess,
  UpdateTaskAssignee,
  UpdateTaskDetails,
  UpdateTaskEstimation,
  UpdateTaskState,
  UpdateTaskSuccess,
  UpdateUserProfile,
  UpdateUserProfileFailure,
  UpdateUserProfileSuccess,
  UpdateUserProflieParams,
  UploadUserProfileImage,
  LoadArchivedTasksForSprints,
  LoadArchivedTasksSuccess,
  StopSprint,
  ArchiveSprint,
  LoadArchivedSprintsForTeam, UnarchiveSprint
} from "./store.actions";
import {AppState} from "./store.reducers";
import {AuthService} from "../services/auth.service";
import {catchError, debounceTime, map, mergeMap, tap, withLatestFrom} from "rxjs/operators";
import {of} from "rxjs";
import {CookieService} from "../services/cookie.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {ProjectService} from "../services/project.service";
import {TeamService} from "../services/team.service";
import {SprintService} from "../services/sprint.service";
import {TaskService} from "../services/task.service";
import {GetCurrentTeam} from "./store.selectors";

@Injectable()
export class StoreEffects {

  readonly registerUser$ = createEffect(() => this.actions$.pipe(
    ofType(RegisterUser),
    mergeMap(({registerRequest}) => this.authService.register(registerRequest).pipe(
      tap(() => this.router.navigate(['/dashboard'])),
      map(registerResponse => SaveJWTCookie({jwt: registerResponse.jwt})),
      catchError(error => of(RegisterUserFailure({error})))
    ))
  ));

  readonly loginUser$ = createEffect(() => this.actions$.pipe(
    ofType(LoginUser),
    mergeMap(({loginRequest}) => this.authService.login(loginRequest).pipe(
      tap(() => this.router.navigate(['/dashboard'])),
      tap(() => this.store.dispatch(ClearErrors())),
      mergeMap(loginResponse => [
        SaveJWTCookie({jwt: loginResponse.jwt}),
        LoadCurrentUser()
      ]),
      catchError(error => of(LoginUserFailure({error})))
    ))
  ));

  readonly saveJWTCookie$ = createEffect(() => this.actions$.pipe(
    ofType(SaveJWTCookie),
    tap(() => console.log("saving jwt")),
    tap(({jwt}) => this.cookieService.saveJWTCookie(jwt)),
  ), { dispatch: false });

  readonly loadCurrentUser$ = createEffect(() => this.actions$.pipe(
    ofType(LoadCurrentUser),
    mergeMap(() => this.userService.loadCurrentUser().pipe(
      map(currentUser => LoadCurrentUserSuccess({currentUser}))
    ))
  ));

  readonly clearCookies = createEffect(() => this.actions$.pipe(
    ofType(ClearCookies),
    tap(() => this.cookieService.clearCookies())
  ), { dispatch: false });

  readonly logoutUser$ = createEffect(() => this.actions$.pipe(
    ofType(LogoutUser),
    tap(() => console.log('logout current user')),
    tap(() => this.authService.logoutUser()),
    tap(() => this.router.navigate(['/authentication/login'])),
    mergeMap(() => [ClearStore()])
  ));

  readonly loadUserProfile$ = createEffect(() => this.actions$.pipe(
    ofType(LoadUserProfile),
    tap(({username}) => console.log('loading user profile for ', username)),
    mergeMap(({username}) => this.userService.loadUser(username).pipe(
      map(userProfile => LoadUserProfileSuccess({userProfile}))
    ))
  ));

  readonly updateUserProfile$ = createEffect(() => this.actions$.pipe(
    ofType(UpdateUserProfile),
    mergeMap((params: UpdateUserProflieParams) => this.userService.updateProfile(params.userProfile).pipe(
      mergeMap(userProfileResult => [
        UploadUserProfileImage({userProfile: userProfileResult, image: params.image}),
        UpdateUserProfileSuccess({userProfile: userProfileResult})
      ]),
      catchError(error => of(UpdateUserProfileFailure({error})))
    ))
  ));

  readonly updateUserProfileSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(UpdateUserProfileSuccess),
    tap(() => this.store.dispatch(ClearErrors())),
    mergeMap(({userProfile}) => [
      LoadUserProfile({username: userProfile.username}),
      LoadCurrentUser()
    ]),
  ));

  readonly uploadUserProfileImage$ = createEffect(() => this.actions$.pipe(
    ofType(UploadUserProfileImage),
    mergeMap(({userProfile, image}) => this.userService.uploadProfileImage(image).pipe(
      map(() => UpdateUserProfileSuccess({userProfile})),
      // catchError(error => of(UploadUserProfileImageFailure({error})))
    ))
  ));

  readonly createProject$ = createEffect(() => this.actions$.pipe(
    ofType(CreateProject),
    mergeMap(({project}) => this.projectService.createProject(project).pipe(
      map(resultedProject => CreateProjectSuccess({project: resultedProject})),
    ))
  ));

  readonly createProjectSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(CreateProjectSuccess),
    mergeMap(() => [
      LoadProjectsForCurrentUser()
    ]),
  ));

  readonly loadProjectsForCurrentUser$ = createEffect(() => this.actions$.pipe(
    ofType(LoadProjectsForCurrentUser),
    mergeMap(() => this.projectService.getProjectsForCurrentUser().pipe(
      map(projects => LoadProjectsForCurrentUserSuccess({projects})),
    ))
  ));

  readonly loadProjectsForMenu$ = createEffect(() => this.actions$.pipe(
    ofType(LoadProjectsForMenu),
    mergeMap(() => this.projectService.getProjectsForCurrentUser().pipe(
      map(projects => LoadProjectsForMenuSuccess({projects})),
    ))
  ));

  readonly loadProject$ = createEffect(() => this.actions$.pipe(
    ofType(LoadCurrentProject),
    mergeMap(({projectId}) => this.projectService.getProject(projectId).pipe(
      map(project => LoadCurrentProjectSuccess({project})),
    ))
  ));

  readonly loadCurrentProjectSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LoadCurrentProjectSuccess),
    mergeMap(({project}) => [
      LoadTeamsForProject({projectId: project.id})
    ])
  ));

  readonly updateProject$ = createEffect(() => this.actions$.pipe(
    ofType(UpdateProject),
    mergeMap(({project}) => this.projectService.updateProject(project).pipe(
      map(updatedProject => UpdateProjectSuccess({project: updatedProject})),
    ))
  ));

  readonly updateProjectSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(UpdateProjectSuccess),
    tap(() => this.store.dispatch(ClearErrors())),
    mergeMap(({project}) => [
      LoadCurrentProject({projectId: project.id}),
    ]),
  ));

  readonly createTeam$ = createEffect(() => this.actions$.pipe(
    ofType(CreateTeam),
    mergeMap(({team}) => this.teamService.createTeam(team).pipe(
      map(resultedTeam => CreateTeamSuccess({team: resultedTeam})),
    ))
  ));

  readonly createTeamSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(CreateTeamSuccess),
    mergeMap(() => [
      LoadTeamsForCurrentUser()
    ]),
  ));

  readonly loadTeamsForCurrentUser$ = createEffect(() => this.actions$.pipe(
    ofType(LoadTeamsForCurrentUser),
    mergeMap(() => this.teamService.getTeamsForCurrentUser().pipe(
      map(teams => LoadTeamsSuccess({teams})),
    ))
  ));

  readonly loadTeamMembers$ = createEffect(() => this.actions$.pipe(
    ofType(LoadTeamMembers),
    mergeMap(({teamId}) => this.teamService.getTeamMembers(teamId).pipe(
      map(members => LoadTeamMembersSuccess({members})),
    ))
  ));

  readonly loadTeamsForMenu$ = createEffect(() => this.actions$.pipe(
    ofType(LoadTeamsForMenu),
    mergeMap(() => this.teamService.getTeamsForCurrentUser().pipe(
      map(teams => LoadTeamsForMenuSuccess({teams})),
    ))
  ));

  readonly loadTeamsForProject = createEffect(() => this.actions$.pipe(
    ofType(LoadTeamsForProject),
    tap(({projectId}) => console.log('loading teams for project ' + projectId)),
    mergeMap(({projectId}) => this.teamService.getTeamsForProject(projectId).pipe(
      map(teams => LoadTeamsSuccess({teams})),
    ))
  ));

  readonly loadCurrentTeam$ = createEffect(() => this.actions$.pipe(
    ofType(LoadCurrentTeam),
    tap(({teamId}) => console.log('loading team ' + teamId)),
    mergeMap(({teamId}) => this.teamService.getTeam(teamId).pipe(
      map(team => LoadCurrentTeamSuccess({team})),
    ))
  ));

  readonly navigateToUserProfile$ = createEffect(() => this.actions$.pipe(
    ofType(NavigateToUserProfile),
    tap(({user}) => { this.router.navigate([`users/profiles/${user.username}`]) })
  ), { dispatch: false });

  readonly navigateToTeamPage$ = createEffect(() => this.actions$.pipe(
    ofType(NavigateToTeamPage),
    tap(({team}) => {
      if (!!team.activeSprintId) {
        this.store.dispatch(NavigateToTeamSprintBoardPage({team}));
      } else {
        this.store.dispatch(NavigateToTeamBacklogPage({team}));
      }
    })
  ), { dispatch: false });

  readonly navigateToTeamSprintBoardPage$ = createEffect(() => this.actions$.pipe(
    ofType(NavigateToTeamSprintBoardPage),
    tap(({team}) => { this.router.navigate([`/teams/${team.id}/sprint-board`]) })
  ), { dispatch: false });

  readonly navigateToTeamBacklogPage$ = createEffect(() => this.actions$.pipe(
    ofType(NavigateToTeamBacklogPage),
    tap(({team}) => { this.router.navigate([`/teams/${team.id}/backlog`]) })
  ), { dispatch: false });

  readonly navigateToTeamMembersPage$ = createEffect(() => this.actions$.pipe(
    ofType(NavigateToTeamMembersPage),
    tap(({team}) => { this.router.navigate([`/teams/${team.id}/members`]) })
  ), { dispatch: false });

  readonly loadSprintsForTeam$ = createEffect(() => this.actions$.pipe(
    ofType(LoadSprintsForTeam),
    mergeMap(({teamId}) => this.sprintService.getSprintsForTeam(teamId).pipe(
      map(sprints => LoadSprintsForTeamSuccess({sprints})),
    ))
  ));

  readonly loadArchivedSprintsForTeam$ = createEffect(() => this.actions$.pipe(
    ofType(LoadArchivedSprintsForTeam),
    mergeMap(({teamId}) => this.sprintService.getArchivedSprintsForTeam(teamId).pipe(
      map(archivedSprints => LoadArchivedSprintsForTeamSuccess({archivedSprints})),
    ))
  ));

  readonly loadArchivedSprintsWithTasksForTeam$ = createEffect(() => this.actions$.pipe(
    ofType(LoadArchivedSprintsWithTasksForTeam),
    mergeMap(({teamId}) => this.sprintService.getArchivedSprintsForTeam(teamId).pipe(
      mergeMap(archivedSprints => [
        LoadArchivedSprintsForTeamSuccess({archivedSprints}),
        LoadArchivedTasksForSprints({sprintsIds: archivedSprints.map(s => s.id)})
      ])
    ))
  ));

  readonly loadSprintsWithTasksForTeam$ = createEffect(() => this.actions$.pipe(
    ofType(LoadSprintsWithTasksForTeam),
    mergeMap(({teamId}) => this.sprintService.getSprintsForTeam(teamId).pipe(
      mergeMap(sprints => [
        LoadSprintsForTeamSuccess({sprints}),
        LoadTasksForSprints({sprintsIds: sprints.map(s => s.id)})
      ]),
    ))
  ));

  readonly loadCurrentSprint$ = createEffect(() => this.actions$.pipe(
    ofType(LoadCurrentSprint),
    mergeMap(({sprintId}) => this.sprintService.getSprint(sprintId).pipe(
      mergeMap(sprint => [
        LoadCurrentSprintSuccess({sprint}),
        LoadTasksForSprint({sprintId})
      ]),
    ))
  ));

  readonly createTask$ = createEffect(() => this.actions$.pipe(
    ofType(CreateTask),
    mergeMap(({task}) => this.taskService.createTask(task).pipe(
      map(resultedTask => CreateTaskSuccess({task: resultedTask})),
    ))
  ));

  readonly  loadTaskRatioForProject$ = createEffect(() => this.actions$.pipe(
    ofType(LoadTaskRatioForProject),
    mergeMap(({projectId}) => this.taskService.getTaskRatioForProject(projectId).pipe(
      map(taskTypeRatio => LoadTaskRatioForProjectSuccess({taskTypeRatio})),
    ))
  ));

  readonly createTaskSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(CreateTaskSuccess),
    mergeMap(({task}) => [
      LoadTasksForSprint({sprintId: task.sprintId})
    ]),
  ));

  readonly loadTasksForSprint$ = createEffect(() => this.actions$.pipe(
    ofType(LoadTasksForSprint),
    tap(({sprintId}) => console.log('load tasks for sprint', sprintId)),
    mergeMap(({sprintId}) => this.taskService.getTasksForSprint(sprintId).pipe(
      map(tasks => LoadTasksForSprintSuccess({tasks, sprintId})),
    ))
  ));

  readonly loadTasksForSprints$ = createEffect(() => this.actions$.pipe(
    ofType(LoadTasksForSprints),
    mergeMap(({sprintsIds}) => this.taskService.getTasksForSprints(sprintsIds).pipe(
      map(tasks => LoadTasksSuccess({tasks})),
    ))
  ));

  readonly loadArchivedTasksForSprints$ = createEffect(() => this.actions$.pipe(
    ofType(LoadArchivedTasksForSprints),
    mergeMap(({sprintsIds}) => this.taskService.getTasksForSprints(sprintsIds).pipe(
      map(archivedTasks => LoadArchivedTasksSuccess({archivedTasks})),
    ))
  ));

  readonly createSprint$ = createEffect(() => this.actions$.pipe(
    ofType(CreateSprint),
    mergeMap(({sprint}) => this.sprintService.createSprint(sprint).pipe(
      map(returnedSprint => CreateSprintSuccess({sprint: returnedSprint})),
    ))
  ));

  readonly updateSprint$ = createEffect(() => this.actions$.pipe(
    ofType(UpdateSprint),
    mergeMap(({sprint}) => this.sprintService.updateSprint(sprint).pipe(
      map(returnedSprint => UpdateSprintSuccess({sprint: returnedSprint})),
    ))
  ));

  readonly removeSprint$ = createEffect(() => this.actions$.pipe(
    ofType(RemoveSprint),
    mergeMap(({sprintId}) => this.sprintService.removeSprint(sprintId).pipe(
      map(() => RemoveSprintSuccess({sprintId})),
    ))
  ));

  readonly startSprint$ = createEffect(() => this.actions$.pipe(
    ofType(StartSprint),
    mergeMap(({sprintId}) => this.sprintService.startSprint(sprintId).pipe(
      map(sprint => UpdateSprintSuccess({sprint})),
    ))
  ));

  readonly stopSprint$ = createEffect(() => this.actions$.pipe(
    ofType(StopSprint),
    mergeMap(({sprintId}) => this.sprintService.stopSprint(sprintId).pipe(
      map(sprint => UpdateSprintSuccess({sprint})),
    ))
  ));

  readonly archiveSprint$ = createEffect(() => this.actions$.pipe(
    ofType(ArchiveSprint),
    mergeMap(({sprintId}) => this.sprintService.archiveSprint(sprintId).pipe(
      mergeMap(sprint => [
        LoadSprintsWithTasksForTeam({teamId: sprint.teamId}),
        LoadArchivedSprintsWithTasksForTeam({teamId: sprint.teamId})
      ]),
    ))
  ));

  readonly unarchiveSprint$ = createEffect(() => this.actions$.pipe(
    ofType(UnarchiveSprint),
    mergeMap(({sprintId}) => this.sprintService.unarchiveSprint(sprintId).pipe(
      mergeMap(sprint => [
        LoadSprintsWithTasksForTeam({teamId: sprint.teamId}),
        LoadArchivedSprintsWithTasksForTeam({teamId: sprint.teamId})
      ]),
    ))
  ));

  readonly updateTaskState$ = createEffect(() => this.actions$.pipe(
    ofType(UpdateTaskState),
    mergeMap(({taskId, state}) => this.taskService.updateTaskState(taskId, state).pipe(
      map(task => UpdateTaskSuccess({task})),
    ))
  ));

  readonly updateTaskEstimation$ = createEffect(() => this.actions$.pipe(
    ofType(UpdateTaskEstimation),
    debounceTime(500),
    mergeMap(({taskId, estimation}) => this.taskService.updateTaskEstimation(taskId, estimation).pipe(
      map(task => UpdateTaskSuccess({task})),
    ))
  ));

  readonly moveTaskToSprint$ = createEffect(() => this.actions$.pipe(
    ofType(MoveTaskToSprint),
    mergeMap(({task, sprint, position, teamId}) => this.taskService.moveTaskToSprint(task.id, sprint.id, position).pipe(
      mergeMap(() => [
        LoadSprintsWithTasksForTeam({teamId})
      ]),
    ))
  ));

  readonly navigateToDashboard$ = createEffect(() => this.actions$.pipe(
    ofType(NavigateToDashboardPage),
    tap(() => this.router.navigate([`/dashboard`]))
  ), { dispatch: false });

  readonly navigateToProjectPage$ = createEffect(() => this.actions$.pipe(
    ofType(NavigateToProjectPage),
    tap(({project}) => this.router.navigate([`/projects/${project.id}/details`]))
  ), { dispatch: false });

  readonly navigateToTaskDetails$ = createEffect(() => this.actions$.pipe(
    ofType(NavigateToTaskDetails),
    tap(({task}) => this.router.navigate([`/tasks/${task.id}`]))
  ), { dispatch: false });

  readonly loadCurrentTask$ = createEffect(() => this.actions$.pipe(
    ofType(LoadCurrentTask),
    mergeMap(({taskId}) => this.taskService.getTask(taskId).pipe(
      map(task => ({...task, comments: task.comments
          .sort((a, b) => a.createdOn === b.createdOn ? 0 : a.createdOn > b.createdOn ? 1 : -1 )})),
      map(task => LoadCurrentTaskSuccess({task})),
    ))
  ));

  readonly updateTaskDetails$ = createEffect(() => this.actions$.pipe(
    ofType(UpdateTaskDetails),
    mergeMap(({task}) => this.taskService.updateTaskDetails(task).pipe(
      mergeMap(updatedTask => [
        UpdateTaskSuccess({task: updatedTask}),
        LoadCurrentTask({taskId: updatedTask.id})
      ]),
    ))
  ));

  readonly updateTaskAssignee$ = createEffect(() => this.actions$.pipe(
    ofType(UpdateTaskAssignee),
    mergeMap(({taskId, username}) => this.taskService.updateTaskAssignee(taskId, username).pipe(
      mergeMap(updatedTask => [
        UpdateTaskSuccess({task: updatedTask}),
        LoadCurrentTask({taskId: updatedTask.id})
      ]),
    ))
  ));

  readonly requestTeamMember$ = createEffect(() => this.actions$.pipe(
    ofType(RequestTeamMember),
    withLatestFrom(this.store.select(GetCurrentTeam)),
    mergeMap(([action, team]) => this.teamService.requestTeamMember(team.id, action.email).pipe(
      map(() => RequestTeamMemberSuccess()),
    ))
  ));

  readonly registerTeamMember$ = createEffect(() => this.actions$.pipe(
    ofType(RegisterTeamMember),
    mergeMap(({team}) => this.teamService.registerTeamMember(team.id).pipe(
      map(() => RegisterTeamMemberSuccess({team})),
    ))
  ));

  readonly registerTeamMemberSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(RegisterTeamMemberSuccess),
    mergeMap(({team}) => [
      NavigateToTeamPage({team})
    ])
  ));

  readonly loadTaskAssignableMembers$ = createEffect(() => this.actions$.pipe(
    ofType(LoadTaskAssignableUsers),
    mergeMap(({task}) => this.taskService.getAssignableTasks(task.id).pipe(
      map(members => LoadTaskAssignableUsersSuccess({members}))
    ))
  ));

  readonly createTaskComment$ = createEffect(() => this.actions$.pipe(
    ofType(CreateTaskComment),
    mergeMap(({taskId, content}) => this.taskService.createComment(taskId, content).pipe(
      mergeMap(updatedTask => [
        UpdateTaskSuccess({task: updatedTask}),
        LoadCurrentTask({taskId: updatedTask.id})
      ]),
    ))
  ));

  readonly loadProjectAdmins$ = createEffect(() => this.actions$.pipe(
    ofType(LoadProjectAdmins),
    mergeMap(({projectId}) => this.projectService.getAdmins(projectId).pipe(
      map(admins => LoadProjectAdminsSuccess({admins})),
    ))
  ));

  readonly requestProjectAdmin$ = createEffect(() => this.actions$.pipe(
    ofType(RequestProjectAdmin),
    mergeMap(({projectId, email}) => this.projectService.requestProjectAdmin(projectId, email).pipe(
      map(() => RequestProjectAdminSuccess()),
    ))
  ));

  readonly registerProjectAdmin$ = createEffect(() => this.actions$.pipe(
    ofType(RegisterProjectAdmin),
    mergeMap(({project}) => this.projectService.registerProjectAdmin(project.id).pipe(
      map(() => RegisterProjectAdminSuccess({project})),
    ))
  ));

  readonly registerProjectAdminSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(RegisterProjectAdminSuccess),
    mergeMap(({project}) => [
      NavigateToProjectPage({project})
    ])
  ));

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private taskService: TaskService,
    private sprintService: SprintService,
    private projectService: ProjectService,
    private teamService: TeamService,
    private cookieService: CookieService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {
  }

}
