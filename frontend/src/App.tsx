import React from 'react';
import { Chart } from './components/Chart';
import './App.css';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

export const link = createHttpLink({
  uri: "http://localhost:4000/graphql"
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

function App() {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="chartContainer" >
          <Chart />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
