import { BrowserRouter } from 'react-router-dom';
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from '../../assets/styles/global';
import { Header } from '../Header';
import Routes from '../../Routes';

import { Container } from './styles';

import ToastContainer from '../Toast/ToastContainer';

import { AuthProvider } from '../../contexts/authContext/auth';
import NavBar from '../private/NavBar';
import themes from '../../assets/styles/themes';
import colors from '../../assets/styles/themes/default';

function App() {
  const [theme, setTheme] = useState('light');

  function handleToggleTheme() {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }

  const defaultTheme = {
    colors,
    mode: themes[theme] || themes.light,
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <ToastContainer />
        <AuthProvider>
          <Container>

            <NavBar
              theme={theme}
              onToggleTheme={handleToggleTheme}
            />

            <Header />
            <Routes />
          </Container>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
