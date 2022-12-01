package com.hidorikun.tasker.service;

import com.hidorikun.tasker.model.dto.CommentDTO;
import com.hidorikun.tasker.model.entity.Comment;
import com.hidorikun.tasker.repository.CommentRepository;
import com.hidorikun.tasker.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private UserService userService;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private TaskService taskService;

    public static CommentDTO commentToDTO(Comment comment) {

        if (comment == null) {
            return null;
        }

        return CommentDTO.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .owner(UserService.userToDTO(comment.getOwner()))
                .taskId(comment.getTask().getId())
                .createdOn(comment.getCreatedOn())
                .build();
    }

    @Transactional(readOnly = true)
    public List<Comment> getCommentsForTask(Long taskId) {
        return this.commentRepository.getCommentsForTask(taskId);
    }

    @Transactional
    public Comment addComment(Comment comment) {
        comment.setOwner(userService.getCurrentUser());
        comment.setCreatedOn(DateUtil.now());

        return this.commentRepository.save(comment);
    }

    public Comment dtoToComment(CommentDTO dto) {

        if (dto == null) {
            return null;
        }

        return Comment.builder()
                .content(dto.getContent())
                .task(taskService.getTask(dto.getTaskId()))
                .build();
    }

}
