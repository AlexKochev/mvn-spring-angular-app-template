# Dev stage
FROM maven:3.9-eclipse-temurin:21 AS dev
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn dependency:go-offline
EXPOSE 8080
CMD ["mvn", "spring-boot:run"]

# Optional prod stage (e.g., for deployment)
FROM openjdk:17-jdk-slim AS prod
WORKDIR /app
COPY target/your-backend-app.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]