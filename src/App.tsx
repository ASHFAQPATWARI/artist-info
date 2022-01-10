import React from "react";
import "./App.css";
import Splash from "./components/splash/splash";
import { useGetTokenQuery } from "./features/api/apiSlice";
import { Artists } from "./features/artists/artists";
import Storage from "./services/storage";

function App() {
  const { data: token, isLoading, isSuccess, isError } = useGetTokenQuery(null);
  if (isSuccess) {
    Storage.setToken(token.token);
  }

  if (isError) {
    return <h1>Some error occured. Please refresh</h1>;
  }

  return (
    <div className="bg-stone-900 min-h-screen">
      {isLoading ? (
        <Splash />
      ) : (
        <div className="App container py-12">
          <Artists />
        </div>
      )}
    </div>
  );
}

export default App;
