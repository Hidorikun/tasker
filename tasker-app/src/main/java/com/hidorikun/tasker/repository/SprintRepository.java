package com.hidorikun.tasker.repository;

import com.hidorikun.tasker.model.entity.Sprint;
import com.hidorikun.tasker.model.entity.Team;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SprintRepository extends CrudRepository<Sprint, Long> {

    @Query("SELECT s FROM Sprint AS s INNER JOIN s.team AS t WHERE t.id = :teamId AND s.archived = 0 ORDER BY s.number DESC")
    List<Sprint> getSprintsForTeam(@Param("teamId") Long teamId);

    @Query("SELECT s FROM Sprint AS s INNER JOIN s.team AS t WHERE t.id = :teamId AND s.archived = 1 ORDER BY s.number DESC")
    List<Sprint> getArchivedSprintsForTeam(@Param("teamId") Long teamId);

    @Query("SELECT MAX(s.number) FROM Sprint s")
    Long getHighestSprintNumberForTeam(Long teamId);

    @Query("SELECT (COUNT(s) > 0) FROM Sprint AS s INNER JOIN s.team AS t WHERE t.id = :teamId AND s.active = 1")
    boolean existsActiveSprintForTeam(@Param("teamId") Long teamId);

    @Query("SELECT s FROM Sprint AS s INNER JOIN s.team AS t WHERE t.id = :teamId AND s.active = 1")
    Sprint getActiveSprintForTeam(@Param("teamId") Long teamId);
}

