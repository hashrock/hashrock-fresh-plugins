# Basic Auth Plugin

add this plugin like:

```ts
// main.ts
import basicAuthPlugin from "https://deno.land/x/hashrock-fresh-plugins/basic.ts";

await start(manifest, {
  plugins: [
    basicAuthPlugin("/greet/"),
  ],
});
```

and create `.env`

```
BASIC_AUTH_USER=user
BASIC_AUTH_PASSWORD=password
```
