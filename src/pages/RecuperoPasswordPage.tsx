import ForgotPasswordForm from "@/features/auth/ForgotPasswordForm"
import { Link } from "react-router"

const RecuperoPasswordPage = () => {
    return (
        <div className="flex flex-col justify-center mx-auto h-full min-h-screen max-w-md bg-gray-100 px-3">
            <div className="border-1 border-primary rounded-4xl p-4 py-5">
                <p className="font-bold text-lg">Password dimenticata?</p>
                <p className="mb-5">Inserisci la mail, riceverai nella tua casella di posta un link per il cambio password.</p>

                <ForgotPasswordForm />
            </div>
            <div className='text-center mt-10'>
                <Link to={'/'} className='text-sm'>Torna alla Home</Link>
            </div>

        </div>
    )
}

export default RecuperoPasswordPage
