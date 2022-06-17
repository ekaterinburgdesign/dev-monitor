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

    const slotsData = await Promise.all(branches.data.map(async ({ name, commit }) => {

        const commitT = await octokit.request('GET /repos/{owner}/{repo}/commits/{ref}', {
            owner: 'ekaterinburgdesign',
            repo,
            ref: commit.sha
        });

        const slotSuffix = name.replace(/\//g, '-');
        const slotUrl = `https://${vercel}-${slotSuffix}.vercel.app`;
        return {
            slotUrl,
            date: commitT.data.commit.committer.date,
            commitUrl: commitT.data.html_url,
            commitMessage: commitT.data.commit.message,
            commitAuthor: commitT.data.committer?.login
        };
    }));

    res.status(200).json(slotsData);
}
 