import { ConnectionPool } from 'mssql';

export const DatabaseConnectionPool = [
    {
        provide: 'DATABASE_CONNECTION_POOL',
        useFactory: async () => new ConnectionPool(
            {
                options: { enableArithAbort: true },
                server: (process.env.RDS_HOSTNAME == null) ? 'localhost' : process.env.RDS_HOSTNAME,
                user: (process.env.DB_USERNAME == null) ? 'me2' : process.env.DB_USERNAME,
                password: (process.env.DB_PASSWORD == null) ? '23Skidoo' : process.env.DB_PASSWORD,
                database: 'fs3718'
            }),
    },
];