import dotenv from "dotenv";

const envFound = dotenv.config();

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.APP_PORT!, 10),

  app: {
    key: process.env.APP_KEY,
    websiteFrontendBaseUrl: process.env.WEBSITE_FRONTEND_BASE_URL,
    dashboardBackendApiBaseUrl: process.env.DASHBOARD_BACKEND_API_BASE_URL,
  },

  logs: {
    level: process.env.LOG_LEVEL || 0,
  },

  api: {
    prefix: "/api/site",
  },

  database: {
    connection: process.env.DB_CONNECTION,
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT!, 10),
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  },
};
