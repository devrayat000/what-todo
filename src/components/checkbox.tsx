import React from 'react'
import { RadioButtonUnchecked } from '@mui/icons-material'
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'

import CheckedIcon from './icons/checked'

const TodoCheckbox: React.FC<CheckboxProps> = props => {
  return (
    <Checkbox
      icon={<RadioButtonUnchecked sx={{ color: t => t.palette.grey[500] }} />}
      checkedIcon={<CheckedIcon />}
      {...props}
    />
  )
}

export default TodoCheckbox
