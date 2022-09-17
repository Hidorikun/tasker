package com.hidorikun.tasker.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ParticipationRequestDTO {
    private Long unitId;
    private String email;
    private String registerUrl;
}
