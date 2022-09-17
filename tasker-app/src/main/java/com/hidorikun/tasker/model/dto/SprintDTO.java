package com.hidorikun.tasker.model.dto;

import lombok.Builder;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
public class SprintDTO {
    private Long id;
    private String name;
    private Long number;
    private Long teamId;
    @Builder.Default
    private Set<Long> tasksIds = new HashSet<>();
    @Builder.Default
    private boolean active = false;
}
