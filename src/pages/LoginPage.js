import LoginForm from "../features/login/LoginForm";

const LoginPage = () => {
    return(
        <div className="w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden flex">
            <div className="login-img w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center text-white bg-blend-overlay text-center">
                <h1 className="text-3xl mb-3">Welcome to Family Hub</h1>
                <p className="text-lg">Let us help you track the things that are important in life.</p>
            </div>
            <div className="w-1/2 py-16 px-12 text-center">
                <h2 className="text-3xl mb-4">Log-In</h2>
                <LoginForm />
            </div>

        </div>
        
    )
    
}

export default LoginPage;