# routes

### Users

    -  GET  /users          (token: jwt) -> returns user data
    -  POST /users/register (username: string, email: string, password: string) -> creates user
    -  POST /users/login    (userId: string) -> returns jwt token

### Wishlists

    - POST /wishlist/create/wishlist/ (token: string, wishListName: string) -> creates wishlist
    - GET /wishlist/get/wishlists (token: string) -> returns Wishlists

## to run

```bash
    npm install
    npx prisma migrate dev --name init
    npm run dev
```
