package com.hidorikun.tasker.model.dto;

import com.hidorikun.tasker.model.enums.TaskType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class TaskTypeCountDTO {
    private TaskType taskType;
    private long count;
}
