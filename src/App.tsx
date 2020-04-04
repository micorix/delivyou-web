import React, { Suspense } from 'react';
import { ThemeProvider } from "styled-components";
import {theme} from "./design/theme";
import Routing from "./Routing";
import Navbar from "./components/Navbar";
import GlobalStyle from "./design/GlobalStyle";

const App = () => {
  return (
      <ThemeProvider theme={theme}>
          <GlobalStyle/>
          <Suspense fallback={<h2>Loading</h2>}>
              <Routing />
          </Suspense>
      </ThemeProvider>
  );
};

export default App;
