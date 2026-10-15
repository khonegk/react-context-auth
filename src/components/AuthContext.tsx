import { createContext, useContext } from 'react' // подключаем контекст и хук
export interface User { // описываем пользователя
    id: number
    name: string
}
interface AuthContextValue { // описываем данные контекст
    user: User | null // null входа нет
    login: (name: string) => void // функция входа
    logout: () => void // функция выхода
}
export const AuthContext = createContext<AuthContextValue | undefined>(undefined) // создаём context
export function useAuth() { // создаём хук
    const context = useContext(AuthContext) // получаем данные контекст
    if (!context) { // проверяем наличие провайдер
        throw new Error('useAuth должен использоваться внутри AuthProvider') // сообщаем об ошибке
    }
    return context // возвращаем данные контекст
}