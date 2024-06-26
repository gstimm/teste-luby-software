import process from 'process';
import app from './server';

import { PORT } from './config';

app.shutdown = () => process.exit();

process.on('SIGINT', () => app.shutdown());

process.on('SIGTERM', () => app.shutdown());

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

export default app;
