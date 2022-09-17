package com.hidorikun.tasker.model.dto;

import lombok.Value;

import java.io.Serializable;

@Value
public class LoginResponseDTO implements Serializable {
    String jwt;
}
