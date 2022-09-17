package com.hidorikun.tasker.service;

import com.hidorikun.tasker.errorhandling.SprintActivationException;
import com.hidorikun.tasker.model.dto.SprintDTO;
import com.hidorikun.tasker.model.entity.Sprint;
import com.hidorikun.tasker.model.entity.Task;
import com.hidorikun.tasker.repository.SprintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SprintService {

    @Autowired
    private TeamService teamService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private SprintRepository sprintRepository;

    public static SprintDTO sprintToDTO(Sprint sprint) {

        if (sprint == null) {
            return null;
        }

        return SprintDTO.builder()
            .id(sprint.getId())
            .name(sprint.getName())
            .active(sprint.isActive())
            .number(sprint.getNumber())
            .teamId(sprint.getTeam().getId())
            .tasksIds(sprint.getTasks().stream().map(Task::getId).collect(Collectors.toSet()))
            .build();
    }

    @Transactional
    public Sprint addSprint(Long teamId) {
        Sprint sprint = new Sprint();

        sprint.setTeam(this.teamService.getTeam(teamId));
        sprint.setNumber(this.sprintRepository.getHighestSprintNumberForTeam(teamId) + 1);
        sprint.setName("Sprint " + sprint.getNumber());
        return this.sprintRepository.save(sprint);
    }

    @Transactional
    public Sprint updateSprint(SprintDTO sprintDTO) {
        Sprint updatedSprint = getSprint(sprintDTO.getId());

        updatedSprint.setName(sprintDTO.getName());

        this.sprintRepository.save(updatedSprint);

        return updatedSprint;
    }

    @Transactional(readOnly = true)
    public Sprint getSprint(Long id) {
        return this.sprintRepository.findById(id).orElse(null);
    }

    @Transactional
    public List<Sprint> getSprintForTeam(Long teamId) {
        return sprintRepository.getSprintsForTeam(teamId);
    }

    @Transactional
    public List<Sprint> getArchivedSprintForTeam(Long teamId) {
        return sprintRepository.getArchivedSprintsForTeam(teamId);
    }

    @Transactional
    public void removeSprint(Long sprintId) {
        sprintRepository.deleteById(sprintId);
    }

    @Transactional
    public Sprint activateSprint(Long sprintId) {

        Sprint sprint = getSprint(sprintId);

        validateSprintActivation(sprint);

        sprint.setActive(true);
        return sprintRepository.save(sprint);
    }

    @Transactional
    public Sprint deactivateSprint(Long sprintId) {

        Sprint sprint = getSprint(sprintId);

        validateSprintDeactivation(sprint);

        sprint.setActive(false);
        return sprintRepository.save(sprint);
    }

    @Transactional
    public Sprint archiveSprint(Long sprintId) {

        Sprint sprint = getSprint(sprintId);

        sprint.setArchived(true);
        sprint.setActive(false);
        return sprintRepository.save(sprint);
    }

    @Transactional
    public Sprint unarchiveSprint(Long sprintId) {

        Sprint sprint = getSprint(sprintId);

        sprint.setArchived(false);
        return sprintRepository.save(sprint);
    }

    private void validateSprintActivation(Sprint sprint) {
        if (sprintRepository.existsActiveSprintForTeam(sprint.getTeam().getId())) {
            throw new SprintActivationException("Only one sprint can be active at any given time.");
        }
    }

    private void validateSprintDeactivation(Sprint sprint) {
        if (!sprintRepository.existsActiveSprintForTeam(sprint.getTeam().getId())) {
            throw new SprintActivationException("Only active sprints can be deactivated");
        }
    }

    public Sprint dtoToSprint(SprintDTO dto) {

        if (dto == null) {
            return null;
        }

        Sprint result = new Sprint();

        result.setName(dto.getName());
        result.setActive(dto.isActive());
        result.setNumber(dto.getNumber());

        if (dto.getTeamId() != null) {
            result.setTeam(this.teamService.getTeam(dto.getTeamId()));
        }

        if (dto.getTasksIds() != null) {
            result.setTasks(this.taskService.getTasks(dto.getTasksIds()));
        }

        return result;
    }

}
