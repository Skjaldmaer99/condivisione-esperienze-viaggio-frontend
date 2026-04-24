import ResetPasswordForm from "@/features/auth/ResetPasswordForm";
import { Link, useSearchParams } from "react-router"

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();

    const email = searchParams.get('email');
    const token = searchParams.get('token')

    return (
        <div className="flex flex-col justify-center mx-auto h-full min-h-screen max-w-md bg-gray-100 px-3">
            <div className="border-1 border-primary rounded-4xl p-4 py-5">
                <p className="font-bold text-lg">Reset Password</p>
                <p className="mb-5">{email}</p>
                <ResetPasswordForm />
            </div>
            <div className='text-center mt-10'>
                <Link to={'/'} className='text-sm'>Torna alla Home</Link>
            </div>
        </div>
    )
}

export default ResetPasswordPage
