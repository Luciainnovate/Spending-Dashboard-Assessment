# Spending-Dashboard-Assessment

A responsive financial analytics dashboard to display a customer’s spending data.

---

## Technologies Used & Versions

| Technology      | Version        |
|-----------------|----------------|
| Angular         | 19.x           |
| TypeScript      | 5.x            |
| Node.js         | 20.x           |
| npm             | 10.x           |
| Angular CLI     | 19.x           |
| HTML / SCSS / JS| N/A            |

---

## Getting Started

### Prerequisites

Before you begin, make sure you have installed:

- **Node.js 20+** ([https://nodejs.org](https://nodejs.org))  
- **npm** (comes with Node.js)  
- **Angular CLI 19+** ([https://angular.io/cli](https://angular.io/cli))  
- **Docker**

Install Angular CLI globally if you don’t have it:

```bash
npm install -g @angular/cli
VS Code or your preferred IDE

Build and Run Locally
Clone the repository:
-----------------------------------------------------------------------------
git clone https://github.com/Luciainnovate/Spending-Dashboard-Assessment.git
cd Spending-Dashboard-Assessment

Install dependencies:
--------------------------------
npm install --legacy-peer-deps

Serve the app using Angular CLI:
--------------------------------
ng serve
Open your browser at:http://localhost:4200

Build for Production
--------------------------------------
ng build --configuration production
The production output will be in:
dist/spending-dashboard/browser


Run with Docker
Stop & remove any old container (if exists):

docker stop spending-dashboard-container
docker rm spending-dashboard-container
Build Docker image:

docker build -t spending-dashboard .
Run container:

docker run -d -p 4200:80 --name spending-dashboard-container spending-dashboard
Open your browser at:

http://localhost:4200
Your Angular app should now be served through Docker + Nginx.

Dockerfile Notes
Copies Angular production build from dist/spending-dashboard/browser

Removes default Nginx page

Fixes permissions for Nginx to serve files

Author
Lucia Mokgalaka