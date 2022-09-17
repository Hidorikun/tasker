package com.hidorikun.tasker.model.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private byte[] image;
}
