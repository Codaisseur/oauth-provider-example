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

## Creating Models

Create models from the command line like so:

```bash
$ node_modules/.bin/sequelize model:create \
    --underscored \
    --name user \
    --attributes name:string,email:string,password:string
```

_**Note** the comma separated list of attributes!_
