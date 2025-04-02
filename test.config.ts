import * as dotenv from 'dotenv';

dotenv.config();

const parseBool = (actualValue: string | undefined, defaultValue: boolean): boolean => {
    return actualValue ? actualValue === 'true' : defaultValue;
};

const parseNumber = (actualValue: string | undefined, defaultValue: number): number => {
    return actualValue ? parseInt(actualValue, 10) : defaultValue;
};

const config = {
    headless: parseBool(process.env.PW_HEADLESS, true),
    workers: parseNumber(process.env.PW_WORKERS, 1),
    baseURL: process.env.PW_BASE_URL || 'http://localhost:3000',
    walletSeed: process.env.PW_WALLET_SEED,
};

export default config;
