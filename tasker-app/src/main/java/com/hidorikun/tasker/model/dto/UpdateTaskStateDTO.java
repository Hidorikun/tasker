package com.hidorikun.tasker.model.dto;

import com.hidorikun.tasker.model.enums.TaskState;
import lombok.Data;

@Data
public class UpdateTaskStateDTO {
    private Long taskId;
    private TaskState state;
}
