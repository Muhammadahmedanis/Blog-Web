import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';
import Loader from './components/Loader';

function App() {
  const[loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      
      if(userData){
        dispatch(login({userData}));
      } else{
        dispatch(logout());
      }
    }).catch((err) => {
      console.log("error1:", err);
    })
    .finally(() => {
      setLoader(false);
    })
  }, [])

  return !loader ? (
    <div className='flex flex-wrap content-between'>
    <div className='w-full block '>
      <Header />
      <main className='min-h-screen py-3 bg-[rgb(236,227,202)]' >
          <Outlet  />
      </main>
      <Footer />
    </div>
    </div>
  ) : ( <Loader /> ) 
}

export default App

