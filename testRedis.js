import "dotenv/config";
import Redis from "ioredis";

console.log("REDIS_URL:", process.env.REDIS_URL);

const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => {
  console.log("✅ Connected to Redis");
  process.exit(0);
});

redis.on("error", (err) => {
  console.error("❌ Redis Error:", err);
  process.exit(1);
});