import "dotenv/config";
import { App } from "@octokit/app";

const appId = process.env.APP_ID;
const privateKey = process.env.PRIVATE_KEY;

console.log("PRIVATE_KEY:", privateKey);

if (!appId) {
  throw new Error("Missing APP_ID");
}

if (!privateKey) {
  throw new Error("Missing PRIVATE_KEY");
}

export const githubapp = new App({
  appId: Number(appId),
  privateKey: privateKey.replace(/\\n/g, "\n"),
});