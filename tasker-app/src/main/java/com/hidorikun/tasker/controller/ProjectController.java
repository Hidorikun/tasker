package com.hidorikun.tasker.controller;

import com.hidorikun.tasker.model.dto.*;
import com.hidorikun.tasker.model.entity.Project;
import com.hidorikun.tasker.model.entity.User;
import com.hidorikun.tasker.service.ProjectService;
import com.hidorikun.tasker.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.DataFormatException;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final UserService userService;

    public ProjectController(ProjectService projectService, UserService userService) {
        this.projectService = projectService;
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> getProject(@PathVariable Long id) {
        Project project = projectService.getProject(id);

        return ResponseEntity.ok(ProjectService.projectToDTO(project));
    }

    @GetMapping("/{projectId}/admins")
    public ResponseEntity<List<UserDTO>> getAdmins(@PathVariable Long projectId) throws DataFormatException, IOException {
        List<UserDTO> admins = new ArrayList<>();

        for (User user : projectService.getAdmins(projectId)) {
            UserDTO userDTO = UserService.userToDTO(user);
            admins.add(userDTO);
        }

        return ResponseEntity.ok(admins);
    }

    @GetMapping("/")
    public ResponseEntity<List<ProjectDTO>> getProjectsForCurrentUser() {
        List<ProjectDTO> projects = new ArrayList<>();

        for (Project project : projectService.getProjectsForUser(userService.getCurrentUser())) {
            ProjectDTO projectDTO = ProjectService.projectToDTO(project);
            projects.add(projectDTO);
        }

        return ResponseEntity.ok(projects);
    }

    @PostMapping("/")
    public ResponseEntity<ProjectDTO> addProject(@RequestBody ProjectDTO newProject) {
        Project project = projectService.addProject(projectService.dtoToProject(newProject), userService.getCurrentUser());

        return ResponseEntity.ok(ProjectService.projectToDTO(project));
    }

    @PutMapping("/")
    public ResponseEntity<ProjectDTO> updateProject(@RequestBody ProjectDTO projectDTO) {
        ProjectDTO project = projectService.updateProject(projectDTO);

        return ResponseEntity.ok(project);
    }

    @PostMapping("/requestAdmin")
    public ResponseEntity<ProjectDTO> requestAdmin(@RequestBody ParticipationRequestDTO request) throws MessagingException {
        projectService.requestAdmin(request);

        return ResponseEntity.ok(new ProjectDTO());
    }

    @PostMapping("/confirmAdmin")
    public ResponseEntity<ProjectDTO> confirmAdmin(@RequestBody ParticipationConfirmationDTO confirmation) {
        User currentUser = userService.getCurrentUser();
        Project project = projectService.assignAdmin(confirmation.getUnitId(), currentUser.getUsername());

        return ResponseEntity.ok(ProjectService.projectToDTO(project));
    }
}
