package com.hidorikun.tasker.service;

import com.hidorikun.tasker.model.entity.Sprint;
import com.hidorikun.tasker.model.entity.Team;
import com.hidorikun.tasker.model.entity.User;
import com.hidorikun.tasker.model.dto.*;
import com.hidorikun.tasker.repository.SprintRepository;
import com.hidorikun.tasker.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.io.IOException;
import java.security.InvalidParameterException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;

@Service
public class TeamService {

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private SprintRepository sprintRepository;

    @Autowired
    private EmailService emailService;

    @Transactional(readOnly = true)
    public List<Team> getTeams() {
        List<Team> teams = new ArrayList<>();
        this.teamRepository.findAll().forEach(teams::add);
        return teams;
    }

    @Transactional
    public Team addTeam(Team team) {
        team.getMembers().add(userService.getCurrentUser());

        Sprint backlog = new Sprint();
        backlog.setNumber(0L);
        backlog.setName("Backlog");
        backlog.setTeam(team);

        team.getSprints().add(backlog);
        return this.teamRepository.save(team);
    }

    @Transactional(readOnly = true)
    public Team getTeam(Long id) {
        return this.teamRepository.findById(id).orElse(null);
    }

    @Transactional
    public Team assignMember(Long teamId, String username) throws Exception {
        Team team = getTeam(teamId);

        if (team == null) {
            throw new InvalidParameterException("Team does not exist");
        }

        User user = this.userService.getUser(username);

        if (user == null) {
            throw new InvalidParameterException("User does not exist");
        }

        team.getMembers().add(user);

        return this.teamRepository.save(team);
    }

    @Transactional
    public List<Team> getTeamsForUser(User user) {
        return teamRepository.getTeamsForUser(user.getUsername());
    }

    public TeamDTO teamToDTO(Team team) throws DataFormatException, IOException {

        if (team == null) {
            return null;
        }

        Set<UserDTO> members = new HashSet<>();
        for (User user : team.getMembers()) {
            members.add(UserService.userToDTO(user));
        }

        List<Sprint> activeSprints = this.sprintRepository.getActiveSprintForTeam(team.getId());
        Long activeSprintId = activeSprints.size() > 0 ? activeSprints.get(0).getId() : null;

        TeamDTO dto = new TeamDTO();

        dto.setId(team.getId());
        dto.setName(team.getName());
        dto.setShortDescription(team.getShortDescription());
        dto.setMembers(members);
        dto.setProjectId(team.getProject().getId());
        dto.setSprintsIds(team.getSprints().stream().map(Sprint::getId).collect(Collectors.toSet()));
        dto.setActiveSprintId(activeSprintId);
        dto.setSize(members.size());

        return dto;
    }

    public Team dtoToTeam(TeamDTO dto) {

        if (dto == null) {
            return null;
        }

        Team result = new Team();

        result.setName(dto.getName());
        result.setShortDescription(dto.getName());

        if (dto.getMembers() != null) {
            Set<User> members = new HashSet<>();
            for (UserDTO userDTO : dto.getMembers()) {
                members.add(userService.getUser(userDTO.getUsername()));
            }
            result.setMembers(members);
        }

        if (dto.getProjectId() != null) {
            result.setProject(this.projectService.getProject(dto.getProjectId()));
        }

        return result;
    }

    @Transactional
    public List<Team> getTeamsForProject(long projectId) {
        return teamRepository.getTeamsForProject(projectId);
    }

    public void requestMember(ParticipationRequestDTO participationRequestDTO) throws MessagingException {
        User requester = this.userService.getCurrentUser();
        Team team = this.getTeam(participationRequestDTO.getUnitId());

        this.emailService.sendJoinTeamEmail(
                requester,
                team,
                participationRequestDTO.getEmail(),
                participationRequestDTO.getRegisterUrl()
        );
    }

}
