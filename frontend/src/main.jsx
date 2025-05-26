import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import Welcome from './components/Welcome'
import Layout from './components/Layout'
import DashboardLayout from './components/DashboardLayout'
import NotFound from './components/NotFound/NotFound'

import UserRegister from './components/User/UserRegister'
import UserLogin from './components/User/UserLogin'
import UserProfile from './components/User/UserProfile'
import UserLogout from './components/User/UserLogout'

import ContactCreate from './components/Contact/ContactCreate'
import ContactList from './components/Contact/ContactList'
import ContactDetail from './components/Contact/ContactDetail'
import ContactEdit from './components/Contact/ContactEdit'

import AddressCreate from './components/Address/AddressCreate'
import AddressEdit from './components/Address/AddressEdit'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route index element={<Welcome />} />

        <Route element={<Layout />}>
          <Route path="*" element={<NotFound />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>

          <Route path="users">
            <Route index element={<NotFound />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="logout" element={<UserLogout />} />
          </Route>

          <Route path="contacts">
            <Route index element={<ContactList />} />
            <Route path="create" element={<ContactCreate />} />

            <Route path=":id">
              <Route index element={<ContactDetail />} />
              <Route path="edit" element={<ContactEdit />} />

              <Route path="addresses">
                <Route index element={<NotFound />} />
                <Route path="create" element={<AddressCreate />} />
                <Route path=":addressId/edit" element={<AddressEdit />} />
              </Route>

            </Route>

          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
