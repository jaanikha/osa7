import styled from 'styled-components'

const Button = styled.button`
  background: #ECD4FF;
  font-size: 1em;
  margin: .3em;
  padding: 0.25em .5em;
  border: 2px solid #B28DFF;
  border-radius: 12px;

  background-image: linear-gradient(90deg, #00C0FF 0%, #FFCF00 49%, #FC4F4F 80%, #00C0FF 100%);
  animation:slidebg 5s linear infinite;
`


const Input = styled.input`
  margin: 0.1em;
  border: 2px solid #B28DFF;
  border-radius: 6px;
`
const Page = styled.div`
  padding: 1em;
  background: #FFF5BA;
  border: 8px solid #B28DFF;
  border-radius: 20px;
`

const Navigation = styled.div`
  background: #ACE7FF;
  padding: .5em .5em .5em 1em;
  border: 4px solid #B28DFF;
  border-radius: 20px;
`

const Li = styled.li`
  font-size: 1.1em;

`

export { Button, Input, Page, Navigation, Li }