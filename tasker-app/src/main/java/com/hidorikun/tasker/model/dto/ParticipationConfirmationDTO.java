package com.hidorikun.tasker.model.dto;

public class ParticipationConfirmationDTO {
    private Long unitId;

    public ParticipationConfirmationDTO() {
    }

    public ParticipationConfirmationDTO(Long unitId) {
        this.unitId = unitId;
    }

    public Long getUnitId() {
        return unitId;
    }

    public void setUnitId(Long unitId) {
        this.unitId = unitId;
    }
}
