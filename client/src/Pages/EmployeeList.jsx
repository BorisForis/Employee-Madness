import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import state from "../Components/state";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [whichSearch, setWhichSearch] = useState("Level")
  const [copy, setCopy] = useState(null)
  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setEmployees(employees)
        setCopy(employees);
      })
  }, []);

  function handleInput(event) {
    if (whichSearch === "Level") {
      let sortedLevelEmployees = copy.filter(employee => employee.level.toUpperCase().includes(event.target.value.toUpperCase()))
      setEmployees(sortedLevelEmployees)
    }
    if (whichSearch === "Position") {
      let sortedPositionEmployees = copy.filter(employee => employee.position.toUpperCase().includes(event.target.value.toUpperCase()))
      setEmployees(sortedPositionEmployees)
    }

    if (whichSearch === "FirstName") {
      let sortedFirstNameEmployee = copy.filter(employee => {
        return employee.name.split(' ')[0].toUpperCase().includes(event.target.value.toUpperCase())
      })
      setEmployees(sortedFirstNameEmployee)
    }
    if (whichSearch === "LastName") {
      let sortedLastNameEmployee = copy.filter(employee => {
        if (employee.name.split(" ").length === 2) {
          return employee.name.split(' ')[1].toUpperCase().includes(event.target.value.toUpperCase())
        } else {
          return employee.name.split(' ')[2].toUpperCase().includes(event.target.value.toUpperCase())
        }
      })
      setEmployees(sortedLastNameEmployee)
    }
    if (whichSearch === "MiddleName") {
      let sortedMiddleNameEmployee = copy.filter(employee => {
        if (employee.name.split(" ").length === 2) {
          if (event.target.value === "") {
            return employee
          } else {
            return ""
          }
        } else {
          return employee.name.split(' ')[1].toUpperCase().includes(event.target.value.toUpperCase())
        }
      })
      setEmployees(sortedMiddleNameEmployee)
    }

  }


  const handleRedirect = () => {
    navigate('/equipment');
  };

  if (loading) {
    return <Loading />;
  }
  if (window.location.href.includes("/missing")) {
    return (
      <>
        <select id="whichSearch" onChange={(event) => setWhichSearch(event.target.value)}>
          <option value="Level"> Level</option>
          <option value="Position">Position</option>
          <option value="FirstName">First Name</option>
          <option value="LastName">Last Name</option>
          <option value="MiddleName">Middle Name</option>
        </select>
        <button id="equip" onClick={handleRedirect}>Equipment</button>
        <input id="search" placeholder="search" onInput={handleInput} />
        {/* <Autocomplete /> */}
        <EmployeeTable search="" missing={true} employees={employees} onDelete={handleDelete} />
      </>
    )
  } else {
    return (
      <>
        <select id="whichSearch" onChange={(event) => setWhichSearch(event.target.value)}>
          <option value="Level"> Level</option>
          <option value="Position">Position</option>
          <option value="FirstName">First Name</option>
          <option value="LastName">Last Name</option>
          <option value="MiddleName">Middle Name</option>
        </select>
        <button id="equip" onClick={handleRedirect}>Equipment</button>
        <input id="search" placeholder="search" onInput={handleInput} />
        {/* <Autocomplete /> */}
        <EmployeeTable search="" missing={false} employees={employees} onDelete={handleDelete} />
      </>
    )
  }
};

export default EmployeeList;
