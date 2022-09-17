package com.hidorikun.tasker.model.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class TeamDTO {
    private Long id;
    private String name;
    private String shortDescription;
    private Set<UserDTO> members;
    private Long projectId;
    private Set<Long> sprintsIds;
    private Long activeSprintId;
    private int size;
}
