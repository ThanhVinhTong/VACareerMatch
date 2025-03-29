import React, { useState } from "react";

import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";

const AuthPage = () => {
	const [isSignIn, setIsSignIn] = useState(true);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-700 to-yellow-400 p-4">
			<div className="w-full max-w-md">
				<h2 className="text-center text-zinc-50 text-3xl font-extrabold text-primary mb-8">
					{isSignIn ? "Sign in to Find Members with Similar Careers" : "Create an Account"}
				</h2>

				<div className="bg-white shadow-md rounded-lg p-8 border border-gray-200">
					{isSignIn ? <SignInForm /> : <SignUpForm />}

					<div className="mt-8 text-center">
						<p className="text-sm text-text">
							{isSignIn ? "New to CareerMatch?" : "Already have an account?"}
						</p>

						<button
							onClick={() => setIsSignIn((prevIsSignIn) => !prevIsSignIn)}
							className="mt-2 bg-accent text-black px-6 py-3 rounded-lg hover:bg-yellow-400 font-medium transition-colors duration-300"
						>
							{isSignIn ? "Create a New Account" : "Sign in to Your Account"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AuthPage;