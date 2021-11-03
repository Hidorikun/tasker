package com.hidorikun.tasker.model.dto;

public class UpdateTaskEstimationDTO {
    private Long taskId;
    private Long estimation;

    public UpdateTaskEstimationDTO(Long taskId, Long estimation) {
        this.taskId = taskId;
        this.estimation = estimation;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Long getEstimation() {
        return estimation;
    }

    public void setEstimation(Long estimation) {
        this.estimation = estimation;
    }
}
