# Rock Paper Scissors

A full-stack Rock Paper Scissors web application built with a Java backend and a React frontend. The project demonstrates the integration of a RESTful API with a responsive user interface.

## Tech Stack

### Backend

The backend is built with **Spring Boot** and uses **Gradle** as the build tool. It provides the game logic through one REST endpoint and is responsible for:

- Processing game requests
- Generating random computer moves
- Determining the winner of each round
- Returning game results as JSON

**Technologies**

- Java
- Spring Boot
- Spring Web
- Gradle

### Frontend

The frontend is developed with **TypeScript** and styled using **Tailwind CSS**. It communicates with the backend via HTTP requests.

**Technologies**

- React
- TypeScript
- Tailwind CSS
- HTML
- Vite


## Features

- RESTful API built with Spring Boot
- Interactive frontend built with TypeScript
- Responsive UI using Tailwind CSS
- Random computer move generation
- Automatic winner calculation

## Getting Started

### Backend

```bash
cd backend
./gradlew bootRun
```

The backend will start on the configured Spring Boot server.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available on the Vite development server.

## Author

Marvin Tran

## License

This project is licensed under the MIT License.

