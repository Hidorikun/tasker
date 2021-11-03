package com.hidorikun.tasker.repository;

import com.hidorikun.tasker.model.entity.Comment;
import com.hidorikun.tasker.model.entity.Project;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends CrudRepository<Comment, Long> {

    @Query("SELECT c FROM Comment AS c INNER JOIN c.task AS t WHERE t.id = :taskId ORDER BY c.createdOn ASC")
    List<Comment> getCommentsForTask(@Param("taskId") Long taskId);

}
