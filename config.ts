export const IS_DEVELOPMENT = process.env.NEXT_PUBLIC_MODE === "development";

export function getGithubAppSecrets(): { appId: string; privateKey: string } {
  const appId = process.env.GITHUB_APP_ID;
  let privateKey = process.env.GITHUB_APP_PRIVATE_KEY;

  if (!appId || !privateKey) {
    throw new Error(
      "Missing GITHUB_APP_ID or GITHUB_APP_PRIVATE_KEY in environment."
    );
  }
  privateKey = privateKey.replace(/\\n/g, "\n");

  return { appId, privateKey };
}

