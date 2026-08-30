import { Throttle } from '@nestjs/throttler';
import {
  RATE_LIMIT_WINDOW,
  WRITE_RATE_LIMIT,
} from '../constants/rate-limit.constants';

export const WriteThrottle = () =>
  Throttle({
    default: {
      ttl: RATE_LIMIT_WINDOW,
      limit: WRITE_RATE_LIMIT,
    },
  });
