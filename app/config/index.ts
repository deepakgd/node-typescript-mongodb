const env = process.env.NODE_ENV;
const config = {
    dbname: `knowledgeupdate`,
    mongoUser: process.env.MONGO_USER,
    mongoPassword: process.env.MONGO_PWD,
    mongoHost: process.env.MONGO_HOST
};

export default config;