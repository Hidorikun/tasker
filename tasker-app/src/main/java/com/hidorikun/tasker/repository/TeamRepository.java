package com.hidorikun.tasker.repository;

import com.hidorikun.tasker.model.entity.Team;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TeamRepository extends CrudRepository<Team, Long> {

    @Query("SELECT t FROM Team AS t INNER JOIN t.members AS m WHERE m.username = :username")
    List<Team> getTeamsForUser(@Param("username") String username);

    @Query("SELECT t FROM Team AS t INNER JOIN t.project AS p WHERE p.id = :projectId")
    List<Team> getTeamsForProject(long projectId);
}
