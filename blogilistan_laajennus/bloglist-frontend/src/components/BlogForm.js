import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs, createBlog } from '../reducers/blogReducer'
import { successNotification, errorNotification } from '../reducers/notificationReducer'
import { Button, Input } from './StyledComponents'

const Blogs = ({ handleSubmit }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleURLChange = (event) => {
    setNewURL(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    handleSubmit({
      title: newTitle,
      author: newAuthor,
      url: newURL
    })

    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }


  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title
          <Input
            id='title'
            type="text"
            value={newTitle}
            name="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author
          <Input
            id='author'
            type="text"
            value={newAuthor}
            name="author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          URL
          <Input
            id='url'
            type="text"
            value={newURL}
            name="URL"
            onChange={handleURLChange}
          />
        </div>
        <Button id='submit-button' type="submit">add</Button>
      </form>
    </div>
  )
}

const BlogForm = () => {
  const [addBlogVisible, setAddBlogVisible] = useState(false)

  const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: addBlogVisible ? '' : 'none' }

  const dispatch = useDispatch()

  const handleAddBlog = (blogObject) => {

    try {
      dispatch(createBlog(blogObject))
      dispatch(successNotification('blog successfully added', 5))
      setAddBlogVisible(false)
    } catch(error)  {
      dispatch(errorNotification(error.response.data.error, 5))
      dispatch(initializeBlogs())
    }
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button id='addNewBlog-button' onClick={() => setAddBlogVisible(true)}>
          add a new blog
        </Button>
      </div>
      <div style={showWhenVisible}>
        <Blogs handleSubmit={handleAddBlog}/>
        <Button onClick={() => setAddBlogVisible(false)}>cancel</Button>
      </div>
    </div>
  )
}

export default BlogForm
