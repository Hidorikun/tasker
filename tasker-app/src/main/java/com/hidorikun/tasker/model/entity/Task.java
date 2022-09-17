package com.hidorikun.tasker.model.entity;

import com.hidorikun.tasker.model.enums.TaskState;
import com.hidorikun.tasker.model.enums.TaskType;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Size(max = 255)
    private String summary;

    @Column(columnDefinition="TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    private Sprint sprint;

    @ManyToOne(fetch = FetchType.LAZY)
    private User reporter;

    @ManyToOne(fetch = FetchType.LAZY)
    private User assignee;

    @NotNull
    @Enumerated(EnumType.STRING)
    private TaskState state;

    private Long position;

    @NotNull
    @Enumerated(EnumType.STRING)
    private TaskType type;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdOn;

    @Temporal(TemporalType.TIMESTAMP)
    private Date closedOn;

    private Long estimation;

    @OneToMany(
            mappedBy = "task",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Comment> comments;

    public Task() {
        this.state = TaskState.OPEN;
        this.comments = new HashSet<>();
    }

}
