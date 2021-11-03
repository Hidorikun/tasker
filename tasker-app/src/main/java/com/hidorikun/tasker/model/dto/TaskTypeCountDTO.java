package com.hidorikun.tasker.model.dto;

import com.hidorikun.tasker.model.enums.TaskType;

public class TaskTypeCountDTO {
    private TaskType taskType;
    private long count;

    public TaskTypeCountDTO(TaskType taskType, long count) {
        this.taskType = taskType;
        this.count = count;
    }

    public TaskType getTaskType() {
        return taskType;
    }

    public void setTaskType(TaskType taskType) {
        this.taskType = taskType;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}
