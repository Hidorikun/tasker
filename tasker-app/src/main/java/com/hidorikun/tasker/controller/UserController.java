package com.hidorikun.tasker.controller;

import com.hidorikun.tasker.model.entity.User;
import com.hidorikun.tasker.model.dto.UserDTO;
import com.hidorikun.tasker.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.zip.DataFormatException;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/current")
    public ResponseEntity<UserDTO> getCurrentUser() throws DataFormatException, IOException {
        User currentUser = userService.getCurrentUser();

        return ResponseEntity.ok(UserService.userToDTO(currentUser));
    }

    @GetMapping("/profiles/{username}")
    public ResponseEntity<UserDTO> getUserProfile(@PathVariable String username) throws DataFormatException, IOException {
        User userProfile = userService.getUser(username);

        return ResponseEntity.ok(UserService.userToDTO(userProfile));
    }

    @PutMapping("/profiles")
    public ResponseEntity<UserDTO> updateUserProfile(@RequestBody UserDTO userProfile) throws Exception {
        UserDTO userDTO = userService.updateUser(userProfile);

        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/profiles/image")
    public ResponseEntity<UserDTO> uploadUserProfileImage(@RequestParam("imageFile") MultipartFile image) throws Exception {
        UserDTO userDTO = UserService.userToDTO(userService.updateProfileImage(image.getBytes()));

        return ResponseEntity.ok(userDTO);
     }

     @DeleteMapping("/profiles/image")
     public ResponseEntity<UserDTO> removeUserProfileImage() throws Exception {
         UserDTO userDTO = UserService.userToDTO(userService.updateProfileImage(null));

         return ResponseEntity.ok(userDTO);
     }

}
