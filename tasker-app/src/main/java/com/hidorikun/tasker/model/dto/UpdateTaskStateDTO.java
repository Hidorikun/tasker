package com.hidorikun.tasker.model.dto;

import com.hidorikun.tasker.model.enums.TaskState;

public class UpdateTaskStateDTO {
    private Long taskId;
    private TaskState state;

    public UpdateTaskStateDTO() {
    }

    public UpdateTaskStateDTO(Long taskId, TaskState state) {
        this.taskId = taskId;
        this.state = state;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public TaskState getState() {
        return state;
    }

    public void setState(TaskState state) {
        this.state = state;
    }
}
