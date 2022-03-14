import Head from 'next/head'
import Image from 'next/image'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import type { GetServerSideProps, NextPage } from 'next'
import Session, { Error as SessionError } from 'supertokens-node/recipe/session'

import Todos from '../components/Todos'
import AddTodo from '../components/AddTodo'
import withProps from '../utils/withProps'
import { initFrontend } from '../config/frontendConfig'
import { initBackend } from '../config/backendConfig'
import client, { ssr } from '../utils/urql'
import { TodosDocument, useTodosQuery } from '../graphql/generated'
import { Box, Card, TextField, InputBase } from '@mui/material'

// initFrontend()

const Home: NextPage = () => {
  return (
    <Box
      component='section'
      sx={{
        inset: 0,
        position: 'absolute',
      }}
    >
      <Head>
        <title>Home</title>
      </Head>
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <Image
          src='/images/bg-desktop-light.jpg'
          layout='fill'
          objectFit='contain'
          objectPosition='top center'
        />
      </Box>
      <Box sx={{ position: 'absolute', inset: 0 }}>
        <Container
          // component={MainPaper}
          maxWidth='md'
          sx={{
            p: 2,
            mt: t => t.spacing(12),
          }}
        >
          <Typography
            variant='h4'
            component='h5'
            sx={{ textTransform: 'uppercase' }}
          >
            Todo
          </Typography>
          <AddTodo />
          <Box sx={{ height: t => t.spacing(3) }} />
          <Todos />
        </Container>
      </Box>
    </Box>
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
