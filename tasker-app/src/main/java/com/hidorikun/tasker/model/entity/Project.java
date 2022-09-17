package com.hidorikun.tasker.model.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Size(max = 40)
    @Column(unique = true)
    private String name;

    @Size(max = 100)
    private String shortDescription;

    @OneToMany(
            mappedBy = "project",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Team> teams;

    @ManyToMany()
    @JoinTable(
            name = "project_admin",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> admins;

    public Project() {
        this.teams = new HashSet<>();
        this.admins = new HashSet<>();
    }
}
