import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

import Todos from '$lib/components/todo'
import AddTodo from '$lib/components/add-todo/AddTodo'

const HomePage: React.FC = () => {
  return (
    <Box
      component='section'
      sx={{
        inset: 0,
        position: 'absolute',
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <img src='/images/bg-desktop-light.jpg' alt='Desktop Background' />
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

export default HomePage
