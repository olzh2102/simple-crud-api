# Simple CRUD REST API Application (only NodeJS)

This is simple NodeJS application that can handle CRUD operations on `api/person` endpoint

## Install

```sh
npm i
```

To run on port, you can create `.env` file in root with following keys:

```sh
PORT=<port number>
TEST_PORT=<different number from PORT number>
```
### Application can run in two modes: Development and Production

#### To run in dev:
```sh
npm run start:dev
```

#### To run in prod:
```sh
npm run start:prod
```

## To run tests

```sh
npm test
```

### Available `endpoints` to call
- `api/person` - to GET all available persons list
- `api/person` - to POST to create person
- `api/person/${id}` - to GET person with `id`
- `api/person/${id}` - to DELETE person with `id`
- `api/person/${id}` - to PUT to update person with `id`  

