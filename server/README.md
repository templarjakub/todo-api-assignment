# Todo API Assignment (Backend)

This is the backend service for the Shopping List application, built with **NestJS**. It is designed as a secure API skeleton that handles input data validation (**dtoIn**) and authorization based on **Application Profiles**.

## 🛠 Tech Stack

* **Framework**: NestJS (Node.js/Express-based).
* **Language**: TypeScript.
* **Documentation**: Swagger (OpenAPI 3.0).
* **Validation**: Class-Validator & Class-Transformer.
* **Database**: Prisma ORM (Initialized for future persistence).

## 📂 Project Structure

The project is organized by domain, with each folder containing the **uuCmd** (Controller) and the **dtoIn** definitions (DTO).

```text
server/src/
  ├── auth/         # Authorization Guard (RolesGuard)
  ├── list/         # uuCmds for List management
  ├── item/         # uuCmds for Item management
  ├── member/       # uuCmds for Member management
  ├── app.module.ts # Root Module
  └── main.ts       # Entry point (Swagger & Global Pipes)
```

## 🚀 Getting Started

### Installation

From the `server` directory, install dependencies:

```bash
pnpm install
```

### Running the Server

Start the development server with Hot Module Replacement (HMR):

```bash
pnpm run start:dev
```

The server will start on **http://localhost:3000**.

## 📑 API Documentation (Swagger)

For this assignment, full documentation of every endpoint, including required `dtoIn` fields and response formats, is auto-generated via Swagger:

* **URL**: [http://localhost:3000/api/docs](https://www.google.com/search?q=http://localhost:3000/api/docs)

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

Every endpoint is configured to validate incoming data and return the `dtoIn` along with a `uuAppErrorMap`.

| Category | Endpoint | Profile Required |
| :--- | :--- | :--- |
| **List** | `POST /list/update` | Owner |
| **List** | `POST /list/archive` | Owner |
| **Item** | `POST /item/create` | Owner, Member |
| **Item** | `POST /item/update` | Owner, Member |
| **Item** | `POST /item/delete` | Owner, Member |
| **Member** | `POST /member/add` | Owner |
| **Member** | `POST /member/remove` | Owner |