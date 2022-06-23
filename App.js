import StackNavigator from './StackNavigator';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import { NavigationContainer } from '@react-navigation/native';
import { StateContext } from './context/StateContext';
import { Reducer } from './context/reducer';
import { initialState } from './context/initialState';
export default function App() {
  return (
    <NavigationContainer>
      <StateContext reducer={Reducer} initialState={initialState}>
        <TailwindProvider utilities={utilities}>
          <StackNavigator />
        </TailwindProvider>
      </StateContext>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
