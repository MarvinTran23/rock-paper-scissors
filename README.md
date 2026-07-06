# Rock Paper Scissors

A full-stack Rock Paper Scissors web application built with a Java Spring Boot backend and a React frontend.  
The project demonstrates a RESTful API architecture with a frontend UI and Docker-based PostgreSQL integration.

## Demo

[rps_game_demo.mp4](https://github.com/user-attachments/assets/68efa3f6-dca1-489b-8cd0-f0f891ae38bc)

---

## Tech Stack

### Backend

The backend is built with **Spring Boot** and uses **Gradle** as the build tool.  
It provides the game logic through a REST API and handles:

- Processing game requests
- Generating random computer moves
- Determining the winner
- Returning results as JSON
- Persisting data in PostgreSQL

**Technologies:**

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- PostgreSQL
- Gradle

---

### Frontend

The frontend is built with **React + TypeScript** and styled using **Tailwind CSS**.  
It communicates with the backend via HTTP requests.

**Technologies:**

- React
- TypeScript
- Tailwind CSS
- Vite
- HTML

---

## Database & Docker Setup

This project uses PostgreSQL running in Docker.

### Start the database

```bash
docker-compose up -d
