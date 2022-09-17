package com.hidorikun.tasker.service;

import com.hidorikun.tasker.model.dto.CommentDTO;
import com.hidorikun.tasker.model.dto.TaskDTO;
import com.hidorikun.tasker.model.dto.TaskTypeCountDTO;
import com.hidorikun.tasker.model.entity.Sprint;
import com.hidorikun.tasker.model.entity.Task;
import com.hidorikun.tasker.model.entity.User;
import com.hidorikun.tasker.model.enums.TaskState;
import com.hidorikun.tasker.model.enums.TaskType;
import com.hidorikun.tasker.repository.TaskRepository;
import com.hidorikun.tasker.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;

@Service
public class TaskService {

    @Autowired
    private SprintService sprintService;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @Transactional
    public Task addTask(Task task, User reporter) {
        task.setPosition(this.taskRepository.countTasksForSprint(task.getSprint().getId()));
        task.setReporter(reporter);
        task.setCreatedOn(DateUtil.now());

        return this.taskRepository.save(task);
    }

    @Transactional(readOnly = true)
    public Task getTask(Long id) {
        return this.taskRepository.findById(id).orElse(null);
    }

    @Transactional(readOnly = true)
    public Set<Task> getTasks(Set<Long> ids) {
        return new HashSet<>((Collection<Task>) this.taskRepository.findAllById(ids));
    }

    @Transactional
    public List<Task> getTasksForSprint(Long sprintId) {
        return taskRepository.getTasksForSprint(sprintId);
    }

    @Transactional
    public List<Task> getTasksForSprints(List<Long> sprintsIds) {
        return taskRepository.getTasksForSprints(sprintsIds);
    }

    @Transactional
    public Task updateTaskState(Long taskId, TaskState state) {
        Task task = getTask(taskId);
        task.setState(state);

        if (state == TaskState.DONE) {
            task.setClosedOn(DateUtil.now());
        } else {
            task.setClosedOn(null);
        }
        return taskRepository.save(task);
    }

    @Transactional
    public Task updateTaskEstimation(Long taskId, Long estimation) {
        Task task = getTask(taskId);
        task.setEstimation(estimation);

        return taskRepository.save(task);
    }

    @Transactional
    public Task updateTaskDetails(TaskDTO taskDTO) {
        Task task = getTask(taskDTO.getId());

        task.setSummary(taskDTO.getSummary());
        task.setDescription(taskDTO.getDescription());
        task.setType(taskDTO.getType());

        return taskRepository.save(task);
    }

    @Transactional
    void updateTaskPosition(Task task, Long sprintId, Long position) {
        if (task.getPosition().equals(position)) {
            return;
        }

        if (task.getPosition() < position) {
            taskRepository.moveTaskToHigherPosition(sprintId, task.getPosition(), position);
        } else {
            taskRepository.moveTaskToLowerPosition(sprintId, task.getPosition(), position);
        }

        task.setPosition(position);
        taskRepository.save(task);
    }

    @Transactional
    public Task updateTaskSprint(Long taskId, Long sprintId, Long position) {
        Task task = getTask(taskId);
        Sprint sprint = sprintService.getSprint(sprintId);
        task.setSprint(sprint);

        updateTaskPosition(task, sprintId, position);
        return taskRepository.save(task);
    }

    @Transactional
    public Task updateTaskReporter(Long taskId, String username) {
        Task task = getTask(taskId);
        User reporter = userService.getUser(username);

        task.setReporter(reporter);
        return taskRepository.save(task);
    }

    @Transactional
    public Task updateTaskAssignee(Long taskId, String username) {
        Task task = getTask(taskId);
        User assignee = userService.getUser(username);

        task.setAssignee(assignee);
        return taskRepository.save(task);
    }

    @Transactional
    public List<User> getAssignableMembers(Long taskId) {
        Task task = getTask(taskId);

        return this.userService.getUsersForTeam(task.getSprint().getTeam().getId());
    }

    @Transactional
    public List<TaskTypeCountDTO> getTaskRatioForProject(Long projectId) {
        List<TaskTypeCountDTO> taskRatio = new ArrayList<>();

        for (TaskType type : TaskType.values()) {
            Long count = taskRepository.countTasksForProjectByType(projectId, type);
            taskRatio.add(new TaskTypeCountDTO(type, count));
        }

        return taskRatio;
    }

    public TaskDTO taskToDTO(Task task) {

        if (task == null) {
            return null;
        }

        Set<CommentDTO> comments = commentService.getCommentsForTask(task.getId()).stream()
                .map(CommentService::commentToDTO).collect(Collectors.toSet());

        TaskDTO dto = TaskDTO.builder()
            .id(task.getId())
            .summary(task.getSummary())
            .description(task.getDescription())
            .sprintId(task.getSprint().getId())
            .state(task.getState())
            .position(task.getPosition())
            .type(task.getType())
            .reporter(UserService.userToDTO(task.getReporter()))
            .assignee(UserService.userToDTO(task.getAssignee()))
            .estimation(task.getEstimation())
            .comments(comments)
            .createdOn(task.getCreatedOn())
            .closedOn(task.getClosedOn())
            .build();


        return dto;
    }

    public Task dtoToTask(TaskDTO dto) {

        if (dto == null) {
            return null;
        }

        Task task = new Task();

        task.setDescription(dto.getDescription());
        task.setSummary(dto.getSummary());
        task.setType(dto.getType());

        if (dto.getEstimation() != null) {
            task.setEstimation(dto.getEstimation());
        }

        if (dto.getSprintId() != null) {
            task.setSprint(this.sprintService.getSprint(dto.getSprintId()));
        }

        return task;
    }
}
