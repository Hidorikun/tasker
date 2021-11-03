package com.hidorikun.tasker.repository;

import com.hidorikun.tasker.model.entity.Project;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends CrudRepository<Project, Long> {

    @Query("SELECT DISTINCT p FROM Project AS p " +
            "INNER JOIN p.admins AS a " +
            "LEFT JOIN p.teams AS t " +
            "LEFT JOIN t.members AS m " +
            "WHERE (a.username = :username) OR (m.username = :username)")
    List<Project> getProjectsForUser(@Param("username") String username);
}
