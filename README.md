# OAuth2 Provider Example with Express and Sequelize Postgres

Example implementation of the OAuth 2 protocol using Express, Sequelize,
and PostgreSQL.

## Dependencies

  - Node version >= 7.6.0 (see: `node -v`)
  - Yarn (see: [install instructions](https://yarnpkg.com/en/docs/install))
  - Postgres version >= 9.3

Check the above, then install the npm package dependencies:

```bash
$ yarn install
```

## Getting Started

Then check the example [database config](/config/database.example.json), copy it to `config/database.json`, update it to match your local env, and create the database:

```bash
$ yarn run db:create
```

Then run the migrations:

```bash
$ yarn run db:migrate
```

## Working with the database

If you ever want to roll back the last migration, you can run:

```bash
$ yarn run db:rollback
```

To roll back all migrations, run:

```bash
$ yarn run db:rollback:all
```

To reset the database, run:

```bash
$ yarn run db:drop && yarn run db:create && yarn run db:migrate
```

or:

```bash
$ yarn run db:reset
```

### Creating models

Create models from the command line like so:

```bash
$ node_modules/.bin/sequelize model:create \
    --underscored \
    --name user \
    --attributes name:string,email:string,password:string
```

_**Note** the comma separated list of attributes!_

For more info, refer to the [Sequelize documentation](http://docs.sequelizejs.com/manual/installation/getting-started.html)
