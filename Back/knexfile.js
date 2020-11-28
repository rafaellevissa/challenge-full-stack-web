// Update with your config settings.
require('dotenv').config({
  path: '.env'
});

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: process.env.HOST_NAME || 'localhost',
      database: process.env.DATABASE_NAME || 'challenge',
      user: process.env.USERNAME_DATABASE || 'levi',
      password: process.env.PASSWORD_DATABASE || '123',
      port: process.env.PORT_DATABASE || '3306'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
