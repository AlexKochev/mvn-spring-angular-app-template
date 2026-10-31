# Build stage: JDK 25 + Maven + Node 24 (the Maven build runs `npm ci` and `ng build`)
FROM maven:3-eclipse-temurin-25 AS build
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app

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
