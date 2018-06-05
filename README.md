# Cryptorides
Cryptorides allows users to book rideshare services using cryptocurrency.

<!-- toc -->

- [Usage](#usage)
  * [Requirements](#requirements)
  * [Source](#source)
  * [Docker Image](#docker-image)
- [Testing](#testing)
  * [Unit Tests](#unit-tests)
  * [Integration Tests](#integration-tests)
- [Routes](#routes)

<!-- tocstop -->

## Usage

### Requirements
This product uses the OAuth2 framework to authenticate against different services.
In order for cb-karl to work, it needs to be passed secret client tokens to
be used in OAuth2. Currently, there is no user-friendly way to do this. A
solution is coming soon.

### Source

Assuming `npm` v5.6.0 or greater.

```
$ git clone https://github.com/dhvogel/cryptorides-karl.git
$ cd cryptorides-karl
$ npm install
$ npm start
```

Visit http://localhost:3000 to see the application

### Docker Image

Assuming `docker` v17.09.1-ce or greater.

```
$ docker run -e NODE_ENV=test -p 80:3000 dhvogel/cb-karl:latest
```

Visit http://localhost:80 to see the application

## Testing

### Unit Tests

Mocha/Chai/Sinon unit testing framework used.

```
$ npm run test-unit
```

### Integration Tests

Supertest integration testing framework used.

```
$ npm run test-integration
```

## Routes

**GET /bikes**
- Returns list of all bikes in user's bike network

**GET /bikes/:bikeId**
- Returns data for a specific bike
