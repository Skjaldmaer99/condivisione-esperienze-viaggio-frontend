import { ThemeProvider } from "@/components/theme-provider.tsx";
import { TanStackDevtools } from '@tanstack/react-devtools';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import RootLayout from "./layouts/RootLayout";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import PostDetailPage from "./pages/PostDetailPage";
import PostsPage from "./pages/PostsPage";
import ProfilePage from "./pages/ProfilePage";
import SavedPage from "./pages/SavedPage";
import SingleUserPage from "./pages/SingleUserPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import RecuperoPasswordPage from "./pages/RecuperoPasswordPage";
import RedirectPasswordPage from "./pages/RedirectPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SuccessPasswordPage from "./pages/SuccessPasswordPage";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        if (error?.response?.status === 403) {
          return false; // stoppa il retry
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: '/posts',
        element: <PostsPage />
      },
      {
        path: '/saved',
        element: <SavedPage />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '/users/:id',
        element: <SingleUserPage />,
      },
      {
        path: '/verify-email',
        element: <VerifyEmailPage />,
      },
      {
        path: '/redirect-password',
        element: <RedirectPasswordPage />,
      },
      {
        path: '/success-password',
        element: <SuccessPasswordPage />,
      },
    ]
  },
  {
    path: '/posts/:id',
    element: <PostDetailPage />,
  },
  {
    path: '/recupero-password', //forgot-password
    element: <RecuperoPasswordPage />,
  },
  {
    path: '/reset-password', // reset-password
    element: <ResetPasswordPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
        <TanStackDevtools config={{ position: 'middle-left' }} plugins={[
          {
            name: 'TanStack Query',
            render: <ReactQueryDevtoolsPanel />,
            defaultOpen: false,
          },
        ]} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
)
