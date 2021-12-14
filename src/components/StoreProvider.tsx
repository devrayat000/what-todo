import { Provider, createStore } from '../utils/store'

const StoreProvider: React.FC = ({ children }) => {
  return <Provider createStore={createStore}>{children}</Provider>
}

export default StoreProvider
