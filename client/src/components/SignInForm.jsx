import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { signin, loading } = useAuthStore();

  return (
    <form className='space-y-6'
      onSubmit={(e) => {
        e.preventDefault();
        signin({ email, password });
      }}
    >
      <div>
        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
          Email:
        </label>
        <div className='mt-1'>
          <input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='appearance-none block w-full px-3 py-2 border border-cyan-700 rounded-md shadow-sm 
            placeholder-gray-500 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm bg-white'
          />
        </div>
      </div>

      <div>
        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
          Password:
        </label>
        <div className='mt-1'>
          <input
            id='password'
            name='password'
            type='password'
            autoComplete='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='appearance-none block w-full px-3 py-2 border border-cyan-700 rounded-md shadow-sm 
            placeholder-gray-500 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm bg-white'
          />
        </div>
      </div>

      <button
				type='submit'
				className={`w-full flex justify-center py-2 px-4 border border-transparent 
					rounded-md shadow-sm text-sm font-medium text-zinc-800 ${
						loading
							? "bg-yellow-400 cursor-not-allowed"
							: "bg-yellow-400 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-700"
					}`}
				disabled={loading}
			>
				{loading ? "Signing in..." : "Sign in"}
			</button>
    </form>
  )
}

export default SignInForm