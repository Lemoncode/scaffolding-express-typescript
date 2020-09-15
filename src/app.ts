import { createApp } from './express.server';
import { envConstants } from './env.constants';
import { api } from './api';
import colors from 'colors';

const app = createApp();

app.use('/api', api);

app.listen(envConstants.PORT, () => {
  console.log(
    `${colors.yellow('Server running in:')}
    url : http://localhost:${colors.green(envConstants.PORT)}/api
    mode: ${colors.green(envConstants.NODE_ENV)}`
  );
});
