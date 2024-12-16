import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx';
import MyPosts from './pages/MyPosts.jsx';
import { AuthLayout, Login, Signup } from './components/index.js';
import AddPost from './pages/AddPost.jsx';
import EditPost from './pages/EditPost.jsx';
import Post from './pages/Post.jsx';

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: '/',
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
                    path: '/my-post',
                    element: (
                        <AuthLayout authentication>
                            {/* {" "} */}
                            <MyPosts />
                        </AuthLayout>
                    )
                },
                {
                    path: '/create-post',
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
                    path: "/post/:slug/:id",
                    element: <Post />
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
            <RouterProvider future={{ v7_startTransition: true }} router={router} />
        </Provider>
    </StrictMode>
)
