import { StrictMode } from 'react' // подключаем режим проверки React
import { createRoot } from 'react-dom/client' // подключаем создание приложения
import { AuthProvider } from './components/AuthProvider' // подключаем Provider
import App from './App' // подключаем основной экран

createRoot(document.getElementById('root')!).render( // находим место для приложения
    <StrictMode> {/* включаем проверки React */}
        <AuthProvider> {/* делаем context доступным приложению */}
            <App />
        </AuthProvider>
    </StrictMode>,
)