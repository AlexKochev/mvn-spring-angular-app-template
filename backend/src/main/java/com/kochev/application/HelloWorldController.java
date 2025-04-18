package com.kochev.application;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    public record Message(String message) {}

    public ResponseEntity<Message> greetings() {
        return ResponseEntity.ok(new Message("Hello World!"));
    }
}
