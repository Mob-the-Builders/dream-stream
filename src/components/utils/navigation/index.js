import { navigate } from 'gatsby';

const navToSignupClick = () => navigate('/signup')

const navToHomeClick = () => navigate('/')

const navToLoginClick = () => navigate('/login');

const navTest = () => navigate('/');

export {
  navToSignupClick, 
  navToHomeClick,
  navToLoginClick,
  navTest
};