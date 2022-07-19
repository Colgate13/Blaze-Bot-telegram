module.exports = {
    apps: [{
        name: "blaze-bot",
        script: "dist/schedule.js",
        env: {
            NODE_ENV: "development",
            PORT: "3000",
            CRON_SENDTILE: "10,20,30,40,50,59 * * * *",
            CRON_CHECKTILE: "33 0,11,21,31,41,51 * * * *",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}