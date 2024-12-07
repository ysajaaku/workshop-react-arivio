import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const LoginForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const schema = z.object({
    email: z
      .string()
      .email('Please enter a valid email address.')
      .min(1, 'Email is required.'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters.')
      .min(1, 'Password is required.')
  })

  const checkCredentials = (email, password) => {
    const validEmail = 'arivio@example.com' 
    const validPassword = '123456'   
    if (email !== validEmail) {
      return 'Email not found.'
    } else if (password !== validPassword) {
      return 'Incorrect password. Please try again.'  
    }
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      schema.parse({ email, password })
      setErrors({}) 

      const authError = checkCredentials(email, password)
      if (authError) {
        setErrors({ password: authError })  
        setIsSubmitting(false)
        return
      }

      navigate('/profile') 
    } catch (err) {
      const newErrors = err.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message
        return acc
      }, {})
      setErrors(newErrors)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="container">
      <div className="card">
        <h2> WAOW Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ borderColor: errors.email ? 'red' : '' }}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ borderColor: errors.password ? 'red' : '' }}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

          <button type="submit" disabled={isSubmitting}>Login</button>
        </form>
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  )
}

export default LoginForm