# Monorepo - Koa - Typescript Project

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

The main purpose of this repository is to build a good project setup and workflow for writing a Node api rest in TypeScript using KOA and an SQL DB.

## Features

-   Build in monorepo out of the box
-   Code sharing between application, no more duplication of code
-   Speed up development with generator
-   SQS queue as message broker
-   Swagger documentation
-   Prisma orm write high level ORM
-   Support grpc for exchange data
-   Logging and tracing with ELK-Stack, Never missed what happen inside the application
-   Support multiple database connection for each app

## Tech

Dillinger uses a number of open source projects to work properly:

-   [NX] - Smart, Fast and Extensible Build System !
-   [Koa] - Next generation web framework for node.js
-   [GRPC] - A high performance, open source universal RPC framework
-   [Prisma] - Next-generation Node.js and TypeScript ORM
-   [Swagger] - API Development for Everyone
-   [Elastic] - Grab and go integrations
-   [Amazon SQS] - Fully managed message queues for microservices, distributed systems, and serverless applications
-   [Sonarqube] - Code Quality and Code Security

## Documentation

-   [Starting app](#start-app)
-   [Generate Basic CRUD](#generate-basic-crud)
-   [GRPC](#grpc)
-   [Testing](#testing)
-   [Generate Library](#generate-library)
-   [Move Library](#move-library)

## start-app

Command

```sh
npx nx serve [app-name] --inspect false
```

Example

```sh
npx nx serve koa-app --inspect false
```

--inspect false means disable debugger

## generate-basic-crud

Command

```sh
npx nx workspace-generator basic-crud --project=[project] --module=[module] --className=[ClassName] --entity=[entity] --field=[field]
```

Example

```sh
npx nx workspace-generator basic-crud --project=koa-app --module=student --className=Student --entity=student --field=student
```

## grpc

Command

```sh
sh ./build-proto.sh [path-to-proto] [path-to-generated-proto]
```

Example

```sh
sh ./build-proto.sh ./libs/feature/proto/song.proto ./libs/feature/src/proto
```

## testing

Command

```sh
npx nx test [app-name] --codeCoverage
```

Example

```sh
npx nx test shared --codeCoverage
```

## generate-library

Command

```sh
npx nx g @nrwl/workspace:lib [name]
```

Example

```sh
npx nx g @nrwl/workspace:lib data
```

## move-library

Command

```sh
npx nx g @nrwl/workspace:move --project [app-name-from] [app-name-to]
```

Example

```sh
npx nx g @nrwl/workspace:move --project data feature
```

## License

MIT

**Free Software, Hell Yeah!**

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[nx]: https://nx.dev/
[koa]: https://koajs.com//
[grpc]: https://grpc.io//
[prisma]: https://www.prisma.io//
[swagger]: https://swagger.io//
[elastic]: https://www.elastic.co//
[amazon sqs]: https://aws.amazon.com/id/sqs//
[sonarqube]: https://www.sonarqube.org//
