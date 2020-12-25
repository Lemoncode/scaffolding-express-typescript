# Scaffolding Express Typescript

[🇬🇧 English version](./README.md)

## Passos

- Ejecutar en consola install

```bash
npm install
```

- Crear el archivo `.env` con el mismo contenido de `.env.example`.

- Ejecutar en modo de desarrollo (development):

```bash
npm start
```

- Ejecutar en modo debug:

```bash
npm run start:debug
```

- Y ejecutar `.vscode/launch.json`

# Añadir soporte CORS

Cross-Origin Resource Sharing (CORS) es una especificación de W3C y un mecanismo dónde puedes restringir las peticiones desde un dominio exterior al dominio de origen. En otras palabras. CORS es una técnica para consumir API servidas desde un origen diferente al que se ecuentra originalmente ([más información](https://www.freecodecamp.org/news/the-terrible-performance-cost-of-cors-api-on-the-single-page-application-spa-6fcf71e50147/)).

Si la API va a ser consimida por código cliente que ejecuta aplicaciones web bajo diferentes dominios, se necesita actiavar el acceso CORS en el servidor express.

[Más informaci´ón sobre CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

Cómo configurar CORS en express:

Primero instala el siguiente paquete

```bash
npm install cors -P
```

Instala el tipado para el paquete.

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

# Debugging en VS Code

Desde la versión 1.47 de VSCode [JavaScript Debugger](https://code.visualstudio.com/updates/v1_47#_debugging) fue activada una nueva mejora.

Este nuevo debugger funciona con cero configuración:

![create-js-debug-terminal](./readme-resources/00-create-js-debug-terminal.png)

Y con sólo ejecutar el comando `npm start` nos permitirá conectarnos al proceso y depurar:

```bash
npm start
```

- Ejecuta el comando con un depurador automático...

![corriendo-debugger](./readme-resources/01-running-debugger.png)

- Pero aún no se comporta bien en los proyectos de TypeScript. Se detendrá en el código transpilado en lugar de los archivos originales de TS:

![stop-on-transpiled-code](./readme-resources/02-stop-on-transpiled-code.png)

- Todavía podemos usar la depuración previa si usamos el comando `Debug Attach` definido en .vscode/launch.json, pero necesitamos deshabilitar el `New JavaScript Debugger` en la configuración:

![disabled-new-js-debugger](./readme-resources/03-disabled-new-js-debugger.png)

- Y ahora podemos ejecutar `npm run start:debug` y `Debug Attach` commando definido en .vscode/launch.json:

![stop-on-original-code](./readme-resources/04-stop-on-original-code.png)

Esto es algo que ha sido arreglado en una "nightly build" y es posible que se libere en un futuro próximo, [más información](https://github.com/microsoft/vscode/issues/103048)

# Añadir configuración para testing con Jest

En primer lugar, debemos instalar los siguientes paquetes como devDependencies.

```bash
npm install jest ts-jest @types/jest -D
```

Posteriormente, agregaremos los scripts en el package.json para ejecutar los tests:

package.json

```js
"test": "cross-env NODE_ENV=test jest -c ./config/test/jest.js --verbose",
"test:watch": "npm run test -- --watchAll -i --no-cache",
```

A continuación, agregaremos una carpeta 'config' en el root del proyecto (atentos a no colocarla dentro de src). Dentro de la carpeta 'config' añadimos una subcarpeta títulada 'test' y dentro de esta última los archivos 'jest.js' y 'setup.js', de forma que ambos archivos se encontrarán en la siguiente ruta:
config/test

Ahora abrimos el archivo 'jest.js' que acabamos de crear y ponemos el siguiente código dentro del mismo para configurar Jest:

config/test/jest.js

```js
module.exports = {
  rootDir: '../../',
  preset: 'ts-jest',
  restoreMocks: true,
  setupFiles: ['<rootDir>/config/test/setup.js'],
  modulePathIgnorePatterns: ['node_modules', '<rootDir>/dist/'],
  testEnvironment: 'node',
  moduleDirectories: ['<rootDir>/src', 'node_modules'],
};
```

El archivo 'setup.js' podemos dejarlo vacío por el momento. Su utilización vendrá determinada en algunas ocasiones según la configuración de nuestro proyecto.

Para comprobar que todo está bien, podemos crear un archivo spec en la siguiente ruta y poner dentro del mismo un test de prueba:

src/example.test.spec.ts

```js
describe('example test spec', () => {
  it('should pass dummy condition', () => {
    const dummy = true;
    expect(dummy).toEqual(true);
  });
});
```

Por último, podemos ejecutar los dos scripts que hemos incorporado al archivo 'package.json' para ver que todo funciona correctamente. Con el mismo objetivo, podemos cambiar el valor de la variable 'dummy' de nuestro archivo spec de ejemplo utilizando valores true o false para asegurarnos de que el resultado de los tests cambia según el valor que usemos.

El siguiente script ejecutará los tests de forma global una vez:

```bash
npm run test
```

Este otro se quedará vigilando cambios y ejecutará los tests de forma global cada vez que guardemos:

```bash
npm run test:watch
```

También podemos ejecutar los test de un solo archivo utilizando cualquiera de los dos scripts y el nombre de dicho archivo:

```bash
npm run test:watch example-test.spec
```

# ¿Con ganas de ponerte al día con Backend?

Apuntate a nuestro [Bootcamp Backend](https://lemoncode.net/bootcamp-backend#bootcamp-backend/banner)
