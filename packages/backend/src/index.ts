import app from '@/app';

const bootstrap = () =>
  app.listen('3000', () => {
    console.log('Server Started');
  });
bootstrap();
