package com.hidorikun.tasker.model.dto;

import java.util.HashSet;
import java.util.Set;

public class TeamDTO {
    private Long id;
    private String name;
    private String shortDescription;
    private Set<UserDTO> members;
    private Long projectId;
    private Set<Long> sprintsIds;
    private Long activeSprintId;
    private int size;

    public TeamDTO() {
        this.sprintsIds = new HashSet<>();
        this.members = new HashSet<>();
    }

    public TeamDTO(Long id, String name, String shortDescription, Set<UserDTO> members, Long projectId, Set<Long> sprintsIds, Long activeSprintId, int size) {
        this.id = id;
        this.name = name;
        this.shortDescription = shortDescription;
        this.members = members;
        this.projectId = projectId;
        this.sprintsIds = sprintsIds;
        this.activeSprintId = activeSprintId;
        this.size = size;
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

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public Set<UserDTO> getMembers() {
        return members;
    }

    public void setMembers(Set<UserDTO> members) {
        this.members = members;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public Set<Long> getSprintsIds() {
        return sprintsIds;
    }

    public void setSprintsIds(Set<Long> sprintsIds) {
        this.sprintsIds = sprintsIds;
    }

    public Long getActiveSprintId() {
        return activeSprintId;
    }

    public void setActiveSprintId(Long activeSprintId) {
        this.activeSprintId = activeSprintId;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }
}
