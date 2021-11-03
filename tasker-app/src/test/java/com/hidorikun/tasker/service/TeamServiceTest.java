package com.hidorikun.tasker.service;

import com.hidorikun.tasker.model.entity.Team;
import com.hidorikun.tasker.model.entity.User;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
class TeamServiceTest {

    @Autowired
    private TeamService teamService;

    @Autowired
    private UserService userService;

    @Test
    void contextLoads() {
    }

    @Test
    void canAddValidTeam() {
        Team qwerty = new Team("qwerty", "The dream team");

        this.teamService.addTeam(qwerty);

        Assert.assertEquals(1, this.teamService.getTeams().size());
    }

    @Test
    @Transactional
    void canAssignTeamMembers() throws Exception {
        Team qwerty = this.teamService.addTeam(new Team("qwerty", "The dream team"));
        User george = this.userService.addUser(new User("gvele", "George", "Vele", "georgevele2016@gmail.com", "coolpass"));
        User tudor  = this.userService.addUser(new User("tvele", "Tudor", "Vele", "tudor_vele@gmail.com", "123456"));

        this.teamService.assignMember(qwerty.getId(), george.getUsername());
        this.teamService.assignMember(qwerty.getId(), tudor.getUsername());

        Assert.assertEquals(2, qwerty.getMembers().size());
    }
}
