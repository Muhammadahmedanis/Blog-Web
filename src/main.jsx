import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Home from './pages/Home.jsx';
import AllPosts from './pages/AllPost.jsx';
import { AuthLayout, Login, Signup } from './components/index.js';
// import Signup from './pages/Signup.jsx';
import AddPost from './pages/AddPost.jsx';
import EditPost from './pages/EditPost.jsx';
import Post from './pages/Post.jsx';
// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route path='/' element={<App />}>
//             <Route path='/;id' element={} />
//             <Route path='/login' element={} />
//             <Route path='/signup' element={} />
//             <Route path='/all-post' element={} />
//             <Route path='/' element={} />
//         </Route>
//     )
// )


const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: '/home/:id',
                    element: <Home />
                },
                {
                    path: '/login',
                    element: (
                        <AuthLayout authentication={false}>
                            <Login />
                        </AuthLayout> 
                    )
                },
                {
                    path: '/signup',
                    element: (
                        <AuthLayout authentication={false}>
                            <Signup />
                        </AuthLayout>
                    )
                },
                {
                    path: '/all-post',
                    element: (
                        <AuthLayout authentication>
                            {/* {" "} */}
                            <AllPosts />
                        </AuthLayout>
                    )
                },
                {
                    path: '/add-post',
                    element: (
                        <AuthLayout authentication>
                            {/* {" "} */}
                            <AddPost />
                        </AuthLayout>
                    )
                },
                {
                    path: '/edit-post/:slug',
                    element: (
                        <AuthLayout authentication>
                            {/* {" "} */}
                            <EditPost />
                        </AuthLayout>
                    )
                },
                {
                    path: "/post/:slug",
                    element: <Post />,
                }

            ]
        }
    ],
    {
        future: {
            v7_relativeSplatPath: true, // Enables relative paths in nested routes
            v7_fetcherPersist: true,   // Retains fetcher state during navigation
            v7_normalizeFormMethod: true, // Normalizes form methods (e.g., POST or GET)
            v7_partialHydration: true, // Supports partial hydration for server-side rendering
            v7_skipActionErrorRevalidation: true, // Prevents revalidation when action errors occur
        },
    }
    
)

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider  future={{ v7_startTransition: true }} router={router} />
        </Provider>
    </StrictMode>
)
