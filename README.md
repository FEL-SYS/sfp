Run
npx nx serve koa-app

Create koa base
npx nx generate @nrwl/node:application koa-app

Create library
npx nx g @nrwl/workspace:lib data

Create migration
npm run migration:create -- -n CreateUserTable

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
