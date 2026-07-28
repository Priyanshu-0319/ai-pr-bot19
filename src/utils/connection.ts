import { Redis } from "ioredis";

if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL is missing");
}

console.log(
  "REDIS_URL:",
  process.env.REDIS_URL?.replace(/:(.*?)@/, ":****@")
);

export const connection = {
  url: process.env.REDIS_URL!,
  maxRetriesPerRequest: null,
};