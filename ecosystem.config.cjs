/** PM2 config — copy to server or run: pm2 start ecosystem.config.cjs */
module.exports = {
  apps: [
    {
      name: "forestsaver",
      script: "server.js",
      cwd: process.env.DEPLOY_PATH || "/var/www/forestsaver",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
      },
    },
  ],
}
