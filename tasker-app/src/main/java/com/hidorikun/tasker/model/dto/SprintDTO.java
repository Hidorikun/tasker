package com.hidorikun.tasker.model.dto;

import java.util.HashSet;
import java.util.Set;

public class SprintDTO {
    private Long id;
    private String name;
    private Long number;
    private Long teamId;
    private Set<Long> tasksIds;
    private boolean active = false;

    public SprintDTO() {
        this.tasksIds = new HashSet<>();
    }

    public SprintDTO(Long id, String name, Long number, Long teamId, Set<Long> tasksIds, boolean active) {
        this.id = id;
        this.name = name;
        this.number = number;
        this.teamId = teamId;
        this.tasksIds = tasksIds;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getNumber() {
        return number;
    }

    public void setNumber(Long number) {
        this.number = number;
    }

    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }

    public Set<Long> getTasksIds() {
        return tasksIds;
    }

    public void setTasksIds(Set<Long> tasksIds) {
        this.tasksIds = tasksIds;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
