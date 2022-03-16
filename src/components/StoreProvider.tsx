import { StoreProvider as Provider } from 'easy-peasy'

import { useInitialStore } from '../utils/store'

const StoreProvider: React.FC = ({ children }) => {
  const store = useInitialStore()
  return <Provider store={store}>{children}</Provider>
}

export default StoreProvider
