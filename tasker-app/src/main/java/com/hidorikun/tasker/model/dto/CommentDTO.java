package com.hidorikun.tasker.model.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class CommentDTO {
    private Long id;
    private String content;
    private UserDTO owner;
    private Long taskId;
    private Date createdOn;
}
