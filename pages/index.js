import Head from 'next/head'
import projects from '../projects.json'
import ProjectList from '../components/ProjectList/ProjectList'

function Home({ projectsData }) {
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
  return { props: { projectsData: projects } }
}

export default Home