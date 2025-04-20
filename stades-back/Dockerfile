# Spring Boot Dockerfile
FROM openjdk:17-jdk-slim

VOLUME /tmp
COPY ./stades-back/target/springFootball-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java","-jar","/app.jar"]
