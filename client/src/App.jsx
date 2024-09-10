// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context"
import { Outlet } from 'react-router-dom';

// import HomePage from './pages/HomePage/HomePage';
// import ProductsPage from './pages/ProductsPage/ProductsPage'; //Marissa will create ProductsPage.jsx
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import Header from './components/Header';
// import LoginPage from './pages/LoginPage/LoginPage'; // I will create LoginPage.jsx
// import UserPage from './pages/UserPage/UserPage'; // I will create UserPage.jsx
import './index.css';

const httpLink = createHttpLink({
  uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
      <Footer />
    </ApolloProvider>
  );
}

export default App;