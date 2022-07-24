import app from '@/app';
import { APP_PORT } from '@/common/config';

const bootstrap = () =>
  app.listen(APP_PORT, () => {
    console.log(`🚀 Server ready at: http://localhost:${APP_PORT}`);
  });
bootstrap();
