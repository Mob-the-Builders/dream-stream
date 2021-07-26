import { navigate } from 'gatsby';

const navToSignupClick = (e) => {
  e.preventDefault()
  return navigate('/signup')
}

const navToHomeClick = (e) => {
  e.preventDefault()
  return navigate('/')
}

const navToLoginClick = (e) => {
  e.preventDefault()
  return navigate('/login')
}


const navTest = () => {
  return navigate('/')
}

export {
  navToSignupClick, 
  navToHomeClick,
  navToLoginClick,
  navTest
};