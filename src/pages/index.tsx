import Head from 'next/head'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import type { GetServerSideProps, NextPage } from 'next'
import Session, { Error as SessionError } from 'supertokens-node/recipe/session'

import Todos from '../components/Todos'
import AddTodo from '../components/AddTodo'
import withProps from '../utils/withProps'
import { initFrontend } from '../config/frontendConfig'
import { initBackend } from '../config/backendConfig'
import client, { ssr } from '../utils/urql'
import { TodosDocument, useTodosQuery } from '../graphql/generated'

// initFrontend()

const Home: NextPage = () => {
  return (
    <section>
      <Head>
        <title>Home</title>
      </Head>
      <Container
        component={MainPaper}
        maxWidth='sm'
        sx={{
          p: 2,
          borderRadius: 2,
        }}
      >
        <AddTodo />
        {/* <Todos todos={data?.todos} /> */}
        <Todos />
      </Container>
    </section>
  )
}

const MainPaper = withProps(Paper, { elevation: 2, component: 'main' })

// export const getServerSideProps: GetServerSideProps = async ctx => {
//   try {
//     await initBackend()
//     const session = await Session.getSession(ctx.req, ctx.res)

//     await client.query(TodosDocument).toPromise()

//     return {
//       props: {
//         urqlState: ssr.extractData(),
//       },
//     }
//   } catch (error) {
//     console.log(error)

//     if (
//       error instanceof SessionError &&
//       error.type === SessionError.TRY_REFRESH_TOKEN
//     ) {
//       console.log('refresh')

//       return { props: { fromSupertokens: 'needs-refresh' } }
//     } else if (
//       error instanceof SessionError &&
//       error.type === SessionError.UNAUTHORISED
//     ) {
//       console.log('unauthorized')

//       return {
//         redirect: {
//           destination: '/auth?rid=emailpassword',
//           permanent: false,
//         },
//       }
//     } else {
//       console.log(error)

//       throw error
//     }
//   }
// }

export default Home
