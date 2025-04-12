FROM eclipse-temurin:21-jdk-alpine as builder
WORKDIR /opt/app


COPY application/.mvn .mvn
COPY application/mvnw pom.xml ./
RUN ./mvnw dependency:go-offline
COPY application/src ./src
RUN ./mvnw clean install

FROM eclipse-temurin:21-jre-alpine
WORKDIR /opt/app
EXPOSE 8080
COPY --from=builder /opt/app/target/*.jar /opt/app/*.jar
ENTRYPOINT ["java", "-jar", "/opt/app/*.jar" ]