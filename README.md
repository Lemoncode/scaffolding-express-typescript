# Scaffolding Express Typescript

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

# Debugging state

Since VS Code v1.47, it enables a new debugging feature, [New JavaScript Debugger](https://code.visualstudio.com/updates/v1_47#_debugging) as default.

This new debugger works with no configuration on this way:

![create-js-debug-terminal](./readme-resources/00-create-js-debug-terminal.png)

And run command:

```bash
npm start
```

- It runs the command with auto attached debugger

![running-debugger](./readme-resources/01-running-debugger.png)

- But it stops on transpiled code break points when we are debugging:

![stop-on-transpiled-code](./readme-resources/02-stop-on-transpiled-code.png)

- We still can use previous debugging if we use `Debug Attach` command defined in .vscode/launch.json, but we need to disable the `New JavaScript Debugger` in settings:

![disabled-new-js-debugger](./readme-resources/03-disabled-new-js-debugger.png)

- And now, we can run `npm run start:debug` and `Debug Attach` command defined in .vscode/launch.json:

![stop-on-original-code](./readme-resources/04-stop-on-original-code.png)
