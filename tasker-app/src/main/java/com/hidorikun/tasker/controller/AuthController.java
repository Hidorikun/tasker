package com.hidorikun.tasker.controller;

import com.hidorikun.tasker.model.dto.LoginDTO;
import com.hidorikun.tasker.model.dto.LoginResponseDTO;
import com.hidorikun.tasker.model.dto.RegisterDTO;
import com.hidorikun.tasker.model.entity.User;
import com.hidorikun.tasker.service.UserService;
import com.hidorikun.tasker.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtTokenUtil;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtTokenUtil, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userService = userService;
    }

    @PostMapping(value = "/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginDTO loginDTO) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword())
        );

        final UserDetails userDetails = userService
                .loadUserByUsername(loginDTO.getUsername());

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new LoginResponseDTO(jwt));
    }

    @PostMapping(value = "/register")
    public ResponseEntity<LoginResponseDTO> register(@RequestBody RegisterDTO registerDTO) {
        User newUser = User.builder()
            .username(registerDTO.getUsername())
            .firstName(registerDTO.getFirstName())
            .lastName(registerDTO.getLastName())
            .email(registerDTO.getEmail())
            .password(registerDTO.getPassword())
            .build();

        userService.addUser(newUser);

        final String jwt = jwtTokenUtil.generateToken(newUser);

        return ResponseEntity.ok(new LoginResponseDTO(jwt));
    }
}
