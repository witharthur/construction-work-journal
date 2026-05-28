import type { IncomingMessage, ServerResponse } from "node:http";

const appPromise = import("../../backend/src/app.js").then(({ createApp }) => createApp());

export default async function handler(
  request: IncomingMessage,
  response: ServerResponse
): Promise<void> {
  const app = await appPromise;
  app(request, response);
}
