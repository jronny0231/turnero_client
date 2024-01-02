import "./assets/styles.css"
import { useAccessControl } from './hooks/access.hook'
import { Routes, Route } from 'react-router-dom'
import { UsersList } from './pages/settings/users';
import { ErrorPage } from './pages/helper/error.page';
import { LoginPage } from './pages/helper/login.page';
import { Layout } from './components/layouts/layout';
import { Home } from './pages';
import { ROUTES, SLUG } from "./lib/constants/app.constants";
import { RegistryPage } from "./pages/registry";
import { SettingPage } from "./pages/settings";

function App() {

  const { canView } = useAccessControl()

  return (
    <Routes>

      <Route path={ROUTES.MAIN} element={<Layout />}>
        <Route index element={<Home />} />

        <Route path={ROUTES.REGISTRY} element={ canView(SLUG.REGISTRY, <RegistryPage /> ) } />

        <Route path={ROUTES.ADMIN}>
          <Route index element={canView(SLUG.ADMIN, <SettingPage />)} />
          
          <Route path={ROUTES.USERS} element={canView(SLUG.USERS, <UsersList />)} />

        </Route>
      </Route>



      <Route path='login' element={<LoginPage />} />

      <Route path='*' element={<ErrorPage type={'PAGE NOT FOUND'} />} />

    </Routes>
  )
}

export default App
