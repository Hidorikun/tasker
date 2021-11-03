package com.hidorikun.tasker.service;

import com.hidorikun.tasker.model.dto.CommentDTO;
import com.hidorikun.tasker.model.dto.UserDTO;
import com.hidorikun.tasker.model.entity.Comment;
import com.hidorikun.tasker.model.entity.User;
import com.hidorikun.tasker.repository.CommentRepository;
import com.hidorikun.tasker.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.zip.DataFormatException;

@Service
public class CommentService {

    @Autowired
    private UserService userService;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private TaskService taskService;

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

    public static CommentDTO commentToDTO(Comment comment) throws DataFormatException, IOException {

        if (comment == null) {
            return null;
        }

        CommentDTO result = new CommentDTO();

        result.setId(comment.getId());
        result.setContent(comment.getContent());
        result.setOwner(UserService.userToDTO(comment.getOwner()));
        result.setTaskId(comment.getTask().getId());
        result.setCreatedOn(comment.getCreatedOn());

        return result;
    }


    public Comment dtoToComment(CommentDTO dto) {

        if (dto == null) {
            return null;
        }

        Comment result = new Comment();

        result.setContent(dto.getContent());
        result.setTask(taskService.getTask(dto.getTaskId()));

        return result;
    }

}
