import React, { createRef, useState } from 'react'
import { AuthConsumer } from '../lib/AuthContext'
import { withRouter } from 'react-router-dom'

export const LoginPage = withRouter(LoginPageComponent)

function LoginPageComponent({ history }) {
  const [message, setMessage] = useState('')
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
              try {
                const user = await fetchLoginValidate({username: usernameRef.current.value, password: passwordRef.current.value})
                setUser(user)
                if(!user.token) {
                  setMessage('Nicht angemeldet!')
                }
                history.push('/')
              } catch(error) {
                setMessage('Nicht angemeldet!')
              }
            }}>Login</button>
            <div style={{color: 'red'}}>{message}</div>
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

