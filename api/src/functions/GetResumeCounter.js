const { app } = require('@azure/functions');
const { CosmosClient } = require('@azure/cosmos');

const client = new CosmosClient(process.env.CosmosDbConnectionString);
const container = client.database("AzureResume").container("Counter");

app.http('GetResumeCounter', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        // Read item, increment, and save back to database
        const { resource: item } = await container.item("1", "1").read();
        item.count += 1;
        await container.item("1", "1").replace(item);

        return {
            status: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ count: item.count })
        };
    }
});