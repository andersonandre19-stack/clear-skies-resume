import { app } from '@azure/functions';
import { CosmosClient } from '@azure/cosmos';

// Connect to your Cosmos DB database using your Azure environment variable
const client = new CosmosClient(process.env.CosmosDbConnectionString);
const container = client.database("AzureResume").container("Counter");

app.http('GetResumeCounter', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            // Read item (id: "1", partition key: "1"), increment count, and save it back
            const { resource: item } = await container.item("1", "1").read();
            item.count += 1;
            await container.item("1", "1").replace(item);

            // Send the updated number back using clean jsonBody
            return {
                status: 200,
                jsonBody: { count: item.count }
            };
        } catch (error) {
            return {
                status: 500,
                jsonBody: { error: error.message }
            };
        }
    }
});