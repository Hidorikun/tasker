package com.hidorikun.tasker.repository;

import com.hidorikun.tasker.model.entity.Task;
import com.hidorikun.tasker.model.entity.Team;
import com.hidorikun.tasker.model.enums.TaskType;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends CrudRepository<Task, Long> {

    @Query("SELECT t FROM Task AS t INNER JOIN t.sprint AS s WHERE s.id = :sprintId ORDER BY t.position ASC")
    List<Task> getTasksForSprint(@Param("sprintId") Long sprintId);

    @Query("SELECT t FROM Task AS t INNER JOIN t.sprint AS s WHERE s.id IN :sprintsIds ORDER BY t.position ASC")
    List<Task> getTasksForSprints(@Param("sprintsIds") List<Long> sprintsIds);

    @Modifying
    @Query("UPDATE Task AS t SET t.position = t.position - 1 " +
            "WHERE (:currentPosition < t.position) AND (t.position <= :targetPosition) AND (t.sprint.id = :sprintId)")
    void moveTaskToHigherPosition(
            @Param("sprintId") Long sprintId,
            @Param("currentPosition") Long currentPosition,
            @Param("targetPosition") Long targetPosition
    );

    @Modifying
    @Query("UPDATE Task AS t SET t.position = t.position + 1 " +
            "WHERE (:targetPosition <= t.position) AND (t.position < :currentPosition) AND (t.sprint.id = :sprintId)")
    void moveTaskToLowerPosition(
            @Param("sprintId") Long sprintId,
            @Param("currentPosition") Long currentPosition,
            @Param("targetPosition") Long targetPosition
    );

    @Query("SELECT COUNT(t) FROM Task AS t WHERE t.sprint.id = :sprintId")
    Long countTasksForSprint(@Param("sprintId") Long sprintId);

    @Query("SELECT COUNT(t) FROM Task AS t " +
            "INNER JOIN t.sprint AS s " +
            "INNER JOIN s.team AS tm " +
            "WHERE (tm.project.id = :projectId) AND (t.type = :type)")
    Long countTasksForProjectByType(Long projectId, TaskType type);
}
