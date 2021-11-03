package com.hidorikun.tasker.service;

import com.hidorikun.tasker.model.entity.Project;
import com.hidorikun.tasker.model.entity.Team;
import com.hidorikun.tasker.model.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender javaMailSender;

    private final TemplateEngine templateEngine;

    public EmailService(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    public void sendJoinTeamEmail(User requester, Team team, String toEmail, String registerUrl) throws MessagingException {

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name()
        );

        Context context = new Context();
        context.setVariable("message", requester.getFirstName() + " " + requester.getLastName() + " has invited you to join their team");
        context.setVariable("teamName", team.getName());
        context.setVariable("teamDescription", team.getShortDescription());
        context.setVariable("registerUrl", registerUrl);

        helper.setFrom("Tasker");
        helper.setTo(toEmail);
        helper.setSubject("Join team " + team.getName() + " on Tasker");
        helper.setText(templateEngine.process("joinTeamEmailTemplate", context), true);

        log.info("Sending join team email");

        javaMailSender.send(message);

        log.info("Done: Sending join team email");
    }

    public void sendJoinProjectEmail(User requester, Project project, String toEmail, String registerUrl) throws MessagingException {

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name()
        );

        Context context = new Context();
        context.setVariable("message", requester.getFirstName() + " " + requester.getLastName() + " has invited you to join their project");
        context.setVariable("projectName", project.getName());
        context.setVariable("projectDescription", project.getShortDescription());
        context.setVariable("registerUrl", registerUrl);

        helper.setFrom("Tasker");
        helper.setTo(toEmail);
        helper.setSubject("Join team " + project.getName() + " on Tasker");
        helper.setText(templateEngine.process("joinProjectEmailTemplate", context), true);

        log.info("Sending join project email");

        javaMailSender.send(message);

        log.info("Done: Sending join project email");
    }
}
