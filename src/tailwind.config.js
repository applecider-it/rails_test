/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/views/**/*.erb', // Rails のビュー
    './app/helpers/**/*.rb', // ヘルパー内の class も監視
    './app/javascript/**/*.{js,ts,jsx,tsx}', // Vite の JS / TS / React ファイル
  ],
  // パージされても残しておきたいクラスを指定
  // 正規表現でまとめて書ける
  safelist: [
    {
      pattern: /bg-(red|blue)-([\d]+)/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
