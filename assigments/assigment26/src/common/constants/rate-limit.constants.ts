import { minutes } from '@nestjs/throttler';

export const RATE_LIMIT_WINDOW = minutes(1);
export const GLOBAL_RATE_LIMIT = 30;
export const WRITE_RATE_LIMIT = 5;
