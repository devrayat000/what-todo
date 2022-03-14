import { StoreProvider as Provider } from 'easy-peasy'

import { store } from '../utils/store'

const StoreProvider: React.FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export default StoreProvider
