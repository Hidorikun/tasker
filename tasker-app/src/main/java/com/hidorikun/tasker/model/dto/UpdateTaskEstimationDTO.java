package com.hidorikun.tasker.model.dto;

import lombok.Data;

@Data
public class UpdateTaskEstimationDTO {
    private Long taskId;
    private Long estimation;
}
