import { FormDialog } from '@/components/FormDialog'
import { LogoutDialog } from '@/features/auth/LogoutDialog'
import CreatePostForm from '@/features/travelPosts/CreatePostForm'
import type { User } from '@/features/users/user.type'
import { useQueryClient } from '@tanstack/react-query'
import { BookmarkIcon, HouseIcon, PlusIcon, SearchIcon } from 'lucide-react'
import { Link, Outlet } from 'react-router'
import { Toaster } from 'sonner'

const AuthLayout = () => {
    const queryClient = useQueryClient();

    const data = queryClient.getQueryData<User>(['user']);

    return (
        <>
            <div className="w-full h-13 z-50 fixed top-0 left-0 right-0 mx-auto max-w-md flex justify-between p-2 bg-primary-foreground border-b-1 border-black/10">
                <Link
                    to="/"
                    aria-label="home"
                    className="h-10 w-10 flex gap-2 items-center p-1 rounded-full">
                    <img src="logo-travel.png" alt="logo" className='w-full h-full rounded-full' />
                </Link>
                <div className='flex ms-auto gap-3'>
                    <LogoutDialog />
                </div>
            </div>
            <div className="w-full h-13 z-50 bg-primary-foreground max-w-md left-0 right-0 fixed bottom-0 mx-auto flex justify-between p-2 border-t-1 border-black/10">
                <Link
                    to="/"
                    aria-label="home"
                    className="flex gap-2 items-center"
                >
                    <HouseIcon className='size-5' />
                </Link>
                <Link
                    to="/posts"
                    aria-label="feed"
                    className="flex gap-2 items-center"
                >
                    <SearchIcon className='size-5' />
                </Link>
                <FormDialog
                    button={<PlusIcon className='size-5' />}
                    title="Nuovo post"
                    description="Inserisci i dettagli del tuo viaggio"
                    form={(onClose) => <CreatePostForm onClose={onClose} />}
                />
                {/* dialog dove inserisci il luogo e ti compaiono i post di quel luogo */}
                <Link to={'/saved'} className='my-auto'><BookmarkIcon className='size-5 my-auto' /></Link>
                <Link
                    to="/profile"
                    aria-label="home"
                    className="h-[30px] w-[30px] items-center rounded-full overflow-hidden">
                    <img src={data?.img || "https://placehold.co/40x40/000000/FFFFFF/png?text=FE"} alt="profile" className="rounded-full w-full h-full object-cover" />
                </Link>
            </div>
            <Outlet />
            <Toaster />
        </>
    )
}

export default AuthLayout
