module.exports = {
  apps: [
    {
      name: 'api-gold-jar',
      script: './dist/main.js',
      watch: '.',
      watch_delay: 1000,
      ignore_watch: ['node_modules'],
    },
  ],
};
