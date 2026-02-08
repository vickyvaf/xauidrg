const { handle } = require("hono/aws-lambda");
const app = require("../../index");

const lambdaHandler = handle(app);

exports.handler = async (event, context) => {
  // Strip the function path prefix if present (e.g. /.netlify/functions/api)
  // This allows the app to handle routes like /price regardless of invocation method
  if (event.path.startsWith("/.netlify/functions/api")) {
    event.path = event.path.replace("/.netlify/functions/api", "") || "/";
  }

  return lambdaHandler(event, context);
};
