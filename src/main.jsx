import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './app.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    100: "#141416",
    200: "#ed7d54",
    300: "#A3492F",
    400: "#533f4d",
    500: "#ffffff",
  },
}
const fontFamily = {
  brand: {
    100: "Vollkorn serif",
    200: "DM Serif Display",
  }
}

const theme = extendTheme({
  colors,
  fontFamily,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
