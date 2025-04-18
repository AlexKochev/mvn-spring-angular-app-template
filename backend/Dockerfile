# Dev stage
FROM maven:3.9.6 AS dev
WORKDIR /mvn-spring-angular-app
# Copy parent POM
COPY pom.xml .
COPY frontend .
# Copy backend module
COPY backend/src ./backend
COPY backend/pom.xml ./backend/.
WORKDIR /mvn-spring-angular-app/backend
RUN mvn clean install -U
RUN mvn dependency:go-offline
EXPOSE 8080
CMD ["mvn", "spring-boot:run"]

# Optional prod stage (e.g., for deployment)
FROM openjdk:21-jdk-slim AS prod
WORKDIR /app
COPY backend/target/backend-1.0-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]