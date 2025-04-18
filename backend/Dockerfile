# Dev stage
FROM maven:3.9.6 AS dev
WORKDIR /app
# Copy parent POM
COPY ../pom.xml .
#COPY frontend .
# Copy backend module
COPY src/ backend/src/
COPY pom.xml backend/.
WORKDIR /app/backend
RUN mvn dependency:go-offline
EXPOSE 8080
CMD ["mvn", "spring-boot:run"]

# Optional prod stage (e.g., for deployment)
FROM openjdk:21-jdk-slim AS prod
WORKDIR /app
COPY backend/target/backend-1.0-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]