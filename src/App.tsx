import { useState, type FormEvent } from 'react' // подключаем состояние и тип события
import { useAuth } from './components/AuthContext' // подключаем хук авторизации

function App() { // создаём основной компонент
  const { user, login } = useAuth() // получаем пользователя и вход из context
  const [name, setName] = useState('') // храним текст поля

  function handleSubmit(event: FormEvent<HTMLFormElement>) { // обрабатываем отправку формы
    event.preventDefault() // не перезагружаем страницу
    const trimmedName = name.trim() // убираем пробелы по краям
    if (trimmedName) { // проверяем, что имя не пустое
      login(trimmedName) // выполняем вход
      setName('') // очищаем поле
    }
  }
  return ( // выбираем экран по состоянию пользователя
      <main>
        <h1>Авторизация</h1>
        {user ? ( // показываем этот блок после входа
            <>
              <UserGreeting /> {/* показываем имя через context */}
              <LogoutButton /> {/* показываем кнопку выхода */}
            </>
        ) : ( // показываем форму, если входа нет
            <form onSubmit={handleSubmit}>
              <p>Введите имя, чтобы войти.</p>
              <label htmlFor="name">Имя</label>
              <input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)} // обновляем поле
                  placeholder="Ваше имя"
                  autoComplete="name"
                  required
              />
              <button type="submit">Войти</button>
            </form>
        )}
      </main>
  )
}
function UserGreeting() { // отдельный компонент приветствия
  const { user } = useAuth() // сам получает пользователя из context
  return <p>Вы вошли как {user?.name}.</p> // показывает имя
}
function LogoutButton() { // отдельный компонент выхода
  const { logout } = useAuth() // сам получает функцию выхода
  return <button onClick={logout}>Выйти</button> // выполняет выход
}
export default App // экспортируем компонент