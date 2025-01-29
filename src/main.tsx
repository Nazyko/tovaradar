import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './reset.css'
import { App } from './App.tsx'
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { ProductsCartProvider } from "./context/ProductCartContext.tsx"

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <ProductsCartProvider>
          <MantineProvider>
            <App />
          </MantineProvider>
        </ProductsCartProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
