export const config = {
    api: {
        name: process.env.API_NAME || "meat-api",
        version: process.env.API_VERSION || "1.0.0"
    },
    server: {
        port: process.env.SERVER_PORT || 3000
    },
    db: {
        url: process.env.DB_URL || "mongodb://localhost/meat-api"
    }
};