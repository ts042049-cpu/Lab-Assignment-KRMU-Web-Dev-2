import React from "react";

const StudentRow = ({
  student,
  updateScore
}) => {

  const status =
    student.score >= 40
      ? "Pass"
      : "Fail";

  return (

    <tr>

      <td>

        {student.name}

      </td>

      <td>

        <input

          type="number"

          value={student.score}

          onChange={(e) =>

            updateScore(

              student.id,

              Number(e.target.value)

            )

          }

        />

      </td>

      <td

        className={
          status === "Pass"
            ? "pass"
            : "fail"
        }

      >

        {status}

      </td>

    </tr>

  );

};

export default StudentRow;