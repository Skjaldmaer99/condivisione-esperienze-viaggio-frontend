import CreatePostForm from '@/components/CreatePostForm'
import { FormDialog } from '@/components/FormDialog'
import LoginForm from '@/components/LoginForm'
import { LogoutDialog } from '@/components/LogoutDialog'
import RegisterForm from '@/components/RegisterForm'
import { UserService } from '@/features/users/user.service'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { BookmarkIcon, HouseIcon, PlusIcon, SearchIcon, UserRoundKeyIcon, UserRoundPlusIcon } from 'lucide-react'
import { Link, Outlet } from 'react-router'
import { Toaster } from 'sonner'

const MainLayout = () => {
    const queryClient = useQueryClient();

    /*  const user = queryClient.getQueryData<User>(['user']); */
    //const currentUser = queryClient.getQueryData<User>(['user']);

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['user'],
        queryFn: UserService.currentUser,
    })
    console.log(data)

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
                    {!data
                        ? <>
                            <FormDialog
                                button={<UserRoundPlusIcon className='size-9 p-2 rounded-full' />}
                                title="Registrati"
                                description="Registrati"
                                form={(onClose) => <RegisterForm onClose={onClose} />}
                            />
                            <FormDialog
                                button={<UserRoundKeyIcon className='size-9 p-2 rounded-full' />}
                                title="Login"
                                description="Login"
                                form={(onClose) => <LoginForm onClose={onClose} />}
                            />
                        </>
                        : <LogoutDialog />
                    }
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
                {data && <>
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
                </>
                }
            </div>
            <Outlet />
            <Toaster />
        </>
    )
}

export default MainLayout
