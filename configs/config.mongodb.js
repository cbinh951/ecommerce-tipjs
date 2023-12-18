const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3001,
  },
  db: {
    host: process.env.DEV_DB_HOST || "cluster0.i1ggxhq.mongodb.net",
    port: process.env.DEV_DB_PORT,
    name: process.env.DEV_DB_NAME || "cbinh951:congbinh95",
  },
};

const pro = {
  app: {
    port: process.env.PRO_APP_PORT,
  },
  db: {
    host: process.env.PRO_DB_HOST,
    port: process.env.PRO_DB_PORT,
    name: process.env.PRO_DB_NAME,
  },
};

const config = { dev, pro };
const env = process.env.NODE_ENV || "dev";
module.exports = config[env];
