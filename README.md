# React-NestJs-Webapp
Web application that reads from a database and creates a graph on the UI, You can filter the data based on Serial Number and Device ID.
## Setup

**Frameworks**
- Frontend
  - React/Typescript
  - ApolloClient
  - ChartJs
- Backend
  - NestJs
  - Graphql
  - Typeorm

**Notes**
Need to run the frontend and backend server for web application to run.

**Important**
Create a .env file in the root of */backend* folder, file should look like. 
If deploying on service, make sure these enviroment variables are put in.
```
HOST='hostname'
PORT=port number
USER="username"
PASSWORD='password'
DATABASE='db name'
```

## Running the app
Step 1: Running the Frontend Server
```
cd frontend

#Install Packages

npm install

# Development
npm start

# Production
npm run build
```

Step 2: Running the Backend Server
```
cd backend

#Install Packages

npm install

# Development
npm run start

# Production
npm run start:prod
```
Step 3: Web Application will open at:
```
http://localhost:3000/
```