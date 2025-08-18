import { App, Octokit } from 'octokit';
import type { ActionResponse, Feedback } from '@/components/rate';
import { getGithubAppSecrets } from '../../config';

export const repo = 'avey-api-docs';
export const owner = 'rimads';
export const DocsCategory = 'Ideas';

let instance: Octokit | undefined;

async function getOctokit(): Promise<Octokit> {
  if (instance) return instance;
  const { appId, privateKey } = getGithubAppSecrets();

  if (!appId || !privateKey) {
    throw new Error(
      'No GitHub keys provided for Github app, docs feedback feature will not work.',
    );
  }

  const app = new App({
    appId,
    privateKey,
  });

  const { data } = await app.octokit.request(
    'GET /repos/{owner}/{repo}/installation',
    {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    },
  );

  instance = await app.getInstallationOctokit(data.id);
  return instance;
}

interface RepositoryInfo {
  id: string;
  discussionCategories: {
    nodes: {
      id: string;
      name: string;
    }[];
  };
}

let cachedDestination: RepositoryInfo | undefined;
async function getFeedbackDestination() {
  if (cachedDestination) return cachedDestination;
  const octokit = await getOctokit();

  const {
    repository,
  }: {
    repository: RepositoryInfo;
  } = await octokit.graphql(`
  query {
    repository(owner: "${owner}", name: "${repo}") {
      id
      discussionCategories(first: 25) {
        nodes { id name }
      }
    }
  }
`);

  return (cachedDestination = repository);
}

export async function onRateAction(
  url: string,
  feedback: Feedback,
): Promise<ActionResponse> {
  'use server';

  const octokit = await getOctokit();
  const destination = await getFeedbackDestination();
  if (!octokit || !destination)
    throw new Error('GitHub comment integration is not configured.');

  const category = destination.discussionCategories.nodes.find(
    (category) => category.name === DocsCategory,
  );

  if (!category)
    throw new Error(
      `Please create a "${DocsCategory}" category in GitHub Discussion`,
    );

  const title = `Feedback for ${url}`;
  const body = `[${feedback.opinion}] ${feedback.message}\n\n> Forwarded from user feedback.`;

  const {
    search: {
      nodes: discussions,
    },
  }: {
    search: {
      nodes: { id: string; url: string }[];
    };
  } = await octokit.graphql(`
          query {
            search(type: DISCUSSION, query: ${JSON.stringify(`${title} in:title repo:${owner}/${repo} author:@me`)}, first: 1) {
              nodes {
                ... on Discussion { id, url }

              }
            }`);
    
    discussions = (searchResult as any).search.nodes;
    console.log('Search successful, found discussions:', discussions.length);
  } catch (searchError) {
    console.error('Search failed, skipping to create new discussion:', searchError);
    // If search fails, we'll just create a new discussion
    discussions = [];
  }

  let discussion: { id: string; url: string };

  let discussion: { id: string; url: string };


  if (discussions.length > 0) {
    // Discussion already exists, add a comment
    discussion = discussions[0];
    await octokit.graphql(`
            mutation {
              addDiscussionComment(input: { body: ${JSON.stringify(body)}, discussionId: "${discussion.id}" }) {
                comment { id }
              }
            }`);
  } else {
    const result: {
      createDiscussion: {
        discussion: { id: string; url: string };
      };
    } = await octokit.graphql(`
            mutation {
              createDiscussion(input: { repositoryId: "${destination.id}", categoryId: "${category!.id}", body: ${JSON.stringify(body)}, title: ${JSON.stringify(title)} }) {
                discussion { id, url }
              }
            }`);

    discussion = result.createDiscussion.discussion;
  }

  if (!discussion?.url) {
    throw new Error('Failed to create or retrieve GitHub discussion');
  }

  return {
    githubUrl: discussion.url,
  };
}