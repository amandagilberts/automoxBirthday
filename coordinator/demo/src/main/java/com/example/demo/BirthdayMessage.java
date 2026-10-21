package com.example.demo;

import java.time.LocalDate;
import java.util.UUID;
public record BirthdayMessage(UUID id, String name, LocalDate birthday) {}