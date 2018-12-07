/**
 * index module
 */
import * as redis from 'redis';
import * as Sequelize from 'sequelize';

import * as factory from './factory';
import * as repository from './repository';

/**
 * Redis Cacheクライアント
 * @example
 * const client = domain.redis.createClient({
 *      host: process.env.REDIS_HOST,
 *      port: process.env.REDIS_PORT,
 *      password: process.env.REDIS_KEY,
 *      tls: { servername: process.env.REDIS_HOST }
 * });
 */
export import redis = redis;
export import Sequelize = Sequelize;
export import factory = factory;
export import repository = repository;
