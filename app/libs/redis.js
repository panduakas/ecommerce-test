const fastStringify = require('fast-safe-stringify');
const JSONparse = require('fast-json-parse');
const redisPoolCon = require('redis-pool-connection');

const redisClient = redisPoolCon();

const redisCache = {
  redisSet: ({ key, data }) => {
    redisClient.set(key, fastStringify(data));
  },
  redisSetex: ({ key, ttl, data }) => {
    const expiredTime = ttl || 60;
    redisClient.setex(key, expiredTime, fastStringify(data));
  },
  redisDel: ({ key }) => {
    redisClient.del(key, (err, res) => {
      if (err) return err;
      return res;
    });
  },
  redisDelWild: ({ key }) => {
    redisClient.delwild(key, (err, res) => {
      if (err) return err;
      return res;
    });
  },
  redisGet: ({ key }) =>
    new Promise((resolve, reject) => {
      redisClient.get(key, (err, response) => {
        if (!err && response) {
          const data = JSONparse(response);
          resolve(data.value);
        } else if (err) reject(err);
        else resolve(null);
      });
    }),
  redisExpire: ({ key, ttl }) => {
    redisClient.expire(key, ttl);
  },
  ttl: {
    ONE_MINUTE: 60,
    THREE_MINUTE: 180,
    FIVE_MINUTE: 300,
    TEN_MINUTE: 600,
    FIFTEEN_MINUTE: 2400,
    HALF_HOUR: 1800,
    ONE_HOUR: 3600,
    TWO_HOUR: 7200,
    SIX_HOUR: 21600,
    ONE_DAY: 86400,
    ONE_WEEK: 604800,
  },
};

redisClient.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('Redis Connected');
});

redisClient.on('error', (err) => {
  throw err;
});

module.exports = redisCache;
