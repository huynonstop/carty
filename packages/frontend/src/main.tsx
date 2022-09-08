import { PropsWithChildren, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './features/auth/auth.context';
import { SelectCollectionProvider } from './features/collection/selectCollection.context';
import { ItemsProvider } from './features/item/items.context';
import './index.css';

const ContextProviderCompose = ({
  children,
}: PropsWithChildren<{}>) => {
  return (
    <AuthProvider>
      <SelectCollectionProvider>
        <ItemsProvider>{children}</ItemsProvider>
      </SelectCollectionProvider>
    </AuthProvider>
  );
};

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProviderCompose>
        <App />
      </ContextProviderCompose>
    </BrowserRouter>
  </StrictMode>,
);
