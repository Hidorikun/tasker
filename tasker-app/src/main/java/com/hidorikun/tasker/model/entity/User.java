package com.hidorikun.tasker.model.entity;


import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Builder
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Size(max = 40)
    @Column(unique = true)
    private String username;

    @NotBlank
    @Size(max = 40)
    private String firstName;

    @NotBlank
    @Size(max = 20)
    private String lastName;

    @NotBlank
    @Email
    @Column(unique = true)
    private String email;

    @Column(columnDefinition="MEDIUMBLOB")
    private byte[] image;

    @NotBlank
    private String password;

    @Builder.Default
    @ManyToMany(mappedBy = "members")
    private Set<Team> teams = new HashSet<>();

    @ManyToMany(mappedBy = "admins")
    private Set<Project> projects;

    @Builder.Default
    @OneToMany(
            mappedBy = "reporter",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Task> reportedTasks = new HashSet<>();

    @Builder.Default
    @OneToMany(
            mappedBy = "assignee",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Task> assignedTasks = new HashSet<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}

