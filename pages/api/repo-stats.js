import { Octokit } from "octokit"

export default async function handler(req, res) {
    const { repo } = req.query;

    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
    })
      
    const repoData = await octokit.request('GET /repos/{owner}/{repo}', {
        owner: 'ekaterinburgdesign',
        repo
    });

    const pullsData = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
        owner: 'ekaterinburgdesign',
        repo
    })

    res.status(200).json({
        issues: repoData.data.open_issues_count,
        pulls: pullsData.data.length
    });
}
