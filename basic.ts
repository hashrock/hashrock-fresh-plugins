import { FreshContext, Plugin } from "./deps.ts";

export default function basicAuthPlugin(path: string): Plugin {
  const USER = Deno.env.get("BASIC_AUTH_USER");
  const PASSWORD = Deno.env.get("BASIC_AUTH_PASSWORD");
  const REALM = Deno.env.get("BASIC_AUTH_REALM");
  if (!USER || !PASSWORD) {
    throw new Error("BASIC_AUTH_USER and BASIC_AUTH_PASSWORD must be set");
  }

  async function handler(
    req: Request,
    ctx: FreshContext,
  ) {
    if (
      req.headers.get("Authorization") !==
        `Basic ${btoa(`${USER}:${PASSWORD}`)}`
    ) {
      const headers = new Headers({
        "WWW-Authenticate": `Basic realm="${REALM || "Fake Realm"}"`,
      });
      return new Response("Unauthorized", { status: 401, headers });
    }
    return await ctx.next();
  }

  return {
    name: "basicAuthPlugin",
    middlewares: [
      {
        middleware: {
          handler,
        },
        path,
      },
    ],
  };
}
