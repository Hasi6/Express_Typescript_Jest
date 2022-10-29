import { Client } from 'redis-om';

const url = process.env.REDIS_URL;

const redisClient = new Client().open(url);

export default redisClient;
