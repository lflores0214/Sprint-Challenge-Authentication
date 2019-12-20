import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/privateroute";

const Jokes = () => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:3300/api/jokes")
      .then(response => {
        console.log(response.data);
        setJokes(response.data.joke);
        
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <button>log out</button>
      <h1>Jokes</h1>
      {jokes.map(joke => (
        <div>
          <p>{joke}</p>
        </div>
      ))}
    </div>
  );
};

export default Jokes;
