import "./App.css";
import Payment from "./Components/CheckoutPage"
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./Components/Products";
import { setContext } from '@apollo/client/link/context';
import StoreFrontPage from "./Components/StoreFrontPage"
import LoginPage from "./Components/LoginPage";


// const httpLink = createHttpLink({

//   // uri: '',

// });


// const authLink = setContext((_, { headers }) => {





//   return {

//     headers: {

//       ...headers,

//       authorization: "Bearer 33|akWH2oMHYa9GijJpTVu3XnyRGucRv8UbPctyQi46"     

//     }

//   }

// });


const client = new ApolloClient({

  link: authLink.concat(httpLink),

  cache: new InMemoryCache()

});

function App() {
  return (
  <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path="/products" element={<Products/>} />
        <Route path="/checkout"  element={<Payment/>} />
        <Route path="/storeselection" element={<StoreFrontPage/>} />
        <Route path="/" element={<LoginPage/>} />
      </Routes>
    </Router>
  </ApolloProvider>
  );
}

export default App;
