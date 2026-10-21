package com.example.demo;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.JacksonJsonMessageConverter;

import tools.jackson.databind.json.JsonMapper;




@Configuration
public class RabbitConfig {

    @Bean
    Queue birthdayQueue(@Value("${app.queue-name}") String name) {
        return new Queue(name, true);   // durable, to match the Node API
    }

    @Bean
    MessageConverter jsonMessageConverter(JsonMapper mapper) {
        return new JacksonJsonMessageConverter(mapper);
    }
}