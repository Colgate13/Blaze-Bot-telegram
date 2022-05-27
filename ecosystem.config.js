module.exports = {
    apps: [{
        name: "blaze-bot",
        script: "dist/schedule.js",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    },
    {
        name: "blaze-bot-api",
        script: "dist/server.js",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}