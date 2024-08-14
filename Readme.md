# Serverless Database Platform

This repository contains the source code for a platform that deploys database servers on a Kubernetes cluster using KubeAPI. The platform provides users with a serverless database architecture, allowing them to deploy and manage databases without worrying about the underlying infrastructure.

## Project Structure

The repository is divided into two main folders:

### 1. `frontend-server`

This folder contains the frontend code, built using modern web technologies. The frontend is responsible for providing users with an intuitive interface to interact with the platform.

- **Technology Stack**: Next.js, React, TypeScript
- **Features**:
  - User authentication and authorization
  - Interface for deploying and managing databases
  - Real-time status updates on database deployments

### 2. `webserver-node`

This folder contains the backend code, built using Node.js and Express.js. The backend handles API requests from the frontend and interacts with the Kubernetes cluster to manage database deployments.

- **Technology Stack**: Node.js, Express.js, KubeAPI
- **Features**:
  - API endpoints for database deployment, scaling, and management
  - Integration with Kubernetes for seamless deployment
  - Secure communication between frontend and backend

## How It Works

1. **User Interface**: Users interact with the platform via the frontend application, where they can deploy, manage, and monitor their databases.
   
2. **API Requests**: The frontend sends API requests to the backend server, which processes these requests and interacts with the Kubernetes cluster using KubeAPI.
   
3. **Kubernetes Cluster**: The backend server communicates with the Kubernetes cluster to deploy and manage the database servers, providing a serverless experience to the users.

## Setup and Installation

To set up the project locally, follow these steps:

### Prerequisites

- Node.js and npm
- Docker (for running Kubernetes locally, if needed)
- Kubernetes cluster

### Frontend Setup

1. Navigate to the `frontend-server` folder:
   ```bash
   cd frontend-server
2. Install dependencies:
   ```bash
   npm install
3. Run the development server:
   ```bash
   npm run dev

### Backend Setup

1. Navigate to the webserver-node folder:
   ```bash
    cd webserver-node
2. Install dependencies:
   ```bash
    npm install
3. Start the server:
   ```bash
   npm run dev


