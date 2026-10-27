# Build stage: JDK 25 + Maven + Node 24 + Angular CLI (the Maven build runs `ng build`)
FROM maven:3-eclipse-temurin-25 AS build
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && npm install -g @angular/cli@22 \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# Install frontend dependencies first so this layer is cached until package files change
COPY frontend/package.json frontend/package-lock.json frontend/
RUN cd frontend && npm ci

COPY pom.xml .
COPY backend backend
COPY frontend frontend
RUN mvn -B clean package

# Runtime stage
FROM eclipse-temurin:25-jre
WORKDIR /app
RUN useradd --system --no-create-home app
COPY --from=build /app/backend/target/backend-1.0-SNAPSHOT.jar app.jar
USER app
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
