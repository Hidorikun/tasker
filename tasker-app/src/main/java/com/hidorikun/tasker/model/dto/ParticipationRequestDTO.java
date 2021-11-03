package com.hidorikun.tasker.model.dto;

public class ParticipationRequestDTO {
    private Long unitId;
    private String email;
    private String registerUrl;

    public ParticipationRequestDTO() {
    }

    public ParticipationRequestDTO(Long unitId, String email, String registerUrl) {
        this.unitId = unitId;
        this.email = email;
        this.registerUrl = registerUrl;
    }

    public Long getUnitId() {
        return unitId;
    }

    public void setUnitId(Long unitId) {
        this.unitId = unitId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRegisterUrl() {
        return registerUrl;
    }

    public void setRegisterUrl(String registerUrl) {
        this.registerUrl = registerUrl;
    }
}
