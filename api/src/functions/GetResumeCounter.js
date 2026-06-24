const { app } = require('@azure/functions');
const { CosmosClient } = require('@azure/cosmos');

// Initialize the Cosmos Client securely using your Environment Variable
const client = new CosmosClient(process.env.CosmosDbConnectionString);
const container = client.database("AzureResume").container("Counter");

app.http('GetResumeCounter', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            // 1. Read the counter record from Cosmos DB
            const { resource: item } = await container.item("1", "1").read();
            
            // 2. Increment the numerical view counter
            item.count += 1;
            
            // 3. Save the modified document back to the database
            await container.item("1", "1").replace(item);

            // 4. Return using the v4 jsonBody parameter to enforce clean API transmission
            return {
                status: 200,
                headers: { 
                    "Access-Control-Allow-Origin": "*"
                },
                jsonBody: { count: item.count } // 👈 SWITCHED FROM body TO jsonBody
            };
        } catch (error) {
            context.log(`Database Error: ${error.message}`);
            return {
                status: 500,
                headers: { "Access-Control-Allow-Origin": "*" },
                jsonBody: { error: error.message }
            };
        }
    }
});