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
