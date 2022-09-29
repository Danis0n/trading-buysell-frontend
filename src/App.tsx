import { observer } from 'mobx-react-lite';
import './styles/App.css';
import AppRouter from './router/AppRouter';
import { useAuth } from './components/hook/useAuth';

function App() {

  const {store} = useAuth()

  if(store.isLoading){
    return <div>Loading</div>
  }

  return (
    <AppRouter/>
  )
}
  
export default observer(App); 
