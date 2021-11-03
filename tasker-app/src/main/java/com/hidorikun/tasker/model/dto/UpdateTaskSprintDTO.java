package com.hidorikun.tasker.model.dto;

public class UpdateTaskSprintDTO {
    private Long taskId;
    private Long sprintId;
    private Long position;

    public UpdateTaskSprintDTO() {
    }

    public UpdateTaskSprintDTO(Long taskId, Long sprintId, Long position) {
        this.taskId = taskId;
        this.sprintId = sprintId;
        this.position = position;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Long getSprintId() {
        return sprintId;
    }

    public void setSprintId(Long sprintId) {
        this.sprintId = sprintId;
    }

    public Long getPosition() {
        return position;
    }

    public void setPosition(Long position) {
        this.position = position;
    }
}
