package com.hidorikun.tasker.model.dto;

import lombok.Data;

@Data
public class UpdateTaskSprintDTO {
    private Long taskId;
    private Long sprintId;
    private Long position;
}
