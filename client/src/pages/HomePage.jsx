import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'

const HomePage = () => {
  const { signout } = useAuthStore();

  return (
    <div>
      HomePage
      <button onClick={signout}>SignOut</button>
    </div>
  )
}

export default HomePage