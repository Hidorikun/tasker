package com.hidorikun.tasker.model.dto;

public class UserAndTaskDTO {
    private Long taskId;
    private String username;

    public UserAndTaskDTO() {
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
