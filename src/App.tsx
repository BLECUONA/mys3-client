import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import MainViewController from './screens/MainViewController';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const App: React.FC = () => {

  return (
    <ThemeProvider theme={theme}>
      <MainViewController />
    </ThemeProvider>
  );
};

export default App;