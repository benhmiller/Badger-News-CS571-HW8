import { StatusBar } from 'expo-status-bar';
import BadgerNews from './src/components/BadgerNews';
import { PreferencesProvider } from './src/components/contexts/PreferencesContext';

export default function App() {
  return (
    <>
      <PreferencesProvider>
        <BadgerNews/>
      </PreferencesProvider>
      
      <StatusBar style="auto" />
    </>
  );
}

