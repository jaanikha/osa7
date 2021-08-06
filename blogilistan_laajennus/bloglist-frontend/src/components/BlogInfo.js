import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { initializeBlogs, likeBlog, deleteBlog } from '../reducers/blogReducer'
import { successNotification } from '../reducers/notificationReducer'
import { Button } from './StyledComponents'


const BlogInfo = ({ username }) => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const match = useRouteMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id.toString() === match.params.id.toString())
    : null

  const handleLikeBlog = async (blog) => {
    dispatch(likeBlog(blog))
    dispatch(initializeBlogs())
  }

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}`)) {
      dispatch(deleteBlog(blog.id))
      dispatch(successNotification('blog successfully deleted', 5))
    }
  }

  return (
    !blog ? null :
      <div>
        <h2>{blog.title}</h2>
        <p>
          {blog.author} <br></br>
          {blog.url} <br></br>
          {'likes:' + blog.likes} <br></br>
          <Button onClick={() => handleLikeBlog(blog)}>like</Button>{' '}
          {username === blog.user.username ? (
            <Button id='delete_button' onClick={() => handleDeleteBlog(blog)}>delete</Button>
          ) : null}{' '}
        </p>
      </div>
  )
}

export default BlogInfo