import Head from 'next/head'
import projects from '../projects.json'
import ProjectList from '../components/ProjectList/ProjectList'
import { useState, useEffect } from 'react';
import useInterval from '../utils/useInterval';

function Home({ initialProjectsData }) {
  const [projectsData, setProjectsData] = useState(initialProjectsData);

  const updateProjectsData = async () => {
    const projectsData = await Promise.all(projects.map(async (project) => {
      return {
        ...project,
        stats: await loadStats(project.git),
        slots: await loadSlots(project.git, project.vercel)
      }
    }));

    setProjectsData(projectsData)
  }

  useEffect(() => { updateProjectsData() }, []);
  useInterval(() => { updateProjectsData() }, 120000);

  return (
    <>
      <Head>
        <title>Проекты дизайн-кода</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <ProjectList projectsData={projectsData} />
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      initialProjectsData: projects
    }
  }
}

async function loadStats(repo) {
  const response = await fetch(`/api/repo-stats?repo=${repo}`);
  return await response.json();
}

async function loadSlots(repo, vercel) {
  const response = await fetch(`/api/slots?repo=${repo}&vercel=${vercel}`);
  return await response.json();
}

export default Home