import {
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  styled,
} from '@mui/material'
import { FilterState } from '../../interfaces'
import { useStoreActions, useTodoStore } from '../../utils/store'

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  '&.MuiToggleButton-root': {
    padding: `${theme.spacing(0.75)} ${theme.spacing(1)}`,
    margin: 0,
  },
  '&.Mui-selected': {
    backgroundColor: 'inherit',
    color: theme.palette.primary.main,
  },
}))

const Filter = function <S>(props: {
  state: S
  setState: (newState: S) => void
}) {
  return (
    <StyledToggleButtonGroup
      exclusive
      value={props.state}
      onChange={(e, alignment) => {
        props.setState(alignment)
      }}
    >
      <Typography
        variant='button'
        component={StyledToggleButton}
        value={FilterState.ALL}
      >
        All
      </Typography>
      <Typography
        variant='button'
        component={StyledToggleButton}
        value={FilterState.ACTIVE}
      >
        Active
      </Typography>
      <Typography
        variant='button'
        component={StyledToggleButton}
        value={FilterState.COMPLETED}
      >
        Completed
      </Typography>
    </StyledToggleButtonGroup>
  )
}

export default Filter
