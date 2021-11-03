package com.hidorikun.tasker.model.dto;

import java.util.Date;

public class CommentDTO {
    private Long id;
    private String content;
    private UserDTO owner;
    private Long taskId;
    private Date createdOn;

    public CommentDTO() {
    }

    public CommentDTO(Long id, String content, UserDTO owner, Long taskId, Date createdOn) {
        this.id = id;
        this.content = content;
        this.owner = owner;
        this.taskId = taskId;
        this.createdOn = createdOn;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public UserDTO getOwner() {
        return owner;
    }

    public void setOwner(UserDTO owner) {
        this.owner = owner;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Date getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }
}
