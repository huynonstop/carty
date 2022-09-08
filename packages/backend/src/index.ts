import app from '@/app';
import { createServer } from 'http';
import { APP_PORT } from '@/common/config';
import { initIO } from '@/lib/socket';

const bootstrap = () => {
  const httpServer = createServer(app);
  initIO(httpServer);
  httpServer.listen(APP_PORT, () => {
    console.log(`🚀 Server ready at: http://localhost:${APP_PORT}`);
  });
};

bootstrap();
