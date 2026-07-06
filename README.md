# Freelance Clients And Payments Tracker (FCPT)




**Freelance CLients And Payments Tracker** is a powerful, self-hosted web application designed for freelancers to effortlessly track their active projects, manage client details, and monitor payments. Say goodbye to messy spreadsheets and generate invoices with just a click.


[ Live Demo Link] | [ Bug Report] | [ Feature Request]
[Coming Soon]


---


##  Key Features
- **Role-Based Access Control (RBAC):** Distinct functionalities for Admins and CLients using a custom `Users` model with Spring Security.
- **Project Management:** Track ongoing gigs, deadlines, and project statuses (Not Started, Pending, Completed).
- **Payment & Milestone:** Monitor pending, completed, and overdue payments with automated color coding, add milestone for payments.
- **Client CRM:** Keep all client contact information and project history in one centralized hub.
- **Dockerized Setup:** Spin up the entire environment locally with a single command with docker-compose file(coming soon).
- **Spring Boot Microservice:** To keep the extremely effecient and scalable in production environment, used for invoice pdf generation. 

---

##  Tech Stack


**Frontend:**
- [TypeScript] - As Frontend programming language.
- [React] - For Frontend library.
- [Bootstrap-CSS-framework] - Basic Component-based UI.


**Backend:**
- [Spring-Boot] - Robust REST API handling business logic with Java Spring Boot for both Microservice based invoice generation and core app.
- [Spring-Security] - For secure  role based access controll and authentication.
- [JWT] - for as secutiry provider for stateless authentication.


**Database & DevOps:**
- [PostgreSQL] - Relational data storage for clients,payments,project details, milestone.
- [MongoDB] - NoSQL data base storage to store Unstructured communication logs of client and freelancer.
- [Docker] - Containerization for seamless deployment.
- [Redis] - Redis for cache with Cache-Aside method.
- [Kubernetes] - For Orchestration so for better Scalability (tested  only in local enviornment).
- [Git/Github] - For version control.
- [Github-Actions] - For Automation of test,build and docker image build usign Pipelines .
- [Render] - for deployment.


---


##  Screenshots (Coming soon)


| Dashboard Overview | Client Side Dashboard | 
| :---: | :---: |
| ![Dashboard](./screenshots/) | ![Client Side](./screenshots/) |
| **Client List** | **Client Project List** |
| ![Client List](./screenshots/) | ![Project List](./screenshots/) |
| **Project Details** | **Generated Invoice (Spring Boot)** |
| ![Project Details](./screenshots/) | ![Invoice Screenshot](./screenshots/) |
 **PowerBi Dadhboard** |**Kubernetes Terminal** |
![Dashboard Screenshot](./screenshots/) |  ![Kubernetes Terminal Screenshot](./screenshots/) |


---


##  Installation & Setup


Follow these steps to get the project running locally on your machine.


### Prerequisites

- Docker & Docker Compose (Recommended)
- Kubernetes or Minikube or Kubernetes in Docker Desktop (KIND) (Optional)
- TypeScript
- React
- JDK 21 + 
- Bootstrap CSS framework
- Postgresql 18 + version
- MongoDB
- Redis
- Maven build tool
- Spring Boot

### Installation using docker-compose

- Make a .env file and store all the required Parameters and Variables in side that file (Important).
- Using Docker Compose inside the FCPT where docker-compose.yml file is present [ docker-compose build FCPT:V1 ].

### Installation using Maven for Java Spring Boot and  Node.js NPM for React with JavaScript 

```bash
- Ensure both JDK 17+ and Node.js LTS are installed, along with an IDE like IntelliJ IDEA or VS Code.
- Navigate to the Spring Boot backend directory and ensure all Maven dependencies are resolved.
- Configure a .env file or application.properties in the backend to manage database credentials and environment-specific secrets.
- Start the Spring Boot backend using the command [ mvn spring-boot:run ]
- Navigate to the React frontend directory in a separate terminal window.
- Install all necessary node modules using the command [ npm install ]
- Create a .env file in the frontend root to define environment variables (e.g., API_URL for backend communication).
- Start the React development server using the command [ npm run dev ]
```

##  API Documentation


* **Spring Boot core app API Docs:** `http://localhost:8080/api/docs`(coming soon)


* **Spring Boot Invoice Service API Docs:** `http://localhost:8080/api/docs`(coming soon)


* **React with TypeScript frontend API Docs:** `http://localhost:8000/api/docs/`(coming soon)



##  System Architecture (Coming soon)


### 1. Clone the Repository


```bash
git clone [https://github.com/zicots7/FCPT.git](https://github.com/zicots7/FCPT.git)
cd FCPT
```
