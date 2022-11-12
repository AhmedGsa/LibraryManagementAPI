#### Library Management API
REST API developed using Express.js and MongoDB

#### Setup

```bash
npm install && npm start
```

don't forget to add .env file containe the MONGO_URI, PORT, JWT_SECRET, JWT_LIFETIME Variables

#### Functionality
- Register new user / login to existing user
- Authentication using JsonWebToken

##### Admin
- Add new Books to the library
- Delete Books from the library

##### User
- Check all existing books in the library
- Borrow books from the library

#### Routers

- auth.js
- books.js
