import Navigation from './Navigation';
import { Provider } from 'react-redux'
import { store } from './store';
import { LogIn } from 'react-native-feather';





export default function App() {
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
}
