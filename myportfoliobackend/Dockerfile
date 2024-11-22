FROM eclipse-temurin:17-jre-alpine

# Copy jar to app directory
COPY target/*-*.jar app.jar

# Adding curl for local check
RUN apk add curl

# Starts App with created jar
ENTRYPOINT ["java", "-jar", "protfolio.jar"]

# App runs on port 7070
EXPOSE 8080