import { Redis, RedisKey } from "ioredis";

const redis = new Redis();
export class RedisOperation {
  async setRedisWithTTL(key: RedisKey, value: string, TTL: number) {
    try {
      return await redis.set(key, value, "EX", TTL);
    } catch (error) {
      console.error("Error set data to Redis:", error);
      throw error;
    }
  }
  async setRedis(key: RedisKey, value: string) {
    try {
      return await redis.set(key, value);
    } catch (error) {
      console.error("Error fetching data from Redis:", error);
      throw error;
    }
  }

  async getRedis<T>(key: RedisKey): Promise<T | null> {
    try {
      const value: string = (await redis.get(key)) || "";
      return JSON.parse(value) as T;
    } catch (error) {
      console.error("Error fetching data from Redis:", error);
      throw error;
    }
  }
  async getRedisString(key: RedisKey) {
    try {
      return (await redis.get(key)) || "";
    } catch (error) {
      console.error("Error fetching data from Redis:", error);
      throw error;
    }
  }
  async deleteRedisKey(key: RedisKey) {
    try {
      return await redis.unlink(key);
    } catch (error) {
      console.error("Error delete data from Redis:", error);
      throw error;
    }
  }
  async Exist(key: RedisKey) {
    try {
      const isExist = await redis.exists(key);
      return isExist === 1 ? true : false;
    } catch (error) {
      console.error("Error check exist data from Redis:", error);
      throw error;
    }
  }
}
