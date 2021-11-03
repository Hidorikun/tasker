package com.hidorikun.tasker.model.dto;

import java.util.HashSet;
import java.util.Set;

public class ProjectDTO {
    private Long id;
    private String name;
    private String shortDescription;
    private Set<TeamDTO> teams;
    private Set<Long> adminIds;

    public ProjectDTO() {
        this.teams = new HashSet<>();
    }

    public ProjectDTO(Long id, String name, String shortDescription, Set<TeamDTO> teams, Set<Long> adminIds) {
        this.id = id;
        this.name = name;
        this.shortDescription = shortDescription;
        this.teams = teams;
        this.adminIds = adminIds;
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

    public Set<TeamDTO> getTeams() {
        return teams;
    }

    public void setTeams(Set<TeamDTO> teams) {
        this.teams = teams;
    }

    public Set<Long> getAdminIds() {
        return adminIds;
    }

    public void setAdminIds(Set<Long> adminIds) {
        this.adminIds = adminIds;
    }
}
