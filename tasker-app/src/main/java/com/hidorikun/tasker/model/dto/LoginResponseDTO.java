package com.hidorikun.tasker.model.dto;

import java.io.Serializable;

public class LoginResponseDTO implements Serializable {

    private String jwt;

    public LoginResponseDTO(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }
}
