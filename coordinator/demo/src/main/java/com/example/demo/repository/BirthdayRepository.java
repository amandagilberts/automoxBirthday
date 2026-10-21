package com.example.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import com.example.demo.Birthday;
import com.example.demo.BirthdayMessage;
import com.example.messaging.BirthdayListener;
public interface BirthdayRepository extends JpaRepository<Birthday, UUID> {}