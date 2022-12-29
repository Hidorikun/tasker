FROM maven:3.8.2-jdk-8

EXPOSE 4040

WORKDIR /tasker-app
COPY . .
RUN mvn clean install

CMD mvn spring-boot:run -Dspring-boot.run.profiles=dev
