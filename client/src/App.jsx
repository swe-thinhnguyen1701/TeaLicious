import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import HomePage from './pages/HomePage/HomePage';
// import ProductsPage from './pages/ProductsPage/ProductsPage'; //Marissa will create ProductsPage.jsx
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Header from './components/Header';
// import LoginPage from './pages/LoginPage/LoginPage'; // I will create LoginPage.jsx
// import UserPage from './pages/UserPage/UserPage'; // I will create UserPage.jsx
import './index.css';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Card />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/products" element={<ProductsPage />} /> */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/user" element={<UserPage />} /> */}
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;