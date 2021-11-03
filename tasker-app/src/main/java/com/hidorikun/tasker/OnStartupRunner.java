package com.hidorikun.tasker;

import com.hidorikun.tasker.model.entity.Comment;
import com.hidorikun.tasker.model.enums.TaskType;
import com.hidorikun.tasker.repository.ProjectRepository;
import com.hidorikun.tasker.repository.SprintRepository;
import com.hidorikun.tasker.repository.TaskRepository;
import com.hidorikun.tasker.repository.UserRepository;
import com.hidorikun.tasker.service.CommentService;
import com.hidorikun.tasker.service.EmailService;
import com.hidorikun.tasker.service.TaskService;
import com.hidorikun.tasker.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;

@Component
public class OnStartupRunner implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(OnStartupRunner.class);

    @Autowired
    private UserRepository userRepository;
//
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private SprintRepository sprintRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private CommentService commentService;

    @Override
    @Transactional
    public void run(String... args) throws MessagingException {

        log.info("projects for ioana");
        projectRepository.getProjectsForUser("ioana").forEach(project -> {log.info(project.getName());});

//        log.info(taskRepository.countTasksForProjectByType(2L, TaskType.TASK).toString());

//    for (Comment c : commentService.getCommentsForTask(32L)) {
//        log.info(c.getCreatedOn().toString());
//    }
//        this.emailService.sendJoinTeamEmail("asdf", "georgevele2016@gmail.com", "hello", "<h1>hello world</h1>");
//
//       taskService.updateTaskSprint(14L, 15L, 0L);

//        taskRepository.moveTaskToHigherPosition(15L, 1L, 2L);
//        log.info(sprintRepository.getHighestSprintNumberForTeam(11L).toString());

//        repository.save(new User("asdf", "George", "Vele", "asdf@asdf.com", "asdf"));
//        for (User user : this.repository.findAll()) {
//            log.debug(user.toString());
//        }

//        User user = userRepository.findByUsername("asdf").orElse(null);

//        for (Project p : this.projectRepository.getProjectsForUser("asdf")) {
//            log.info(p.getName());
//            log.info(p.getAdmins().toString());
//
//            log.info("");
//        }
        // save a couple of customers
//        repository.save(new User("Ranga", "Admin"));
//        repository.save(new User("Ravi", "User"));
//        repository.save(new User("Satish", "Admin"));
//        repository.save(new User("Raghu", "User"));
//
//        log.info("-------------------------------");
//        log.info("Finding all users");
//        log.info("-------------------------------");
//        for (User user : repository.findByRole("Admin")) {
//            log.info(user.toString());
//        }

    }

}

