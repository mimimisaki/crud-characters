import React from "react";
import axios from "axios";
import { changeName, changeAge, initializeForm } from "../actions";

const AddForm = ({ store }) => {
  const { name, age } = store.getState().form;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/characters", {
        name,
        age,
      })
      .then((response) => {
        console.log(response);
        store.dispatch(initializeForm());
      })
      .catch((err) => {
        console.log(new Error(err));
      });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          名前:
          <input
            value={name}
            onChange={(e) => {
              store.dispatch(changeName(e.target.value));
            }}
          />
        </label>
        <label>
          年齢:
          <input
            value={age}
            onChange={(e) => store.dispatch(changeAge(e.target.value))}
          />
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default AddForm;
