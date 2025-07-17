
import './App.css'
import '@fontsource/inter';
import Router from './router';
import { useEsp32Discovery } from './shared/hooks/findIpEsp32';

function App() {
useEsp32Discovery();
  return (
    <>
      <Router />
    </>
  )
}

export default App
