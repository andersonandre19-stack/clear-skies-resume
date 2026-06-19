<<<<<<< HEAD
from ast import arg

import azure.functions as func
import logging
import json

#initialize the function app
app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="GetResumeCounter", methods=["GET"])

#1. Input Binding: Pulls the current item (id: "1") from CosmosDB automatically

@app.cosmos_db_input(

    arg_name="counterInput",
    database_name="andre-resume-visitor-storage",
    container_name="Counter",
    id="1",
    partition_keys="1",
    connection_string_setting="CosmosDBConnectionString"
)

# 2. Output Binding: Saves the updated item back to Cosmos DB automatically

@app.cosmos_db_output(
    arg_name="counterOutput",
    database_name="andre-resume-visitor-storage",
    container_name="Counter",
    connection_string_setting="CosmosDBConnectionString"
)
def GetResumeCounter(req: func.HttpRequest, counterInput: func.DocumentList, counterOutput: func.Out[func.Document]) -> func.HttpResponse:
    logging.info('Processing a request to update the visitor counter')

    # Fallback default item if database is completely empty
    current_counter = {"id": "1", "count": 0}

    # If the item exists in the database, extract it
    if counterInput:
        current_counter = dict(counterInput[0])


    # Increment the view count by 1
    current_counter["count"] +=1

    # Save the updated object back to Cosmos DB via the output binding
    counterOutput.set(func.Document.from_dict(current_counter))

    # Return the clean updated count as JSON to HTML frontend
    return func.HttpResponse(
        body=json.dumps({"count": current_counter["count"]})
        status_code=200,
        mimetype="application/json"
=======
from ast import arg

import azure.functions as func
import logging
import json

#initialize the function app
app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="GetResumeCounter", methods=["GET"])

#1. Input Binding: Pulls the current item (id: "1") from CosmosDB automatically

@app.cosmos_db_input(

    arg_name="counterInput",
    database_name="andre-resume-visitor-storage",
    container_name="Counter",
    id="1",
    partition_keys="1",
    connection_string_setting="CosmosDBConnectionString"
)

# 2. Output Binding: Saves the updated item back to Cosmos DB automatically

@app.cosmos_db_output(
    arg_name="counterOutput",
    database_name="andre-resume-visitor-storage",
    container_name="Counter",
    connection_string_setting="CosmosDBConnectionString"
)
def GetResumeCounter(req: func.HttpRequest, counterInput: func.DocumentList, counterOutput: func.Out[func.Document]) -> func.HttpResponse:
    logging.info('Processing a request to update the visitor counter')

    # Fallback default item if database is completely empty
    current_counter = {"id": "1", "count": 0}

    # If the item exists in the database, extract it
    if counterInput:
        current_counter = dict(counterInput[0])


    # Increment the view count by 1
    current_counter["count"] +=1

    # Save the updated object back to Cosmos DB via the output binding
    counterOutput.set(func.Document.from_dict(current_counter))

    # Return the clean updated count as JSON to HTML frontend
    return func.HttpResponse(
        body=json.dumps({"count": current_counter["count"]})
        status_code=200,
        mimetype="application/json"
>>>>>>> afb4669cfa5ee970f18f235a0dcf5e9fe34cc1b2
    )