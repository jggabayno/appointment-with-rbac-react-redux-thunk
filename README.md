# Appointment Management System with RBAC (React, Redux-Thunk)

## Overview

This app is a React-based appointment management system that integrates Redux and Redux Thunk for state management and async actions. It includes Role-Based Access Control (RBAC) to ensure secure access to different features. The system supports functionalities such as:

- Access Control
- Appointment Scheduling
- Authentication
- Password Management
- Employee Management
- Role-Based Access
- Working Hours Configuration
- FullCalendar Integration

## Full Calendar Integration

The system integrates FullCalendar to provide an interactive and dynamic scheduling experience. Users can:

- View appointments in a calendar format.

- Manage and configure working hours.

- Drag and drop events to reschedule appointments.

- Customize calendar settings based on user roles.

- This integration ensures a seamless scheduling experience with a modern UI and flexible configuration options.

The project utilizes Redux and Redux Thunk for state management. It also integrates Ant Design (antd), node-sass, Less, and customize-cra.

## Getting Started

### Requirements

- Node.js 12.x to 14.x 
- npm

### Setup

1. Clone the repository.
2. Install dependencies:

   ```sh
   npm install
   ```

3. Request the `.env` file from authorized personnel.

## Running the Application

### Development Mode

To start the development server:

```sh
npm run dev
```

After running, access the application at:

```sh
http://localhost:3000/
```

### Production Mode

To build and start the production server:

```sh
npm run build
npm run start
```
