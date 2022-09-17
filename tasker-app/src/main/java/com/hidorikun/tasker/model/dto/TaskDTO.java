package com.hidorikun.tasker.model.dto;

import com.hidorikun.tasker.model.enums.TaskState;
import com.hidorikun.tasker.model.enums.TaskType;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
@Builder
public class TaskDTO {
    private Long id;
    private String summary;
    private String description;
    private Long sprintId;
    private TaskState state;
    private Long position;
    private UserDTO reporter;
    private UserDTO assignee;
    private Set<CommentDTO> comments;
    private TaskType type;
    private Date createdOn;
    private Date closedOn;
    private Long estimation;
}
