# Scaffolding Express Typescript

[🇪🇸 Versión Español](./README_es.md)

## Steps

- Run install

```bash
npm install
```

- Create `.env` file with same `.env.example` value.

- Run development start:

```bash
npm start
```

- Run debug start (Attach mode):

```bash
npm run start:debug
```

- And run .vscode/launch.json (Debug Attach)

# Adding CORS support

Cross-Origin Resource Sharing (CORS) is a W3C specification and mechanism that you can use to request restricted resources from a domain outside the current domain. In other words, CORS is a technique for consuming an API served from an origin different than yours ([more information](https://www.freecodecamp.org/news/the-terrible-performance-cost-of-cors-api-on-the-single-page-application-spa-6fcf71e50147/)).

If your api is going to be consumed by client code running web applications under different domains, you may need to enable
CORS access on your express server.

[More information about CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

How to configure CORS in express:

First install the following package:

```bash
npm install cors -P
```

Thenn install the typings for this package:

```bash
npm install @types/cors -D
```

_/src/app.ts_

```diff
import { createApp } from './express.server';
+ import cors from 'cors';
import { envConstants } from './env.constants';
import { api } from './api';

const app = createApp();

+ // Warning: narrow down your CORS allowed origins to the web application domains that
+ // are allowed to access this application.
+ // check the methods and origin properties in the CorsOptions
+ const options: cors.CorsOptions = {
+  allowedHeaders: [
+    'Origin',
+    'X-Requested-With',
+    'Content-Type',
+    'Accept',
+    'X-Access-Token',
+  ],
+  credentials: true,
+  // IMPORTANT YOU MAY LIMIT THE ALLOWED VERBS TO FOR INSTANCE ONLY GET
+  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
+  // IMPORTANT LIMIT THIS HERE TO YOUR CLIENT APPS DOMAINS
+  origin: '*',
+  preflightContinue: false,
+ };
+
+ app.use(cors(options));

app.use('/api', api);

app.listen(envConstants.PORT, () => {
  console.log(`Server ready at http://localhost:${envConstants.PORT}/api`);
});
```


# Debugging on VS Code

Since VSCode v1.47, a new [New JavaScript Debugger](https://code.visualstudio.com/updates/v1_47#_debugging) feature has been enabled.

This new debugger works with zero config:

![create-js-debug-terminal](./readme-resources/00-create-js-debug-terminal.png)

And just running the command `npm start` it will let us attach to the process and debug:

```bash
npm start
```

- It runs the command with auto attached debugger

![running-debugger](./readme-resources/01-running-debugger.png)

- But it doesn't behave well on TypeScript projects yet. It will stop on transpiled code instead of original TS files:

![stop-on-transpiled-code](./readme-resources/02-stop-on-transpiled-code.png)

- We still can use previous debugging if we use `Debug Attach` command defined in .vscode/launch.json, but we need to disable the `New JavaScript Debugger` in settings:

![disabled-new-js-debugger](./readme-resources/03-disabled-new-js-debugger.png)

- And now, we can run `npm run start:debug` and `Debug Attach` command defined in .vscode/launch.json:

![stop-on-original-code](./readme-resources/04-stop-on-original-code.png)

This is something that has been fixed in a nightly build and likely to be released in the near future, [more information](https://github.com/microsoft/vscode/issues/103048)
