[Dockerfile Documentation](https://docs.docker.com/engine/reference/builder/)
[Docker Compose Documentation](https://docs.docker.com/compose/compose-file)

Build containers before starting them. 
``` sh
docker-compose up --build
```

Get into a running container.
``` sh
docker exec -it tasker-web /bin/bash
```

Run it from docker engine.
``` sh
docker run -it -p 4200:4200 test-front
```