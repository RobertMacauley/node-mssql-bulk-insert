const sql = require("mssql");
const fs = require("fs");

interface SchemaGeneratorOptions {
    humanReadable: boolean;
}


class SchemaGenerator {
    connection: any;
    constructor(config: any) {
        this.connection = new sql.ConnectionPool(config).connect();
    }

    
    async generateSchemas(options: SchemaGeneratorOptions) {

        const connection = await this.connection;
        connection.request().query(`SELECT t.name
        FROM sys.tables AS t
        INNER JOIN sys.schemas AS s
        ON t.[schema_id] = s.[schema_id]
        WHERE s.name in (N'dbo');`).then(async (result: any) => { //, N'diagnostics'
            const schemas: any = {};
            for (const table of result.recordset) {
                console.log("get table", table.name)
                schemas[table.name] = await this.getTableDetail(table.name);
            }
    
            let content = JSON.stringify(schemas, null, options.humanReadable ? "\t" : null);
            content = "export default " + content;
            console.log(schemas);
            fs.writeFileSync("./schema/dbSchemas.ts", content);
    
            // console.log(schemas);
        });
    }

    async getTableDetail(tableName: string) {
        return new Promise(async (resolve, reject) => {
            console.log(tableName);
            const connection = await this.connection;
            connection.request().query(`
                SELECT
                    c.name 'columnName',
                    t.Name 'dataType',
                    c.max_length 'maxLength',
                    c.is_nullable 'nullable'
                FROM
                    sys.columns c
                INNER JOIN
                    sys.types t ON c.user_type_id = t.user_type_id
                LEFT OUTER JOIN
                    sys.index_columns ic ON ic.object_id = c.object_id AND ic.column_id = c.column_id
                LEFT OUTER JOIN
                    sys.indexes i ON ic.object_id = i.object_id AND ic.index_id = i.index_id
                WHERE
                    c.object_id = OBJECT_ID('${tableName}')
            `).then((tableDetails: any) => {
                console.log(tableDetails);
                resolve(this.getMSSQLSchema(tableDetails.recordset));
            });
        });
    }

    getMSSQLSchema(tableSchema: any) {
        const MSSQLSchema: any = [];
        console.log(tableSchema);
        if(tableSchema.length > 0) {
            tableSchema.forEach((column: any) => {
                MSSQLSchema.push({
                    name: column.columnName,
                    dataType: column.dataType,
                    maxLength: column.maxLength == "-1" ? "MAX" : column.maxLength,
                    options: {nullable: column.nullable}
                });
            });
        }
        return MSSQLSchema;
    }
    

};

const schemaGenerator = new SchemaGenerator({
    "user": "username",
    "password": "password",
    "server": "server",
    "database": "database"
});
schemaGenerator.generateSchemas({
    humanReadable: true
});