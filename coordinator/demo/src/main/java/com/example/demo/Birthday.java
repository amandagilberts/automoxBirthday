package com.example.demo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.LocalDate;
import java.util.UUID;

@Entity
public class Birthday {
    @Id
    private UUID id;   // assigned by the API, so no @GeneratedValue

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDate birthday;

    protected Birthday() {}   // required by JPA

    public Birthday(UUID id, String name, LocalDate birthday) {
        this.id = id;
        this.name = name;
        this.birthday = birthday;
    }

    public UUID getId() { return id; }
    public String getName() { return name; }
    public LocalDate getBirthday() { return birthday; }
}