package com.example.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import com.example.demo.Birthday;
public interface BirthdayRepository extends JpaRepository<Birthday, UUID> {}