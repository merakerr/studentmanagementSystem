import React, { useEffect, useState } from "react";
import "./Student.css";

const Student = () => {
  const [student, setStudent] = useState({
    name: "",
    age: "",
    studentClass: "",
    phoneNumber: "",
  });

  const [studentList, setStudentList] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({
    name: "",
    age: "",
    studentClass: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      student.name !== "" &&
      student.age !== "" &&
      student.studentClass !== "" &&
      student.phoneNumber !== ""
    ) {
      alert("Student has been registered successfully");
      try {
        const res = await fetch("http://localhost:8081/api/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(student),
        });
        const data = await res.json();
        setStudentList([...studentList, data]);
        setStudent({
          name: "",
          age: "",
          studentClass: "",
          phoneNumber: "",
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("All fields are required");
    }
  };

  useEffect(() => {
    fetch("http://localhost:8081/api/students")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data successfully");
        setStudentList(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = (id,name,age,studentClass,phoneNumber) => {
    setModalOpen(true);
         setSelectedStudent({
          id: id,
          name: name,
          age: age,
          studentClass: studentClass,
          phoneNumber: phoneNumber,
        });
  };

  const handleModalInput = (e) => {
    const { name, value } = e.target;
    setSelectedStudent({ ...selectedStudent, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost:8081/api/students/" + selectedStudent.id,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedStudent),
        }
      );
      const data = await res.json();
      console.log("Data has been updated in the database", data);
      setStudentList((prevStudentList) =>
        prevStudentList.map((entry) =>
          entry.id === selectedStudent.id
            ? {
                ...entry,
                Name: selectedStudent.name,
                Age: selectedStudent.age,
                studentClass: selectedStudent.studentClass,
                phoneNumber: selectedStudent.phoneNumber,
              }
            : entry
        )
      );
      setSelectedStudent({
        id: "",
        name: "",
        age: "",
        studentClass: "",
        phoneNumber: "",
      });
      setModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch("http://localhost:8081/api/students/" + id, { method: "DELETE" });
      setStudentList((prevStudentList) =>
        prevStudentList.filter((entry) => entry.ID !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card mt-5">
              <div
                className="card-header"
                style={{ fontSize: "2rem", fontWeight: "bold" }}
              >
                Student Management Application
              </div>
              <div className="card-body">
                <form className="form m-3" onSubmit={handleSubmit}>
                  <div className="form-group m-3">
                    <div className="row">
                      <div className="col-3 mt-2">
                        <div className="form-label">Name</div>
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Name"
                          value={student.name}
                          onChange={handleInputChange}
                          name="name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group m-3">
                    <div className="row">
                      <div className="col-3 mt-2">
                        <div className="form-label">Age</div>
                      </div>
                      <div className="col-6">
                        <input
                          type="age"
                          className="form-control"
                          placeholder="Enter Age"
                          name="age"
                          value={student.age}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group m-3">
                    <div className="row">
                      <div className="col-3 mt-2">
                        <div className="form-label">Class</div>
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Class"
                          name="studentClass"
                          value={student.studentClass}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group m-3">
                    <div className="row">
                      <div className="col-3">
                        <div className="form-label">Phone Number</div>
                      </div>
                      <div className="col-6">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter Phone Number"
                          name="phoneNumber"
                          value={student.phoneNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-50 float-right m-3"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <div className="student-list mt-3">
              <h3 style={{ color: "white" }}>Student List</h3>
              <table className="table table-bordered mt-3 table-dark table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Class</th>
                    <th>Phone Number</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {studentList.map((entry, i) => (
                    <tr key={i}>
                      <td>{entry.id}</td>
                      <td>{entry.name}</td>
                      <td>{entry.age}</td>
                      <td>{entry.studentClass}</td>
                      <td>{entry.phoneNumber}</td>
                      <td>
                        <button
                          className="btn btn-primary m-2"
                          onClick={() => handleEdit(entry.id,entry.name,entry.age,entry.studentClass,entry.phoneNumber)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => handleDelete(entry.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="modal"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            zIndex: "1",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            overflow: "auto",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "#fefefe",
              padding: " 20px",
              border: "1px solid #888",
              width: " 80%",
              maxWidth: " 500px",
              margin: "auto",
            }}
          >
            <button
              className="close"
              onClick={() => setModalOpen(false)}
              style={{
                width: "2.5rem",
                lineHeight: "2rem",
                padding: ".3rem",
                color: "red",
                marginBottom: "1rem",
              }}
            >
              &times;
            </button>
            <h2>Edit Student</h2>
            <form className="form m-3" onSubmit={handleUpdate}>
              <div className="form-group m-3">
                <div className="row">
                  <div className="col-3 mt-2">
                    <div className="form-label">Name</div>
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Name"
                      value={selectedStudent.name}
                      onChange={handleModalInput}
                      name="name"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group m-3">
                <div className="row">
                  <div className="col-3 mt-2">
                    <div className="form-label">Age</div>
                  </div>
                  <div className="col-6">
                    <input
                      type="age"
                      className="form-control"
                      placeholder="Enter Age"
                      name="age"
                      value={selectedStudent.age}
                      onChange={handleModalInput}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group m-3">
                <div className="row">
                  <div className="col-3 mt-2">
                    <div className="form-label">Class</div>
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Class"
                      name="studentClass"
                      value={selectedStudent.studentClass}
                      onChange={handleModalInput}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group m-3">
                <div className="row">
                  <div className="col-3">
                    <div className="form-label">Phone Number</div>
                  </div>
                  <div className="col-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Phone Number"
                      name="phoneNumber"
                      value={selectedStudent.phoneNumber}
                      onChange={handleModalInput}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100 m-3">
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;
