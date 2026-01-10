import { useMemo } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Container, Theme } from './settings/types';
import { SukatLanding } from './components/generated/SukatLanding';

const theme: Theme = 'light';
// only use 'centered' container for standalone components, never for full page apps or websites.
const container: Container = 'none';

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  const generatedComponent = useMemo(() => {
    return <SukatLanding />;
  }, []);

  if (container === 'centered') {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        {generatedComponent}
        <Analytics />
      </div>
    );
  } else {
    return (
      <>
        {generatedComponent}
        <Analytics />
      </>
    );
  }
}

export default App;