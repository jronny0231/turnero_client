import { Routes, Route, Outlet } from 'react-router-dom';
import SignIn from './helpers/loginPage';
import PageNotFound from './helpers/errorPages/pageNotFound';
import { AuthedComponent, UnAuthedComponent } from './helpers/authenticateComponent';
import MainLoader from './pages/mainLoader';

export default function App(): JSX.Element {

  return (
    <Routes>
      <Route path="/" element={
        <AuthedComponent>
          <MainLoader />
        </AuthedComponent>
      } />

      <Route path="/login" element={ 
        <UnAuthedComponent>
          <SignIn />
        </UnAuthedComponent>
      } />
      
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}