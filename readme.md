# 🎁 Wishlist App

A robust and efficient web application for creating and managing wishlists. This application is built with Node.js, Express, and Prisma, and is written in TypeScript.

## 🛠️ Built With


<div style="margin-top: 20px;">
  
# Framework [Express](https://expressjs.com/) <img src="https://expressjs.com/images/express-facebook-share.png" width="80" align="right">
  

</div>

<div style="margin-top: 80px;">

# Database [Prisma](https://www.prisma.io/) <img src="https://raw.githubusercontent.com/prisma/presskit/main/Assets/Prisma-DarkLogo.svg" width="80" align="right">
  
</div>

<div style="margin-top: 80px;">

# Language [TypeScript](https://www.typescriptlang.org/) <img src="https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg" width="80" align="right">
  

</div>

<div style="margin-top: 80px;">

# Code Style [Prettier](https://prettier.io/) <img src="https://prettier.io/icon.png" width="80" align="right">
  

</div>

<div style="margin-top: 80px; margin-bottom: 50px;">

# Testing [Jest](https://jestjs.io/) <img src="https://jestjs.io/img/jest.png" width="80" align="right">
  

</div>

## 🚀 API Routes

### Users

- `GET /users` - Returns user data (Requires JWT token)
- `POST /users/register` - Creates a new user (Requires username, email, and password)
- `POST /users/login` - Returns JWT token (Requires userId)

### Wishlists

- `POST /wishlist/create/wishlist/` - Creates a new wishlist (Requires token and wishlist name)
- `GET /wishlist/get/wishlists` - Returns all wishlists (Requires token)

## 🏃‍♂️ Getting Started

To run the application, follow these steps:

```bash
npm install
npx prisma migrate dev --name init
npm run dev