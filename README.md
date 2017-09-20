# OAuth2 Provider Example with Express and Sequelize Postgres

Start by installing the dependencies:

```bash
$ yarn install
```

Then check the [database config](/config/config.json) and create the
database:

```bash
$ yarn run db:create
```

Then run the migrations:

```bash
$ yarn run db:migrate
```

If you ever want to roll back the last migration, you can run:

```bash
$ yarn run db:rollback
```

## Creating Models

Create models from the command line like so:

```bash
$ node_modules/.bin/sequelize model:create \
    --underscored \
    --name user \
    --attributes name:string,email:string,password:string
```

_**Note** the comma separated list of attributes!_

