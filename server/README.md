# Todo API Assignment (Backend)

This is the fully implemented backend service for the Shopping List application, built with **NestJS**. It is designed as a secure API that handles input data validation (**dtoIn**), authorization based on **Application Profiles**, and data persistence using **MongoDB**.

## 🛠 Tech Stack

* **Framework**: NestJS (Node.js/Express-based)
* **Language**: TypeScript
* **Database**: MongoDB (via Docker)
* **ORM**: Prisma (v5)
* **Documentation**: Swagger (OpenAPI 3.0)
* **Validation**: Class-Validator & Class-Transformer

## 📂 Project Structure

The project is organized by domain, with each folder containing the Controller (**uuCmd**), Service (Database Logic), and DTO (**dtoIn**) definitions.

```text
server/src/
  ├── auth/         # Authorization Guard (RolesGuard) & Custom Decorators
  ├── list/         # uuCmds and Services for List management
  ├── item/         # uuCmds and Services for Item management
  ├── member/       # uuCmds and Services for Member management
  ├── prisma/       # Global Prisma Database Service
  ├── app.module.ts # Root Module
  └── main.ts       # Entry point (Swagger & Global Pipes)
```

## 🚀 Getting Started

### 1. Database Setup (Docker)

This application requires a MongoDB Replica Set to function with Prisma. A `docker-compose.yml` file is provided.

From the `server` directory, start the database:
```bash
docker-compose up -d
```

Initialize the replica set (Run this once after the container starts):
```bash
docker exec -it todo-mongodb mongosh --eval "rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: 'localhost:27017' }] })"
```

### 2. Installation & Configuration

Install dependencies:
```bash
pnpm install
```

Ensure your `.env` file is configured properly:
```env
DATABASE_URL="mongodb://localhost:27017/todo-api-assignment?replicaSet=rs0"
```

Generate the Prisma Client:
```bash
pnpm dlx prisma generate
```

### 3. Running the Server

Start the development server with Hot Module Replacement (HMR):
```bash
pnpm run start:dev
```
The server will start on **http://localhost:3000**.

## 📑 API Documentation (Swagger)

For this assignment, full documentation of every endpoint, including required `dtoIn` fields and response formats, is auto-generated via Swagger:

* **URL**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

## 🔐 Security & Authorization

### Application Profiles

The API implements two profiles to control access to specific endpoints:

1.  **Owner**: Full access to all commands (Manage lists, members, and items).
2.  **Member**: Limited access (Manage items only).

### Authorization Header

All endpoints are protected by the `RolesGuard`. To simulate a user profile, you must include the following header in your requests:

* **Header**: `x-user-profile`
* **Values**: `Owner` | `Member`

## 📡 Endpoints (uuCmds)

Every endpoint is configured to validate incoming data and return the `dtoOut` along with an empty `uuAppErrorMap` on success.

| Category | Endpoint | Profile Required | Description |
| :--- | :--- | :--- | :--- |
| **List** | `POST /list/create` | Owner | Creates a new list |
| **List** | `POST /list/get` | Owner, Member | Retrieves a single list |
| **List** | `POST /list/list` | Owner, Member | Retrieves all lists |
| **List** | `POST /list/update` | Owner | Renames a list |
| **List** | `POST /list/delete` | Owner | Deletes a list (Cascades) |
| **List** | `POST /list/archive` | Owner | Archives a list |
| **Item** | `POST /item/create` | Owner, Member | Adds an item |
| **Item** | `POST /item/update` | Owner, Member | Toggles item status |
| **Item** | `POST /item/delete` | Owner, Member | Removes an item |
| **Member** | `POST /member/add` | Owner | Invites a member |
| **Member** | `POST /member/remove` | Owner | Removes a member |
```