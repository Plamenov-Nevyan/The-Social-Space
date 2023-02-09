import path from "path";
import dotenv from "dotenv"

dotenv.config({
    path : path.resolve(__dirname, "./config.env")
})

interface envVariables {
    JWT_SECRET : string | undefined;
    SALT_ROUNDS : number | undefined;
    MONGO_URI : string | undefined;
    SERVER_PORT : number | undefined;
}

interface dotEnvConfig {
    JWT_SECRET : string;
    SALT_ROUNDS : number;
    MONGO_URI : string;
    SERVER_PORT : number;
}

const getEnvConfig = () : envVariables => {
    return {
        JWT_SECRET : process.env.JWT_SECRET,
        SALT_ROUNDS : Number(process.env.SALT_ROUNDS),
        MONGO_URI : process.env.MONGO_URI,
        SERVER_PORT : process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : undefined
    }
}

const getSanitizedEnvConfig = (envConfig : envVariables) : dotEnvConfig => {
    for(let [key, value] of Object.entries(envConfig)){
        if(value === undefined){throw new Error(`The value for ${key} is missing!`)}
    }
    return envConfig as dotEnvConfig
}

const dotEnvConfig = getEnvConfig()
const dotEnvSanitizedConfig = getSanitizedEnvConfig(dotEnvConfig)

export default dotEnvSanitizedConfig