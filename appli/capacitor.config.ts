import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'myapp',
  webDir: 'dist',
  android: {
    allowMixedContent: true
  }
};

export default config;
