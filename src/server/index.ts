import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { fileURLToPath } from "node:url";
import { createApp } from "./app";

const app = createApp();
const port = Number(process.env.PORT ?? 6497);
const distRoot = fileURLToPath(new URL("../../dist", import.meta.url));

app.use("/*", serveStatic({ root: distRoot }));
app.use("*", serveStatic({ path: `${distRoot}/index.html` }));

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`Stitchlet is running on http://localhost:${info.port}`);
  },
);
