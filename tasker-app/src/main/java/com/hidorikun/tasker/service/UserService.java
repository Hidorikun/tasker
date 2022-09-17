package com.hidorikun.tasker.service;

import com.hidorikun.tasker.errorhandling.DuplicateException;
import com.hidorikun.tasker.model.dto.UserDTO;
import com.hidorikun.tasker.model.entity.User;
import com.hidorikun.tasker.repository.UserRepository;
import com.hidorikun.tasker.util.ImageUtil;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.DataFormatException;

@Log
@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    public static UserDTO userToDTO(User user) {

        if (user == null) {
            return null;
        }

        UserDTO result = new UserDTO();

        result.setId(user.getId());
        result.setUsername(user.getUsername());
        result.setFirstName(user.getFirstName());
        result.setLastName(user.getLastName());
        result.setEmail(user.getEmail());
        try {
            result.setImage(ImageUtil.decompressImage(user.getImage()));
        } catch (DataFormatException e) {
            log.info("Could not decompress image.");
        }

        return result;
    }

    public static User dtoToUser(UserDTO dto) {

        if (dto == null) {
            return null;
        }

        return User.builder()
            .username(dto.getUsername())
            .lastName(dto.getLastName())
            .firstName(dto.getFirstName())
            .build();
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        UserDetails userDetails = userRepository.findByUsername(s).orElse(null);

        if (userDetails == null) {
            throw new UsernameNotFoundException("Invalid username");
        }

        return userDetails;
    }

    @Transactional
    public User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @Transactional(readOnly = true)
    public User getUser(String username) {
        return this.userRepository.findByUsername(username).orElse(null);
    }

    @Transactional
    public User addUser(User user) {
        this.validateNewUser(user);
        return this.userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public List<User> getUsers() {
        List<User> users = new ArrayList<>();
        this.userRepository.findAll().forEach(users::add);
        return users;
    }

    @Transactional
    public UserDTO updateUser(UserDTO userDTO) throws Exception {

        User updatedUser = this.getUser(userDTO.getUsername());

        if (updatedUser == null) {
            throw new Exception("User does not exist");
        }

        this.getUsers().stream()
                .filter(user -> !user.getUsername().equals(userDTO.getUsername()))
                .forEach(user -> {
                    if (user.getEmail().equals(userDTO.getEmail())) {
                        throw new DuplicateException("This email is already taken");
                    }
                });

        updatedUser.setFirstName(userDTO.getFirstName());
        updatedUser.setLastName(userDTO.getLastName());
        updatedUser.setEmail(userDTO.getEmail());

        this.userRepository.save(updatedUser);

        return this.userToDTO(updatedUser);
    }

    @Transactional
    public User updateProfileImage(byte[] image) throws IOException {
        User currentUser = this.getCurrentUser();

        currentUser.setImage(ImageUtil.compressImage(image));

        return this.userRepository.save(currentUser);
    }

    public List<User> getAdminsForProject(Long projectId) {
        return this.userRepository.getAdminsForProject(projectId);
    }

    public List<User> getUsersForTeam(long teamId) {
        return this.userRepository.getUsersForTeam(teamId);
    }

    private void validateNewUser(User newUser) {
        this.getUsers().forEach(user -> {
            if (user.getUsername().equals(newUser.getUsername())) {
                throw new DuplicateException("This username is already taken");
            }
            if (user.getEmail().equals(newUser.getEmail())) {
                throw new DuplicateException("This email is already taken");
            }
        });
    }

}
