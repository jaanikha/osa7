import React from 'react'
import { useSelector } from 'react-redux'
import Blog from '../components/Blog'
import { Li } from './StyledComponents'


const BlogList = () => {

  const blogs = useSelector(state => state.blogs)

  return (
    <div><ul>
      {blogs
        .sort((a, b) => {
          if (a.likes > b.likes) {
            return -1
          }
          if (a.likes < b.likes) {
            return 1
          }
          return 0
        })
        .map(blog => (
          <Li key={blog.id}>
            {' '}
            <Blog key={blog.id} blog={blog} />{' '}
          </Li>
        ))}
    </ul></div>
  )
}

export default BlogList