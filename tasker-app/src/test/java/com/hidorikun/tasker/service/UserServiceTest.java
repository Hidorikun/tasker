package com.hidorikun.tasker.service;

import com.hidorikun.tasker.model.entity.User;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    void contextLoads() {
    }

    @Test
    void canAddValidUser() {
        User george = this.userService.addUser(new User("gvele", "George", "Vele", "georgevele2016@gmail.com", "coolpass123"));

        Assert.assertNotNull(this.userService.getUser("gvele"));
    }
}
