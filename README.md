# users-preferences-service

## Install & Build

```
npm install
npm run build
```

## Run

```
npm run serve
```

## Other Scripts

- `npm start`: run in development mode with auto reload
- `npm test`: run test suites
- `npm run test:coverage`: run test suites and generate coverage report.
- `npm run doc`: generate documentation of the project
- `npm run lint`: check code style

## Dockerize

```
npm install
npm run build
npm prune --production
docker build -t users-preferences-service .
```

### Run the docker image

```
docker run -dit --name users-preferences-service -p 3002:3002 users-preferences-service
```

### Build & Publish

```
npm install
npm run build
npm prune --production
docker build -t users-preferences-service .
docker push users-preferences-service
