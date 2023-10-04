import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import { useNavigate, useParams } from "react-router-dom";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const SearchEmployee = () => {
  const navigate = useNavigate()
  const {search} = useParams()
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

  }

  const handleRedirect = () => {
    navigate('/equipment'); 
  };


  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <select id="whichSearch" onChange={(event) => setWhichSearch(event.target.value)}>
        <option value="Level"> Level</option>
        <option value="Position">Position</option>
      </select>
      <button id="equip"  onClick={handleRedirect}>Equipment</button>
      <input id="search" placeholder="search" onInput={handleInput} />
      {/* <Autocomplete /> */}
      <EmployeeTable search={search} missing={false} employees={employees} onDelete={handleDelete} />
    </>
  )
};

export default SearchEmployee;
