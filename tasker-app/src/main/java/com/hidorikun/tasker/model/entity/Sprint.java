package com.hidorikun.tasker.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
public class Sprint {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Size(max = 30)
    private String name;

    private Long number;

    @ManyToOne(fetch = FetchType.LAZY)
    private Team team;

    @OneToMany(
            mappedBy = "sprint",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Task> tasks;

    private boolean active = false;

    private boolean archived = false;

    public Sprint() {
        this.tasks = new HashSet<>();
    }

}
