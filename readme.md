# Space Services API

Welcome to the Space Services API repository. This project consists of multiple microservices, all orchestrated together using Docker and `docker-compose`. The main services include: `user-service`, `booking-service`, `ship-service`, and `planet-service`.

## Architecture

The services in this project follow a microservices architectural pattern. Here's a brief description of each:

- **user-service**: Manages user-related functionalities.
- **booking-service**: Manages booking functionalities and integrates with `user-service` via RabbitMQ for some operations.
- **ship-service**: Manages ship-related operations.
- **planet-service**: Manages CRUD operations for planets.

Communication between services is facilitated through APIs and RabbitMQ for specific operations. The NGINX server acts as a reverse proxy, directing API calls to the appropriate service.

## Prerequisites

- **Docker & Docker Compose**: Ensure Docker and Docker Compose are installed on your system. You can download them [here](https://www.docker.com/products/docker-desktop).

## Running the project locally

1. **Clone the repository**:
    ```bash
    git clone [Your Repository URL]
    cd [Your Repository Directory]
    ```

2. **Set up environment variables**:
    Make sure you have a `.env` file at the root of your project with all the necessary environment variables. (Refer to `.env.example` for the structure).

3. **Run with Docker Compose**:
    From the root directory of the project, run the following command:
    ```bash
    docker-compose up --build
    ```

    This command builds the Docker images for the services, creates the necessary containers, and starts the services. You should see logs from each service as they start up.

4. **Access the services**:
    The services are now accessible via `http://localhost:8080/`. The paths would be like `/user/`, `/bookings/`, `/ship/`, and `/planet/` respectively.

5. **Stopping the services**:
    To gracefully stop the services, in your terminal, press `CTRL+C` or run:
    ```bash
    docker-compose down
    ```

## Architecture Overview

- **Microservices**: The application is split into small microservices, each responsible for a distinct feature of the application. This separation ensures easier scalability and maintainability.
  
- **Docker & Docker Compose**: Docker containers ensure that the application runs consistently across different environments. Docker Compose simplifies the task of defining and running multi-container Docker applications.

- **NGINX**: Acts as a reverse proxy to route the requests to the appropriate microservices.

- **RabbitMQ**: This is used for asynchronous messaging between `booking-service` and `user-service`. 

## Contributing

To contribute to this repository, please create a fork and submit a pull request.

## License

[Your License Details Here, e.g., MIT]
