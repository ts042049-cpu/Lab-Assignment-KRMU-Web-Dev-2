import React from "react";

const AddStudentForm = ({ addStudent }) => {

  function submitHandler(event) {

    event.preventDefault();

    const name =
      event.target.name.value.trim();

    const score =
      Number(event.target.score.value);

    addStudent(name, score);

    event.target.reset();

  }

  return (

    <form
      onSubmit={submitHandler}
      className="form"
    >

      <input
        name="name"
        placeholder="Student Name"
        required
      />

      <input
        name="score"
        type="number"
        placeholder="Score"
        required
      />

      <button>

        Add Student

      </button>

    </form>

  );

};

export default AddStudentForm;