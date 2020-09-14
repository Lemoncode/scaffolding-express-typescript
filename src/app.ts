import { createApp } from './express.server';
import { envConstants } from './env.constants';
import { api } from './api';


const app = createApp();

app.use('/api', api);

app.listen(envConstants.PORT, () => {
  console.log(`Server ready at http://localhost:${envConstants.PORT}/api`);
});
