# node-mssql-bulk-insert

This project is to resolve what I would imagine to be a common
Problem amongst node-mssql (there's a chance I'm reinventing the wheel)

Node-mssql bulk insert, requires you to provide essentially a schema, 
my problem with this is, it could lead to Anti-patterns where you either
1. Repeat your schema in multiple places through out your code
2. Maintain a separate schema outside of your database

I'm wouldn't be happy with either of the above approaches, especially in green project where the dB and schema will grow and change frequently.
So I threw together this project for a quick solution for myself, with plans for it to grow.

This project will connect to your dB, run through and generate that schema for you, 
outputting the schema, which allows you to easily import into your project

Future plans 
1. Turn it into a useable npm package
2. Provide an easy interface that uses the generate schema as an example of how I'd use this
3. ~~Allow more config options for a more flexible use for others~~
4. ~~Generate formatted objects for readability purposes~~
5. For those who use ts, look at type / interface generation 

Thanks for viewing, feel free to contribute or provide feedback :)
