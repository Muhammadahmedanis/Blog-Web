import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const[loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      // console.log(userData);
      
      if(userData){
        dispatch(login({userData}));
      } else{
        dispatch(logout());
      }
    }).catch((err) => {
      console.log("error", err);
    })
    .finally(() => {
      setLoader(false);
    })
  }, [])

  return !loader ? (
    <div className='flex flex-wrap content-between '>
    <div className='w-full block '>
      <Header />
      <main className='relative top-16 min-h-screen pb-6 pt-4 bg-blue-100'>
        <Outlet  />
      </main>
      <Footer />
    </div>
    </div>
  ) : null
}

export default App
