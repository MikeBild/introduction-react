import React, { createRef } from 'react'
import { AuthConsumer } from '../lib/AuthContext'

export function LoginPage() {
  const usernameRef = createRef('')
  const passwordRef = createRef('')

  return (
    <AuthConsumer>
      {
        ({ setUser }) => {
        return (
          <>
            <input type="text" placeholder="Benutzername" ref={usernameRef} />
            <input type="password" placeholder="Kennwort" ref={passwordRef} />
            <button onClick={async () => {
              const user = await fetchLoginValidate({username: usernameRef.current.value, password: passwordRef.current.value})
              setUser(user)
            }}>Login</button>
          </>
        )
      }
      }
    </AuthConsumer>
  )
}

async function fetchLoginValidate({username, password}) {
  const response = await fetch('http://localhost:8080/validate', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({username, password})
  })
  return await response.json()
}