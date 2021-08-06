import blogService from '../services/blogs'

const blogsAtStart = []


const getId = () => (100000 * Math.random()).toFixed(0)

export const likeBlog = (blog) => {
  return async dispatch => {

    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }

    const likedBlog = await blogService.update(blog.id, blogObject)

    dispatch({
      type: 'LIKE_BLOG',
      data: likedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.addBlog(blogObject)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

const asObject = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    id: getId(),
    likes: 0,
    user: blog.user
  }
}

const initialState = blogsAtStart.map(asObject)

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LIKE_BLOG':
    return state.filter(blog => blog.id !== action.data.id).concat(action.data)

  case 'ADD_BLOG':
    return [...state, action.data]

  case 'INIT_BLOGS':
    return action.data

  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.data)

  default: return state
  }
}

export default blogReducer