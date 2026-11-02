package com.kochev.application;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.lang.reflect.Method;
import org.junit.jupiter.api.Test;

// Spring resolves @RequestParam/@PathVariable names from compiled parameter names.
// This template does not inherit spring-boot-starter-parent, so javac needs
// -parameters (maven.compiler.parameters) set explicitly; this guards against losing it.
class CompilerParametersTest {

    @SuppressWarnings("unused")
    static class Sample {
        void method(String name) {
        }
    }

    @Test
    void parameterNamesAreRetained() throws Exception {
        Method method = Sample.class.getDeclaredMethod("method", String.class);
        assertTrue(method.getParameters()[0].isNamePresent(),
                "javac must be run with -parameters (maven.compiler.parameters=true)");
    }

}
