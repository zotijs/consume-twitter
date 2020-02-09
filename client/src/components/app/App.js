import React from "react";
import useFetch from "libraries/useFetch";
import { Loader, ErrorCmp } from "components/common";
import "./App.css";

const App = ({ twits, isLoading, error, fetchTwits }) => {
  useFetch(fetchTwits);

  if (isLoading) return <Loader />;
  if (error) return <ErrorCmp {...error} />;

  return (
    <div className="twitsContainer">
      {twits &&
        twits.map(twit => (
          <p key={twit.lastEventId} className="twit">
            {twit.data}
          </p>
        ))}
    </div>
  );
};

export default App;
