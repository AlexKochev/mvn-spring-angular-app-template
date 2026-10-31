package com.kochev.application.controllers;

import java.time.Instant;

import org.springframework.boot.SpringBootVersion;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HelloController {

    public record Hello(String message, String javaVersion, String springBootVersion, Instant timestamp) { }

    /** Try it with: curl localhost:8080/api/hello */
    @GetMapping("/hello")
    public Hello hello() {
        return new Hello(
                "Hello from Spring Boot!",
                Runtime.version().toString(),
                SpringBootVersion.getVersion(),
                Instant.now());
    }
}
