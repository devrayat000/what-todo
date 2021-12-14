import 'jest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TodoItem from '../../components/TodoItem'
import StoreProvider from '../../components/StoreProvider'
import { format } from 'date-fns'
import { FORMATTER } from '../../utils/const'
import { createStore } from '../../utils/store'

const doneFn = jest.fn()
const deleteFn = jest.fn()

describe('TodoItem', () => {
  const todo = createStore().getState().todos[0]

  beforeEach(() => {
    render(<TodoItem todo={todo} onDone={doneFn} onDelete={deleteFn} />, {
      wrapper: StoreProvider,
    })
  })

  it('should be rendered', () => {
    expect(screen.getByRole('listitem')).toBeInTheDocument()
  })

  it('should have primary text: note', () => {
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toHaveTextContent(todo.note)
  })

  it('should have secondary text: date', () => {
    expect(screen.getByRole('timer')).toBeInTheDocument()
    expect(screen.getByRole('timer')).toHaveTextContent(
      format(todo.createdAt, FORMATTER)
    )
  })

  it('should call onDone if checkbox is checked', () => {
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).not.toBeChecked()

    userEvent.click(screen.getByRole('checkbox'))
    expect(doneFn).toHaveBeenCalled()
    expect(doneFn).toHaveBeenCalledTimes(1)
  })

  it('should call onDelete if delete button is clicked', () => {
    expect(screen.getByRole('button')).toBeInTheDocument()

    userEvent.click(screen.getByRole('button'))
    expect(deleteFn).toHaveBeenCalled()
    expect(deleteFn).toHaveBeenCalledTimes(1)
  })
})
