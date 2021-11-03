package com.hidorikun.tasker.controller;

import com.hidorikun.tasker.model.entity.Sprint;
import com.hidorikun.tasker.model.dto.SprintDTO;
import com.hidorikun.tasker.service.SprintService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/sprints")
public class SprintController {

    private final SprintService sprintService;

    public SprintController(SprintService sprintService) {
        this.sprintService = sprintService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<SprintDTO> getSprint(@PathVariable Long id) {
        Sprint sprint = sprintService.getSprint(id);

        return ResponseEntity.ok(SprintService.sprintToDTO(sprint));
    }

    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<SprintDTO>> getSprintsForTeam(@PathVariable long teamId) {
        List<SprintDTO> sprints = new ArrayList<>();

        for (Sprint sprint : sprintService.getSprintForTeam(teamId)) {
            SprintDTO sprintDTO = SprintService.sprintToDTO(sprint);
            sprints.add(sprintDTO);
        }

        return ResponseEntity.ok(sprints);
    }

    @GetMapping("/team/{teamId}/archived")
    public ResponseEntity<List<SprintDTO>> getArchivedSprintsForTeam(@PathVariable long teamId)  {
        List<SprintDTO> sprints = new ArrayList<>();

        for (Sprint sprint : sprintService.getArchivedSprintForTeam(teamId)) {
            SprintDTO sprintDTO = SprintService.sprintToDTO(sprint);
            sprints.add(sprintDTO);
        }

        return ResponseEntity.ok(sprints);
    }

    @PostMapping("/")
    public ResponseEntity<SprintDTO> addSprint(@RequestBody SprintDTO newSprint) {
        Sprint sprint = sprintService.addSprint(newSprint.getTeamId());

        return ResponseEntity.ok(SprintService.sprintToDTO(sprint));
    }

    @PostMapping("/activate/{id}")
    public ResponseEntity<SprintDTO> activateSprint(@PathVariable Long id) {
        Sprint sprint = sprintService.activateSprint(id);

        return ResponseEntity.ok(SprintService.sprintToDTO(sprint));
    }

    @PostMapping("/deactivate/{id}")
    public ResponseEntity<SprintDTO> deactivateSprint(@PathVariable Long id) {
        Sprint sprint = sprintService.deactivateSprint(id);

        return ResponseEntity.ok(SprintService.sprintToDTO(sprint));
    }

    @PostMapping("/archive/{id}")
    public ResponseEntity<SprintDTO> archiveSprint(@PathVariable Long id) {
        Sprint sprint = sprintService.archiveSprint(id);

        return ResponseEntity.ok(SprintService.sprintToDTO(sprint));
    }

    @PostMapping("/unarchive/{id}")
    public ResponseEntity<SprintDTO> unarchiveSprint(@PathVariable Long id) {
        Sprint sprint = sprintService.unarchiveSprint(id);

        return ResponseEntity.ok(SprintService.sprintToDTO(sprint));
    }

    @PutMapping("/")
    public ResponseEntity<SprintDTO> updateSprint(@RequestBody SprintDTO sprintDTO) {
        Sprint sprint = sprintService.updateSprint(sprintDTO);

        return ResponseEntity.ok(SprintService.sprintToDTO(sprint));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity removeSprint(@PathVariable Long id) {
        sprintService.removeSprint(id);
        return ResponseEntity.ok().build();
    }


}
