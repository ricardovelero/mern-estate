import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { authStart, authSuccess, authFailure } from "../redux/user/userSlice"
import OAuth from "../components/OAuth"

export default function Auth() {
  const [formData, setFormData] = useState({})
  const { error } = useSelector((state) => state.user)
  const loading = false
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const isSignup = location.pathname === "/sign-up"
  const apiPath = isSignup ? "signup" : "signin"

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(authStart())
      const res = await fetch(`/api/auth/${apiPath}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      console.log(data)
      if (data.success === false) {
        dispatch(authFailure(data.message))
        return
      }
      dispatch(authSuccess(data))
      navigate("/")
    } catch (error) {
      dispatch(authFailure(error.message))
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        {isSignup ? "Sign up" : "Sign In"}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {isSignup && (
          <input
            onChange={handleChange}
            type="text"
            id="username"
            placeholder="username"
            className="border p-3 rounded-lg"
          />
        )}
        <input
          onChange={handleChange}
          type="email"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg"
        />
        <input
          onChange={handleChange}
          type="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : isSignup ? "Sign up" : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        {isSignup ? (
          <>
            <p>Have an account?</p>
            <Link to="/sign-in">
              <span className="text-blue-700">Sign in</span>
            </Link>
          </>
        ) : (
          <>
            {" "}
            <p>Don&apos;t have an account?</p>
            <Link to="/sign-up">
              <span className="text-blue-700">Sign up</span>
            </Link>
          </>
        )}
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  )
}
