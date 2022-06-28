# creditcard-system backend api
Backend API which facilitates to fetch saved cards and save new card into the system.

## Dependencies
- Redis
- Node

## - Setup Redis
```
docker run -d -p 6379:6379 redis:alpine
```
**Env variables**
```
APP_NAME=CREDITCARD_SYSTEM
NODE_ENV=development
API_VERSION=/v1
VERSION=1.0
SWAGGER_PROTOCOL=http
SWAGGER_URL=127.0.0.1:3000
LOG_LEVEL=debug
PORT=3000

#Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_DB=5
REDIS_MODE=default

#Test user
USERID=100
MOBILE=971501234567

#JWT
JWT_SECRET=Hi%ptOKd9J22KkP%nayz&&e%TBDy@wFp
JWT_TokenExpiresIn=10d
JWT_ISSUER=self
JWT_ALGORITHM=ES256
```

## - Setup Server

```
LOG_LEVEL=silly
PORT=3000
```

**Install packages**
```
npm install
```

**For deployment**

We need to restrict the `/api/docs` endpoint for public access, enabled only for development environment

**For local development**
```
npm start
```

**API Security**
API are secured with JWT authentication. To access the api client has to send JWT auth token.
To make it simple generated sample JWT token using test user data configured in env
testUser: {
    userId: 100,
    mobile: 971501234567
}

sample JWT token : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMCwibW9iaWxlIjo5NzE1MDEyMzQ1NjcsImlhdCI6MTY1NjQxMzE3NiwiZXhwIjoxNjU3Mjc3MTc2LCJpc3MiOiJzZWxmIn0.SQ_1J5E-XoEUOMNnPCP9OJf_77SfLrTu3OSPo0LGCKU

**Swagger**
API collection can be accessed from below swagger url, this is enabled only for development environment
http://localhost:3000/docs/