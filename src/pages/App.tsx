import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from 'app/store';
import router from 'routes/router';
import DefaultTheme from 'theme/dark';
import Header from 'components/Header';

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Provider store={store}>
        <ThemeProvider theme={DefaultTheme}>
          <Header />
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
};

export default App;
