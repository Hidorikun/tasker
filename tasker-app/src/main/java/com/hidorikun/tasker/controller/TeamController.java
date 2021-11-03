package com.hidorikun.tasker.controller;

import com.hidorikun.tasker.model.dto.ParticipationConfirmationDTO;
import com.hidorikun.tasker.model.entity.Team;
import com.hidorikun.tasker.model.entity.User;
import com.hidorikun.tasker.model.dto.ParticipationRequestDTO;
import com.hidorikun.tasker.model.dto.TeamDTO;
import com.hidorikun.tasker.model.dto.UserDTO;
import com.hidorikun.tasker.service.TeamService;
import com.hidorikun.tasker.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.DataFormatException;

@RestController
@RequestMapping("/teams")
public class TeamController {

    private final TeamService teamService;
    private final UserService userService;

    public TeamController(TeamService teamService, UserService userService) {
        this.teamService = teamService;
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeamDTO> getTeam(@PathVariable Long id) throws DataFormatException, IOException {
        Team team = teamService.getTeam(id);

        return ResponseEntity.ok(teamService.teamToDTO(team));
    }

    @GetMapping("/")
    public ResponseEntity<List<TeamDTO>> getTeamsForCurrentUser() throws DataFormatException, IOException {
        List<TeamDTO> teams = new ArrayList<>();

        for (Team team : teamService.getTeamsForUser(userService.getCurrentUser())) {
            TeamDTO teamDTO = teamService.teamToDTO(team);
            teams.add(teamDTO);
        }

        return ResponseEntity.ok(teams);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<TeamDTO>> getTeamsAssignedToProject(@PathVariable long projectId) throws DataFormatException, IOException {
        List<TeamDTO> teams = new ArrayList<>();

        for (Team team : teamService.getTeamsForProject(projectId)) {
            TeamDTO teamDTO = teamService.teamToDTO(team);
            teams.add(teamDTO);
        }

        return ResponseEntity.ok(teams);
    }

    @GetMapping("/{teamId}/members")
    public ResponseEntity<List<UserDTO>> getTeamMembers(@PathVariable long teamId) throws DataFormatException, IOException {
        List<UserDTO> members = new ArrayList<>();

        for (User user : userService.getUsersForTeam(teamId)) {
            UserDTO userDTO = UserService.userToDTO(user);
            members.add(userDTO);
        }

        return ResponseEntity.ok(members);
    }

    @PostMapping("/")
    public ResponseEntity<TeamDTO> addTeam(@RequestBody TeamDTO newTeam) throws Exception {
        Team team = teamService.addTeam(this.teamService.dtoToTeam(newTeam));

        return ResponseEntity.ok(teamService.teamToDTO(team));
    }

    @PostMapping("/requestMember")
    public ResponseEntity<TeamDTO> requestMember(@RequestBody ParticipationRequestDTO request) throws Exception {
        teamService.requestMember(request);

        return ResponseEntity.ok(new TeamDTO());
    }

    @PostMapping("/confirmMember")
    public ResponseEntity<TeamDTO> confirmMember(@RequestBody ParticipationConfirmationDTO confirmation) throws Exception {
        User currentUser = userService.getCurrentUser();
        Team team = teamService.assignMember(confirmation.getUnitId(), currentUser.getUsername());

        return ResponseEntity.ok(teamService.teamToDTO(team));
    }



}
