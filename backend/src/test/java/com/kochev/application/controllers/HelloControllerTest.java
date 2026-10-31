package com.kochev.application.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

class HelloControllerTest {

    private final MockMvc mockMvc = MockMvcBuilders.standaloneSetup(new HelloController()).build();

    @Test
    void helloReturnsMessageAndVersions() throws Exception {
        mockMvc.perform(get("/api/hello"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Hello from Spring Boot!"))
                .andExpect(jsonPath("$.javaVersion").isNotEmpty())
                .andExpect(jsonPath("$.springBootVersion").isNotEmpty())
                .andExpect(jsonPath("$.timestamp").isNotEmpty());
    }
}
