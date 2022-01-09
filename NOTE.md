Run
npx nx serve koa-app

Create koa base
npx nx generate @nrwl/node:application koa-app

Create library
npx nx g @nrwl/workspace:lib data

Create migration
npm run migration:koa:create -- -n CreateUserTable

Run migration
npm run migration:run

Move library
move from lib/data to lib/feature
npx nx g @nrwl/workspace:move --project data feature

Linter
npx nx lint [projectName] --fix
npx nx lint koa-app --fix
npx nx run-many --target=lint --parallel=true --all=true

Test
npx nx test shared --codeCoverage

Done
1.Apm
2.Log
3.Absolute Import
4.Faster Reload
3.Handler
4.DTO
8.Husky pre commit
13.Swagger
14.Testing

Next
15.Linter strict no used var, no used import
7.Typeorm
10.Generator
11.Separate schema in dev
12.Separate db in prod

Test

Backlog

5.Docker Compose
6.Redis
9.Sqs
13.Handler rest,grpc
15.Sonarqube

Standard domain module
1.DTO
2.Handler (rest,grpc,sqs)
3.Service = connect dto to handler
4.Repository = connect to db
Process handler -> dto -> service -> repository;
