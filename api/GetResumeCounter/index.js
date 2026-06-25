const { CosmosClient } = require("@azure/cosmos");

const client = new CosmosClient(process.env.CosmosDbConnectionString);
const container = client.database("AzureResume").container("Counter");

module.exports = async function (context, req) {
    try {
        // Read item, increment, and save back to database
        const { resource: item } = await container.item("1", "1").read();
        item.count += 1;
        await container.item("1", "1").replace(item);

        context.res = {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: { count: item.count }
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: { error: error.message }
        };
    }
};