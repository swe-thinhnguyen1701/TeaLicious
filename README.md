# TeaLicious

## Description
Welcome to our "TeaLicious" eCommerce Shop!

Our application offers users the ability to browse and purchase a wide variety of teas with ease. Whether you're a casual guest or a registered member, you'll enjoy a seamless and interactive shopping experience powered by modern web technologies.

Explore our variety of teas, from classic blends to exotic flavors, all in a beautifully designed interface.

### Key Features

* **Two Types of Customers:** We support both guest users, who can browse and make purchases without creating an account, and member users, who can create an account to track orders, receive special discounts, and enjoy a personalized shopping experience.
* **Dynamic Pages:** Our shop is fully dynamic, ensuring fast load times and personalized content based on user actions and preferences.
* **Stripe Integration for Checkout:** We've integrated Stripe for secure and efficient payment processing, allowing customers to complete transactions effortlessly.
* **AWS S3 for Image Storage:** To improve performance and reduce local storage dependency, product images are stored in AWS S3, which enhances load times and ensures scalability.
* **Responsive Design:** The application is fully responsive, providing an optimized experience across all devices, from desktops to smartphones.
* **Customized CSS:** We've crafted custom CSS for a unique, polished look and feel that reflects the aesthetic of our tea shop.

## Table of Contents 
[Technologies](#technologies)</br>
[Installation](#installation)</br>
[Usage](#usage)</br>
[GraphQL API](#graphql-api)</br>
[Project Structure](#project-structure)</br>
[Contributing](#contributing)</br>

## Technologies

### Front-End
* React: A JavaScript library for building user interfaces.
* GraphQL: A query language for APIs and a server-side runtime for executing queries.
* Icon:  https://fontawesome.com/
* Images: https://www.vecteezy.com/
* Fonts: https://fonts.google.com/
* Animation: https://wpdean.com/

### Back-End
* Node.js: A JavaScript runtime built on Chrome's V8 engine.
* Express.js: A web application framework for Node.js.
* MongoDB: A NoSQL database for storing data.
* Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.
* AWS S3: Image storage
* GraphQL: Handle API routes

## Installation
Prerequisites:
* Node.js (v14 or later)
* npm for package management
* MongoDB (local installation or a cloud instance)

```
git clone git@github.com:swe-thinhnguyen1701/TeaLicious.git

```
```
cd TeaLicious

```
```
npm install

```
```
npm run develop

```
## Usage
Once both the front-end and back-end servers are running, you can access the application by navigating to http://localhost:3000 in your browser.

## GraphQL API
The application uses GraphQL for querying and mutating data. Here are some example queries and mutations:
* Get all teas: query {
  teas {
    id
    name
    description
    price
    stock
  }
}

* Get a tea by ID: query {
  tea(id: "tea-id") {
    id
    name
    description
    price
    stock
  }
}

* Mutations
Add a new tea: mutation {
  addTea(input: {
    name: "Green Tea"
    description: "A refreshing green tea."
    price: 10.00
    stock: 100
  }) {
    id
    name
    description
    price
    stock
  }
}

* Update tea stock: mutation {
  updateTea(id: "tea-id", input: { stock: 50 }) {
    id
    name
    stock
  }
}

## Project Structure
* Frontend
client/
public/
components/ - React components
graphql/ - GraphQL queries and mutations
App.js - Main React component
index.js - Entry point for the frontend app
package.json - Frontend dependencies and scripts
Backend: 
backend/
src/
models/ - Mongoose models for MongoDB collections
resolvers/ - GraphQL resolvers
schemas/ - GraphQL schemas
index.js - Entry point for the backend server
.env - Environment variables
package.json - Backend dependencies and scripts

## Collaborators

[Thinh Nguyen](https://github.com/swe-thinhnguyen1701)

[Faiza Haque](https://github.com/Faiza-Haque)

[Marissa Mello](https://github.com/marissamelo91)

[Ritu Gupta](https://github.com/goodritu1)

[Anna Krentz](https://github.com/explorer7733)

## Contributing
Feel free to contribute to this project by opening issues, submitting pull requests, or suggesting features. Please ensure your contributions adhere to the project's code style and include appropriate tests.