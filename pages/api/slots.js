import { Octokit } from "octokit"


export default async function handler(req, res) {
    const { repo, vercel } = req.query;

    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
    })

    const branches = await octokit.request('GET /repos/{owner}/{repo}/branches', {
        owner: 'ekaterinburgdesign',
        repo,
        protected: false
    });

    const slotsData = await Promise.all(
        branches.data.map(async ({ name, commit: lastCommit }) => {
            const commit = await octokit.request('GET /repos/{owner}/{repo}/commits/{ref}', {
                owner: 'ekaterinburgdesign',
                repo,
                ref: lastCommit.sha
            });

            const slotSuffix = name.replace(/\//g, '-');
            const slotUrl = `https://${vercel}-${slotSuffix}.vercel.app`;
            return {
                slotUrl,
                date: commit.data.commit.committer.date,
                commitUrl: commit.data.html_url,
                commitMessage: commit.data.commit.message,
                commitAuthor: commit.data.committer?.login
            };
        }))

    const sortedSlots = slotsData.sort((a, b) => {
        if (a.date > b.date) {
            return -1;
        }
        if (a.date < b.date) {
            return 1;
        }

        return 0;
    });

    res.status(200).json(sortedSlots);
}
