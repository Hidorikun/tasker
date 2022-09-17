package com.hidorikun.tasker.model.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Size(max = 40)
    @Column(unique = true)
    private String name;

    @Size(max = 100)
    private String shortDescription;

    @ManyToMany()
    @JoinTable(
            name = "team_user",
            joinColumns = @JoinColumn(name = "team_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> members;


    @ManyToOne(fetch = FetchType.LAZY)
    private Project project;

    @OneToMany(
            mappedBy = "team",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Sprint> sprints;

    public Team() {
        this.members = new HashSet<>();
        this.sprints = new HashSet<>();
    }

    public Team(String name, String shortDescription) {
        this();
        this.name = name;
        this.shortDescription = shortDescription;
    }

}
