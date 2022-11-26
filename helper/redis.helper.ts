import { createClient, RedisClientOptions } from "redis";
import { RedisVariables } from "../common/enums/redis-variables.enum";

export class Redis {

    private redisClient: any;

    constructor() {
        this.redisClient = createClient(this.GetRedisConfig());
        this.redisClient.on('error', (err: any) => {
            console.log('Error ' + err);
            this.InitRedis();
        });
        this.redisClient.on('error', (err: any) => {
            console.log('Error ' + err);
            this.InitRedis();
        });
    }

    InitRedis() {
        this.redisClient = createClient(this.GetRedisConfig());
        this.redisClient.on('error', (err: any) => {
            console.log('Error ' + err);
            setTimeout(() => {
                this.InitRedis();
            }, 5000)
        });
    }

    SaveVariableToRedis(redisVariable: RedisVariables, redisVariableValue: any) {
        return new Promise((resolve: any, reject: any) => {
            this.redisClient.set(RedisVariables[redisVariable], JSON.stringify(redisVariableValue), (err: any, reply: any) => {
                if (err) throw err;
                console.log(` ${redisVariable} Is Set`);
            });
        });
    }

    GetRedisVariableValue(redisVariable: RedisVariables) {
        return new Promise((resolve: any, reject: any) => {
            this.redisClient.get(RedisVariables[redisVariable], (err: any, reply: any) => {
                if (err || !reply) reject(err);
                else
                    resolve(JSON.parse(reply));
            });
        });
    }


    GetRedisConfig() {
        let config: any = {
            host: process.env.REDIS_HOS || '127.0.0.1',
            port: parseInt(process.env.REDIS_PORT || '6379'),

        };
        return config;
    }
}