import React, { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { errorNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { Switch, Route, Link } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
import { Button, Navigation, Page } from './components/StyledComponents'


const Menu = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">Blogs</Link>
      <Link style={padding} to="/users">Users</Link>
      {user.name} logged in <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if(window.localStorage.getItem('loggedUser')){dispatch(initializeBlogs()), dispatch(initializeUsers())}
  }, [dispatch, Menu])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(initializeBlogs())

      setUser(user)
      setUsername('')
      setPassword('')
      console.log(username)
    } catch (exception) {
      dispatch(errorNotification('wrong credentials', 5))
    }

    console.log('logging in with', username, password)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    console.log('Logging out')
    setUser(null)
  }

  if (user === null) {
    return (
      <Page>
        <Notification />
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </Page>
    )
  }

  return (
    <Page>
      <Notification />
      <Navigation><Menu user={user} handleLogout={() => handleLogout()}/></Navigation>
      <Switch>
        <Route path="/users/:id">
          <UserInfo />
        </Route>
        <Route path="/blogs/:id">
          <BlogInfo username={user.username}/>
        </Route>
        <Route path="/users">
          <h2>Users</h2>
          <UserList />
        </Route>
        <Route path="/">
          <h2>Blogs</h2>
          <BlogForm />
          <BlogList />
        </Route>
      </Switch>
    </Page>
  )
}

export default App
