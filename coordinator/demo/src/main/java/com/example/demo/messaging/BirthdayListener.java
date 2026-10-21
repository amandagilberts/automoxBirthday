package com.example.demo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import com.example.demo.BirthdayMessage;
import com.example.demo.Birthday;
import com.example.demo.repository.BirthdayRepository;

@Component
public class BirthdayListener {
    private final BirthdayRepository repository;
    private static final Logger log = LoggerFactory.getLogger(BirthdayListener.class);
    public BirthdayListener(BirthdayRepository repository) {
        this.repository = repository;
    }

    @RabbitListener(queues = "${app.queue-name}")
      public void handle(BirthdayMessage message) {
        if (repository.existsById(message.id())) {
            log.info("Duplicate message skipped, id={}", message.id());
            return;
        }
        repository.save(new Birthday(message.id(), message.name(), message.birthday()));
        log.info("Saved birthday id={} name={}", message.id(), message.name());
    }
}