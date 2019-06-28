import SchemaGenerator from '..';

const databaseConnection = {
    "user": "username",
    "password": "password",
    "server": "server",
    "database": "database"
}

const schemaGenerator = new SchemaGenerator(databaseConnection).generateSchemas({
    humanReadable: true,
    schemaFilePath: './schema/dbSchemas.ts',
    tableSchemas: ['dbo', 'diagnostics'],
});