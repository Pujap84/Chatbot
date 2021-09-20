const dialogflow = require("@google-cloud/dialogflow");
const uuid = require("uuid");
const credentials = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLIENT_KEY.replace(/\\n/gm, "\n"),
};

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} message message the bot will respond to
 * @param {string} projectId The project to be used
 * @returns an object containing queryResult, fulfillmentText and intent. Documentation on the details of these can be found here: https://cloud.google.com/dialogflow/es/docs/basics
 */

async function getMessage(message, projectId = "pure-respect-325723") {
    // A unique identifier for the given session
    const sessionId = uuid.v4();

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient({
        projectId,
        credentials,
    });
    const sessionPath = sessionClient.projectAgentSessionPath(
        projectId,
        sessionId
    );

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: message,
                // The language used by the client (en-US)
                languageCode: "en-US",
            },
        },
    };
    console.log(request.queryInput.text.text);
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log("Detected intent");
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
    } else {
        console.log("  No intent matched.");
    }
    return result;
}

// runSample("hey");

module.exports = getMessage;
