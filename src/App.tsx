import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ECommerce from './pages/Dashboard/ECommerce';

import Clients from './pages/Clients';
import Bills from './pages/Bills';
import BackUps from './pages/BackUps';
import Profile from './pages/Profile';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="IMS Org | Dashboard" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/clients"
          element={
            <>
              <PageTitle title="IMS Org | Clients" />
              <Clients />
            </>
          }
        />

        <Route
          path="/bills"
          element={
            <>
              <PageTitle title="IMS Org | Bills" />
              <Bills />
            </>
          }
        />

        <Route
          path="/backups"
          element={
            <>
              <PageTitle title="IMS Org | BackUps" />
              <BackUps />
            </>
          }
        />

        <Route
          path="/backups/profile/:clientId"
          element={
            <>
              <PageTitle title="IMS Org | BackUps" />
              <BackUps />
            </>
          }
        />

        <Route
          path="/backups/bill/:bill"
          element={
            <>
              <PageTitle title="IMS Org | BackUps" />
              <BackUps />
            </>
          }
        />

        <Route
          path="/profile/:profile_id"
          
          element={
            <>
              <PageTitle title="IMS Org | Profile" />
              <Profile/>
            </>
          }
        />

        
        
      </Routes>
    </>
  );
}

export default App;
