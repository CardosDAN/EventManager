# Folosește o imagine de bază Java
FROM openjdk:17

# Copiază JAR-ul aplicației
COPY target/api-0.0.1-SNAPSHOT.jar /app.jar

# Comanda pentru a porni aplicația Spring Boot
CMD ["java", "-jar", "/app.jar"]