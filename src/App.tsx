import "./assets/styles.css"
import { Routes, Route } from 'react-router-dom'
import { UsersList } from './pages/settings/user.crud';
import { ErrorPage } from './pages/helper/error.page';
import { LoginPage } from './pages/helper/login.page';
import { Layout } from './components/layouts/layout';
import { Home } from './pages';
import { ROUTES } from "./lib/constants/app.constants";
import { RegistryPage } from "./pages/registry";
import { SettingPage } from "./pages/settings";

function App() {

  return (
    <Routes>

      <Route path={ROUTES.MAIN} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/registry" element={<RegistryPage />} />

        <Route path={ROUTES.ADMIN}>
          <Route index element={<SettingPage />} />
          <Route path={ROUTES.USERS} element={<UsersList />} />

        </Route>
      </Route>



      <Route path='login' element={<LoginPage />} />

      <Route path='*' element={<ErrorPage type={'PAGE NOT FOUND'} />} />

    </Routes>
  )
}

export default App
