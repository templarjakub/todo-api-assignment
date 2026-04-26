# 🛒 Shopping List Application

Welcome to the Shopping List Application monorepo! This project is a complete full-stack solution for managing collaborative shopping lists, built with modern web technologies.

## 🏗️ Project Architecture

This repository is structured as a monorepo containing two isolated projects:

* **[`/client`](./client/README.md)**: The frontend user interface, built with **React** and **Vite**.
* **[`/server`](./server/README.md)**: The backend API service, built with **NestJS** and **MongoDB**.

## 🛠️ Global Tech Stack

**Frontend:**
* React 18
* TypeScript
* Vite
* Zustand (State Management)

**Backend:**
* NestJS
* TypeScript
* Prisma ORM (v5)
* MongoDB

**Infrastructure:**
* Docker & Docker Compose (Database hosting)
* pnpm (Package Manager)

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [pnpm](https://pnpm.io/installation) (Enable via `corepack enable pnpm` or install per official docs)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Required for running the local MongoDB replica set)

## 🚀 Quick Navigation

Because this is a monorepo, the application logic is split into respective directories. **Please refer to the individual documentation files below for specific instructions on how to install dependencies, configure environments, and run the applications:**

👉 **[Frontend Documentation & Setup ➔](./client/README.md)** 👉 **[Backend API & Database Setup ➔](./server/README.md)** ---
*Developed for the Todo API Assignment.*