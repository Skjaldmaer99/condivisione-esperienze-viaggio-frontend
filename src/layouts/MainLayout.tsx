import CreatePostForm from '@/components/CreatePostForm'
import { FormDialog } from '@/components/FormDialog'
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'
import { Header } from '@/components/ui/navbar'
import { UserService } from '@/features/users/user.service'
import type { User } from '@/features/users/user.type'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { HouseIcon, PlusIcon, TreePalmIcon, UserRoundKeyIcon, UserRoundPlusIcon } from 'lucide-react'
import { Link, Outlet } from 'react-router'
import { Toaster } from 'sonner'

const MainLayout = () => {
    const queryClient = useQueryClient();

    //const currentUser = queryClient.getQueryData<User>(['user']);

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['user'],
        queryFn: () => UserService.currentUser()
    })

    return (
        <>
            <div className="w-full h-13 z-50 fixed top-0 left-0 right-0 mx-auto max-w-md flex justify-between p-2 bg-primary-foreground border-b-1 border-black/10">
                <Link
                    to="/"
                    aria-label="home"
                    className="flex gap-2 items-center p-1 px-3 rounded-full">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 392.02 324.6"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill="#fff200"
                            d="M268.08,0c-27.4,0-51.41,4.43-72.07,13.26C175.36,4.43,151.35,0,123.95,0H0v324.6h123.95c27.37,0,51.38-4.58,72.07-13.7,20.69,9.12,44.7,13.7,72.07,13.7h123.95V0h-123.95ZM324.09,268.36h-47.91c-20.25,0-37.3-4.05-51.18-12.15-12.28-7.17-21.94-17.41-28.99-30.7h0s0,0,0,0c0,0,0,0,0,0h0c-7.05,13.29-16.71,23.53-28.99,30.7-13.87,8.1-30.93,12.15-51.18,12.15h-47.91V56.24h47.91c19.8,0,36.67,4.01,50.61,12.04,12.51,7.2,22.35,17.47,29.55,30.77h0s0,0,0,0c0,0,0,0,0,0h0c7.2-13.3,17.04-23.57,29.55-30.77,13.95-8.02,30.82-12.04,50.61-12.04h47.91v212.13Z"></path>
                    </svg>
                    {/* <p className='font-semibold text-xl tracking-tighter'> Dalim</p> */}
                </Link>
                <div className='flex ms-auto gap-3'>
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
                </div>
            </div>
            <div className="w-full h-13 z-50 bg-primary-foreground max-w-md left-0 right-0 fixed bottom-0 mx-auto flex justify-between p-2 border-t-1 border-black/10">
                <Link
                    to="/posts"
                    aria-label="home"
                    className="flex gap-2 items-center"
                >
                    <HouseIcon className='size-5' />
                </Link>
                <FormDialog
                    button={<PlusIcon className='size-5' />}
                    title="Nuovo post"
                    description="Inserisci i dettagli del tuo viaggio"
                    form={(onClose) => <CreatePostForm onClose={onClose} />}
                />
                {/* dialog dove inserisci il luogo e ti compaiono i post di quel luogo */}
                <FormDialog
                    button={<TreePalmIcon className='size-5' />}
                    title="Filtro luogo"
                    description="Inserisci il luogo di tuo interesse"
                    form={(onClose) => <CreatePostForm onClose={onClose} />}
                />
                <Link
                    to="/profile"
                    aria-label="home"
                    className="h-[30px] w-[30px] items-center rounded-full overflow-hidden">
                    <img src={data?.img || "https://placehold.co/40x40/000000/FFFFFF/png?text=FE"} alt="profile" />
                </Link>
            </div>
            <Outlet />
            <Toaster />
        </>
    )
}

export default MainLayout
