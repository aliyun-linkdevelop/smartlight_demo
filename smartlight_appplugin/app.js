import Bone from '@bone/bone-mobile';
import HomePage from './app/page/HomePage';
import ColorPickerPage from './app/page/ColorPickerPage';

const app = Bone.createApp({
  appName: 'bone-demo',
  router: {
    routes: [
      {
        path: '/',
        page: HomePage,
        initialProps: {
          title: 'Home',
        }
      },
      {
        path: '/ColorPickerPage',
        page: ColorPickerPage,
        initialProps: {
          title: '设置灯的颜色',
        }
      }
    ]
  }
});

app.start();
