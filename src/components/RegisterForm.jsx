import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const RegisterForm = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const schema = z.object({
    firstName: z.string().min(1, 'First name is required.'),
    lastName: z.string().min(1, 'Last name is required.'),
    email: z
      .string()
      .email('Please enter a valid email address.')
      .min(1, 'Email is required.'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters.')
      .min(1, 'Password is required.'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm password must be at least 6 characters.')
      .min(1, 'Confirm password is required.')
      .refine((val) => val === password, {
        message: 'Passwords do not match.'
      })
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      schema.parse({ firstName, lastName, email, password, confirmPassword })
      setErrors({})
      navigate('/login')
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
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ borderColor: errors.firstName ? 'red' : '' }}
          />
          {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{ borderColor: errors.lastName ? 'red' : '' }}
          />
          {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}

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

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ borderColor: errors.confirmPassword ? 'red' : '' }}
          />
          {errors.confirmPassword && (
            <p style={{ color: 'red' }}>{errors.confirmPassword}</p>
          )}

          <button type="submit" disabled={isSubmitting}>Register</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  )
}
export default RegisterForm