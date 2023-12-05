import "./assets/styles.css"
import { Routes, Route } from 'react-router-dom'
import { UsersList } from './pages/user.crud';
import { ErrorPage } from './pages/helper/error.page';
import { LoginPage } from './pages/helper/login.page';
import { Layout } from './components/layouts/layout';
import { Home } from './pages';
import { ROUTES } from "./lib/constants/app.constants";

function App() {

  return (
    <Routes>

      <Route path={ROUTES.MAIN} element={<Layout />}>
        <Route index element={<Home />} />

        <Route path={ROUTES.ADMIN}>

          <Route path={ROUTES.USERS} element={<UsersList />} />

        </Route>
      </Route>



      <Route path='login' element={<LoginPage />} />

      <Route path='*' element={<ErrorPage type={'PAGE NOT FOUND'} />} />

    </Routes>
  )
}

export default App
