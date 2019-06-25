import SchemaGenerator from './schemaGenerator';

const schemaGenerator = new SchemaGenerator({
    "user": "username",
    "password": "password",
    "server": "server",
    "database": "database"
}).generateSchemas({
    humanReadable: true,
    schemaFilePath: './schema/dbSchemas.ts',
    tableSchemas: ['dbo', 'diagnostics'],
});