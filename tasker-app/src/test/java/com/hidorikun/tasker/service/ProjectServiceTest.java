package com.hidorikun.tasker.service;

import com.hidorikun.tasker.model.entity.Project;
import com.hidorikun.tasker.model.entity.Team;
import com.hidorikun.tasker.model.entity.User;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
class ProjectServiceTest {

    @Autowired
    private TeamService teamService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @Mock
    private SecurityContextHolder securityContextHolder;


    @Test
    void contextLoads() {
    }

    @Test
    void canAddValidPorjectTest() {
        User george = this.userService.addUser(new User("gvele", "George", "Vele", "georgevele2016@gmail.com", "coolpass123"));

        Project tasker = this.projectService.addProject(new Project("Tasker", "Your friendly neighbourhood issue tracker"), george);

        Assert.assertEquals(1, this.projectService.getProjects().size());
    }

    @Test
    void canAssignTeamsTest() throws Exception {
        User george = this.userService.addUser(
                new User("gvele",
                        "George",
                        "Vele",
                        "georgevele2016@gmail.com",
                        "coolpass123")
        );

        Project tasker = this.projectService.addProject(
                new Project(
                        "Tasker",
                        "Your friendly neighbourhood issue tracker"),
                george
        );

        Team qwerty =  this.teamService.addTeam(new Team("qwerty", "The dream team"));

        this.projectService.assignTeam(tasker.getId(), qwerty.getId());

        Assert.assertEquals(1, tasker.getTeams().size());
    }

    @Test
    void canAssignAdminsTest() {
        User george = this.userService.addUser(new User("gvele", "George", "Vele", "georgevele2016@gmail.com", "coolpass123"));

        Project tasker = this.projectService.addProject(new Project("Tasker", "Your friendly neighbourhood issue tracker"), george);

        this.projectService.assignAdmin(tasker.getId(), george.getUsername());

        Assert.assertEquals(1, tasker.getAdmins().size());
    }

    @Test
    @Transactional
    void projectAdminIsAssignedOnCreationTest() throws Exception {
        Project tasker = new Project("Tasker", "Your friendly neighbourhood issue tracker");
        User george = this.userService.addUser(new User("gvele", "George", "Vele", "georgevele2016@gmail.com", "coolpass123"));

        this.projectService.addProject(tasker, george);


        Assert.assertEquals(1, this.projectService.getProject(tasker.getId()).getAdmins().size());
    }


    @Test
    @Transactional
    void getProjectsForAdminUsersTest() throws Exception {
        Project tasker = new Project("Tasker", "Your friendly neighbourhood issue tracker");
        User george = this.userService.addUser(new User("gvele", "George", "Vele", "georgevele2016@gmail.com", "coolpass123"));

        this.projectService.addProject(tasker, george);

        Assert.assertEquals(1, this.projectService.getProject(tasker.getId()).getAdmins().size());
    }
}
