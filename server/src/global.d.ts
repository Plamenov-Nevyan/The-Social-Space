namespace NodeJS {
    interface ProcessEnv {
        JWT_SECRET : string;
        SALT_ROUNDS : number;
        MONGO_URI : string;
        SERVER_PORT : number;
    }
}