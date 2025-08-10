import { App } from "octokit";

const app = new App({
  appId: process.env.GITHUB_APP_ID || "",
  privateKey: process.env.GITHUB_APP_PRIVATE_KEY?.replace(/\\n/g, "\n") || "",
});

(async () => {
  console.log("App info:", (await app.octokit.request("GET /app")).data);

  // List all installations and their repos
  const { data: installations } = await app.octokit.request("GET /app/installations");
  console.log("Installations:", installations);

  // Verify the repo appears under the installation
})();
