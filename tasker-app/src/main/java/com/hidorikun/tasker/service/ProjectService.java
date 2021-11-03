package com.hidorikun.tasker.service;

import com.hidorikun.tasker.model.dto.ParticipationRequestDTO;
import com.hidorikun.tasker.model.dto.ProjectDTO;
import com.hidorikun.tasker.model.dto.TeamDTO;
import com.hidorikun.tasker.model.entity.Project;
import com.hidorikun.tasker.model.entity.Team;
import com.hidorikun.tasker.model.entity.User;
import com.hidorikun.tasker.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProjectService {

    @Autowired
    private TeamService teamService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private EmailService emailService;

    @Transactional(readOnly = true)
    public List<Project> getProjects() {
        List<Project> projects = new ArrayList<>();
        this.projectRepository.findAll().forEach(projects::add);
        return projects;
    }

    @Transactional
    public Project addProject(Project project, User admin) {
        project.getAdmins().add(admin);
        return this.projectRepository.save(project);
    }

    @Transactional(readOnly = true)
    public Project getProject(Long projectId) {
        return this.projectRepository.findById(projectId).orElse(null);
    }

    @Transactional
    public void assignTeam(Long projectId, Long teamId) throws Exception {
        Project project = getProject(projectId);

        if (project == null) {
            throw new InvalidParameterException("Project does not exist");
        }

        Team team = this.teamService.getTeam(teamId);

        if (team == null) {
            throw new InvalidParameterException("Team does not exist");
        }

        project.getTeams().add(team);

        this.projectRepository.save(project);
    }

    @Transactional
    public List<Project> getProjectsForUser(User user) {
        return projectRepository.getProjectsForUser(user.getUsername());
    }

    @Transactional
    public Project assignAdmin(Long projectId, String username) {
        Project project = getProject(projectId);

        if (project == null) {
            throw new InvalidParameterException("Project does not exist");
        }

        User user = this.userService.getUser(username);

        if (user == null) {
            throw new InvalidParameterException("User does not exist");
        }

        project.getAdmins().add(user);

        return this.projectRepository.save(project);
    }

    @Transactional
    public ProjectDTO updateProject(ProjectDTO projectDTO) {
        Project updatedProject = getProject(projectDTO.getId());

        updatedProject.setName(projectDTO.getName());
        updatedProject.setShortDescription(projectDTO.getShortDescription());

        this.projectRepository.save(updatedProject);

        return projectToDTO(updatedProject);
    }

    @Transactional
    public List<User> getAdmins(Long projectId) {
        return userService.getAdminsForProject(projectId);
    }

    public static ProjectDTO projectToDTO(Project project) {
        ProjectDTO dto = new ProjectDTO();

        dto.setId(project.getId());
        dto.setName(project.getName());
        dto.setShortDescription(project.getShortDescription());

        Set<Long> adminIds = new HashSet<>();
        project.getAdmins().forEach(admin -> adminIds.add(admin.getId()));
        dto.setAdminIds(adminIds);

        return dto;
    }


    public void requestAdmin(ParticipationRequestDTO participationRequestDTO) throws MessagingException {
        User requester = this.userService.getCurrentUser();
        Project project = this.getProject(participationRequestDTO.getUnitId());

        this.emailService.sendJoinProjectEmail(
            requester,
            project,
            participationRequestDTO.getEmail(),
            participationRequestDTO.getRegisterUrl()
        );
    }

    public Project dtoToProject(ProjectDTO dto) {
        Project project = new Project();

        project.setName(dto.getName());
        project.setShortDescription(dto.getShortDescription());

        if (dto.getTeams() != null) {
            Set<Team> teams = new HashSet<>();
            for (TeamDTO teamDTO : dto.getTeams()) {
                teams.add(teamService.dtoToTeam(teamDTO));
            }
            project.setTeams(teams);
        }

        return project;
    }
}
