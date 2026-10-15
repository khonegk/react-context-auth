import { useEffect, useState, type ReactNode } from 'react' // подключаем хуки и тип
import { AuthContext, type User } from './AuthContext' // берём общий контекст и тип пользователя

interface AuthProviderProps { // описываем свойства провайдер
    children: ReactNode // принимаем вложенные компоненты
}
export function AuthProvider({ children }: AuthProviderProps) { // создаём провайдер
    const [user, setUser] = useState<User | null>(null) // храним текущего пользователя
    useEffect(() => { // запускаем восстановление после загрузки
        try { // проверяем сохранённые данные
            const savedUser = localStorage.getItem('auth-user') // читаем пользователя из браузера
            if (!savedUser) return // завершаем, если данных нет
            const parsedUser: unknown = JSON.parse(savedUser) // разбираем сохранённую строку
            if ( // проверяем форму полученных данных
                typeof parsedUser === 'object' && // значение должно быть объектом
                parsedUser !== null && // null не считаем объектом
                'id' in parsedUser && // у объекта должно быть поле id
                typeof parsedUser.id === 'number' && // id должен быть числом
                'name' in parsedUser && // у объекта должно быть поле name
                typeof parsedUser.name === 'string' // name должен быть строкой
            ) {
                setUser({ id: parsedUser.id, name: parsedUser.name }) // восстанавливаем пользователя
            } else {
                localStorage.removeItem('auth-user') // удаляем некорректные данные
            }
        } catch {
            localStorage.removeItem('auth-user') // очищаем повреждённую запись
        }
    }, []) // запускаем эффект один раз
    function login(name: string) { // описываем вход по имени
        const nextUser = { id: Date.now(), name } // создаём пользователя
        setUser(nextUser) // обновляем состояние
        localStorage.setItem('auth-user', JSON.stringify(nextUser)) // сохраняем вход
    }
    function logout() { // описываем выход
        setUser(null) // очищаем состояние
        localStorage.removeItem('auth-user') // удаляем сохранённый вход
    }
    return ( // передаём данные дочерним компонентам
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}