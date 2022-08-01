import { RateLimiterMemory } from 'rate-limiter-flexible';

export const defaultRateLimitter = new RateLimiterMemory({
  keyPrefix: 'rlreports',
  points: 10, // Only 10 points for reports per user
  duration: 1 * 60 * 15
});

function rateLimitter(
  rateLimiter: RateLimiterMemory
): (target: object, functionName: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
  return function (_target: object, _functionName: string, descriptor: PropertyDescriptor) {
    const originalMethod: any = descriptor.value;

    descriptor.value = async function (...args: any) {
      const key = args[0].headers['x-original-forwarded-for'] || args[0].ip;
      const endPoint = args[0].originalUrl;

      if (args[0].path.indexOf(endPoint) === 0) {
        // const pointsToConsume = req.userId ? 1 : 5;
        const pointsToConsume = 1;
        rateLimiter
          .consume(key + '_' + endPoint, pointsToConsume)
          .then(async () => {
            const output: object = await originalMethod.apply(this, args);
            return output;
          })
          .catch((_) => {
            return args[1].status(429).json({
              success: false,
              data: null,
              errors: [{ message: 'Too Many Requests' }]
            });
          });
      } else {
        // const pointsToConsume = req.userId ? 1 : 30;
        const pointsToConsume = 1;
        rateLimiter
          .consume(key, pointsToConsume)
          .then(async () => {
            const output: object = await originalMethod.apply(this, args);
            return output;
          })
          .catch((_) => {
            return args[1].status(429).json({
              success: false,
              data: null,
              errors: [{ message: 'Too Many Requests' }]
            });
          });
      }
    };

    return descriptor;
  };
}
export { rateLimitter as RateLimitter };
