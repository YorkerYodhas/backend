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

## 
##


# Frontend


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

