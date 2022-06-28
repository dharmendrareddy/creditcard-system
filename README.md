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