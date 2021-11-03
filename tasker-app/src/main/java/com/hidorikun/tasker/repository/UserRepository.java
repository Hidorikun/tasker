package com.hidorikun.tasker.repository;

import com.hidorikun.tasker.model.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByUsername(String username);

    @Query("SELECT u FROM User AS u INNER JOIN u.teams AS t WHERE t.id = :teamId")
    List<User> getUsersForTeam(@Param("teamId") long teamId);

    @Query("SELECT u FROM User AS u INNER JOIN u.projects AS p WHERE p.id = :projectId")
    List<User> getAdminsForProject(Long projectId);
}
