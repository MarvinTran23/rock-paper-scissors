# Build stage
FROM eclipse-temurin:26-jdk AS build
WORKDIR /app
COPY . .
RUN ./gradlew clean build -x test

# Run stage
FROM eclipse-temurin:26-jre
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "app.jar" ]