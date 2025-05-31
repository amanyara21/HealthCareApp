# HealthCare Project

This is a comprehensive HealthCare management system consisting of three repositories:

- **[HealthCareApp](https://github.com/amanyara21/HealthCareApp)** — React Native mobile application  
- **[HealthCareBackend](https://github.com/amanyara21/HealthCareBackend)** — Spring Boot monolithic backend  
- **[HealthCareMicroservices](https://github.com/amanyara21/HealthCareMicroServices)** — Spring Boot microservices backend  

---

## Project Overview

The HealthCare system provides a seamless experience for patients, doctors, and admins to manage appointments, prescriptions, medical tests, and health data all in one platform.

### User Roles and Features

#### 1. User
- Browse and view all registered doctors  
- Book appointments online or offline with doctors  
- Online appointments powered by **WebRTC** for real-time video consultations  
- View appointment details, prescriptions, test reports, and medicines directly in the app  
- Access integrated health data such as Step Count, Heart Rate, Sleep Data, etc.  

#### 2. Doctor
- View all upcoming and past appointments  
- Add test reports and medicines data for users  
- Mark unavailable dates to prevent appointment booking on those days  

#### 3. Admin
- Add and manage doctor profiles  
- Manage body parts (for categorizing medical reports/tests)  

---

## Repository Details

### 1. [HealthCareApp](https://github.com/amanyara21/HealthCareApp)
- Built using **React Native**  
- Cross-platform mobile app for patients, doctors, and admins  
- Integrates with device health sensors/APIs to show real-time health data  
- Supports online appointments via **WebRTC** video calls  

### 2. [HealthCareBackend (Monolithic)](https://github.com/amanyara21/HealthCareBackend)
- **Spring Boot Monolithic** backend application  
- Handles core business logic for user management, appointments, prescriptions, etc.  
- Built with **Gradle** build tool  
- Simple to run and deploy for smaller teams or setups  


### 3. [HealthCareMicroservices](https://github.com/amanyara21/HealthCareMicroServices)
- Spring Boot-based **Microservices architecture**  
- Designed for scalability and modular development  
- Microservices handle discrete functionalities like appointment scheduling, report management, user authentication, etc.  
- Built with **Gradle** build tool  
- Uses **Spring Cloud**, **Eureka**, **API Gateway**, and JWT for distributed architecture

---

## Getting Started

### Prerequisites
- **Node.js** and **npm** (for React Native app)  
- **Java 17+** and **Gradle** (for Spring Boot projects)  
- **Android/iOS** environment setup for running the React Native app  
- **MySQL** database configured and running  

---

## 💡 Contribution

Feel free to fork the repos, raise issues or submit pull requests.  
Let's improve digital healthcare experiences together! 
```