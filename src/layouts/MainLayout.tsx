import { Header } from '@/components/ui/navbar'
import { Outlet } from 'react-router'

const MainLayout = () => {
    return (
        <>
            <div className="mx-auto max-w-5xl flex justify-center">
                <Header />
                <Outlet />
            </div>
            {/* <Toaster /> */}
        </>
    )
}

export default MainLayout
