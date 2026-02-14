import { handle } from "hono/aws-lambda";
import app from "../../index";

export const handler = async (event: any, context: any) => {
  // Strip the function path prefix if present (e.g. /.netlify/functions/api)
  // This allows the app to handle routes like /price regardless of invocation method
  if (event.path && event.path.startsWith("/.netlify/functions/api")) {
    event.path = event.path.replace("/.netlify/functions/api", "") || "/";
  }

  return handle(app)(event, context);
};
