package com.hidorikun.tasker.model.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
public class ProjectDTO {
    private Long id;
    private String name;
    private String shortDescription;
    @Builder.Default
    private Set<TeamDTO> teams = new HashSet<>();
    private Set<Long> adminIds;
}
