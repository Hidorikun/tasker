package com.hidorikun.tasker.controller;

import com.hidorikun.tasker.model.dto.*;
import com.hidorikun.tasker.model.entity.Comment;
import com.hidorikun.tasker.model.entity.Task;
import com.hidorikun.tasker.model.entity.User;
import com.hidorikun.tasker.service.CommentService;
import com.hidorikun.tasker.service.TaskService;
import com.hidorikun.tasker.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;
    private final CommentService commentService;

    public TaskController(TaskService taskService, UserService userService, CommentService commentService) {
        this.taskService = taskService;
        this.userService = userService;
        this.commentService = commentService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTask(@PathVariable Long id) {
        Task task = taskService.getTask(id);

        return ResponseEntity.ok(taskService.taskToDTO(task));
    }

    @GetMapping("/sprint/{sprintId}")
    public ResponseEntity<List<TaskDTO>> getTasksForSprint(@PathVariable long sprintId) {
        List<TaskDTO> tasks = new ArrayList<>();

        for (Task task : taskService.getTasksForSprint(sprintId)) {
            TaskDTO TaskDTO = taskService.taskToDTO(task);
            tasks.add(TaskDTO);
        }

        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/project/{projectId}/task-ratio")
    public ResponseEntity<List<TaskTypeCountDTO>> getTaskRatioForProject(@PathVariable long projectId) {
        return ResponseEntity.ok(taskService.getTaskRatioForProject(projectId));
    }

    @PostMapping("/")
    public ResponseEntity<TaskDTO> addTask(@RequestBody TaskDTO newTask) {
        User currentUser = userService.getCurrentUser();
        Task task = taskService.addTask(this.taskService.dtoToTask(newTask), currentUser);

        return ResponseEntity.ok(taskService.taskToDTO(task));
    }

    @PostMapping("/comments")
    public ResponseEntity<TaskDTO> addComment(@RequestBody CommentDTO dto) {
        Comment comment = commentService.addComment(commentService.dtoToComment(dto));
        Task task = comment.getTask();

        return ResponseEntity.ok(taskService.taskToDTO(task));
    }

    @PutMapping("/")
    public ResponseEntity<TaskDTO> updateTask(@RequestBody TaskDTO dto) {
        Task updatedTask = taskService.updateTaskDetails(dto);

        return ResponseEntity.ok(taskService.taskToDTO(updatedTask));
    }

    @PostMapping("/sprint")
    public ResponseEntity<List<TaskDTO>> getTasksForSprints(@RequestBody List<Long> sprintsIds) {
        List<TaskDTO> tasks = new ArrayList<>();

        for (Task task : taskService.getTasksForSprints(sprintsIds)) {
            TaskDTO TaskDTO = taskService.taskToDTO(task);
            tasks.add(TaskDTO);
        }

        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/state")
    public ResponseEntity<TaskDTO> updateTaskState(@RequestBody UpdateTaskStateDTO dto) {
        Task task = taskService.updateTaskState(dto.getTaskId(), dto.getState());

        return ResponseEntity.ok(taskService.taskToDTO(task));
    }

    @PostMapping("/estimation")
    public ResponseEntity<TaskDTO> updateTaskEstimation(@RequestBody UpdateTaskEstimationDTO dto) {
        Task task = taskService.updateTaskEstimation(dto.getTaskId(), dto.getEstimation());

        return ResponseEntity.ok(taskService.taskToDTO(task));
    }

    @PostMapping("/sprint/transition")
    public ResponseEntity<TaskDTO> updateTaskSprint(@RequestBody UpdateTaskSprintDTO dto) {
        Task task = taskService.updateTaskSprint(dto.getTaskId(), dto.getSprintId(), dto.getPosition());

        return ResponseEntity.ok(taskService.taskToDTO(task));
    }

    @PostMapping("/reporter")
    public ResponseEntity<TaskDTO> updateTaskReporter(@RequestBody UserAndTaskDTO dto) {
        Task task = taskService.updateTaskReporter(dto.getTaskId(), dto.getUsername());

        return ResponseEntity.ok(taskService.taskToDTO(task));
    }

    @PutMapping("/assignee")
    public ResponseEntity<TaskDTO> updateTaskAssignee(@RequestBody UserAndTaskDTO dto) {
        Task task = taskService.updateTaskAssignee(dto.getTaskId(), dto.getUsername());

        return ResponseEntity.ok(taskService.taskToDTO(task));
    }

    @GetMapping("/assignable/{taskId}")
    public ResponseEntity<List<UserDTO>> getAssignableMembers(@PathVariable Long taskId) {
        List<UserDTO> users = new ArrayList<>();

        for (User user : taskService.getAssignableMembers(taskId)) {
            UserDTO userDTO = UserService.userToDTO(user);
            users.add(userDTO);
        }

        return ResponseEntity.ok(users);
    }
}
