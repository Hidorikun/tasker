package com.hidorikun.tasker.model.dto;

import com.hidorikun.tasker.model.enums.TaskState;
import com.hidorikun.tasker.model.enums.TaskType;

import java.util.Date;
import java.util.Set;

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

    public TaskDTO() {
    }

    public TaskDTO(Long id, String summary, String description, Long sprintId, TaskState state, Long position, UserDTO reporter, UserDTO assignee, Set<CommentDTO> comments, TaskType type, Date createdOn, Date closedOn, Long estimation) {
        this.id = id;
        this.summary = summary;
        this.description = description;
        this.sprintId = sprintId;
        this.state = state;
        this.position = position;
        this.reporter = reporter;
        this.assignee = assignee;
        this.comments = comments;
        this.type = type;
        this.createdOn = createdOn;
        this.closedOn = closedOn;
        this.estimation = estimation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getSprintId() {
        return sprintId;
    }

    public void setSprintId(Long sprintId) {
        this.sprintId = sprintId;
    }

    public TaskState getState() {
        return state;
    }

    public void setState(TaskState state) {
        this.state = state;
    }

    public Long getPosition() {
        return position;
    }

    public void setPosition(Long position) {
        this.position = position;
    }

    public UserDTO getReporter() {
        return reporter;
    }

    public void setReporter(UserDTO reporter) {
        this.reporter = reporter;
    }

    public UserDTO getAssignee() {
        return assignee;
    }

    public void setAssignee(UserDTO assignee) {
        this.assignee = assignee;
    }

    public Set<CommentDTO> getComments() {
        return comments;
    }

    public void setComments(Set<CommentDTO> comments) {
        this.comments = comments;
    }

    public TaskType getType() {
        return type;
    }

    public void setType(TaskType type) {
        this.type = type;
    }

    public Date getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }

    public Date getClosedOn() {
        return closedOn;
    }

    public void setClosedOn(Date closedOn) {
        this.closedOn = closedOn;
    }

    public Long getEstimation() {
        return estimation;
    }

    public void setEstimation(Long estimation) {
        this.estimation = estimation;
    }
}
