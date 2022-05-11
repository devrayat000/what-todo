import React from 'react'

import { useStoreActions, useTodoStore } from '$lib/utils/store'
import Filter from './Filter'

const FilterTodos: React.FC = () => {
  const filterState = useTodoStore(state => state.todo.filterState)
  const setFilterState = useStoreActions(actions => actions.todo.filter)

  return <Filter state={filterState} setState={setFilterState} />
}

export default FilterTodos
