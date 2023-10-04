import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import { useAtom } from "jotai";
import state from "../state";
import { useEffect, useState } from "react";

const EmployeeTable = ({ search, employees, onDelete, missing }) => {
  const [missingEmployees, setMissingEmployees] = useAtom(state.missing)
  const [allEmployees, setAllEmployees] = useAtom(state.allEmployees)
  const [postMissing, setPostMissing] = useState(null)
  const [brands, setBrands] = useState(null)
  const [colors, setColors] = useState(null)
  const [counter, setCounter] = useState(true)


  useEffect(() => {
    fetch("/api/employees")
      .then(res => res.json())
      .then(data => {
        setMissingEmployees(data)
      })
  }, [])

  useEffect(() => {
    fetch("/api/brands")
      .then(res => res.json())
      .then(data => {
        setBrands(data)
      })
  }, [])

  useEffect(() => {
    fetch("/api/colors")
      .then(res => res.json())
      .then(data => {
        setColors(data)
      })
  }, [])

  useEffect(() => {
    fetch("/api/employees")
      .then(res => res.json())
      .then(data => {
        setAllEmployees(data)
      })
  }, [])
  let missingEmployeesArr = missingEmployees

  async function handleChange(event) {
    missingEmployeesArr.map((employee, i) => {
      if (event.target.id === employee.name) {
        missingEmployeesArr.splice(i, 1)
        console.log("yeah")
      } else if (i === missingEmployeesArr.length - 1) {
        allEmployees?.map(employee2 => {
          if (event.target.id === employee2.name && missingEmployeesArr.length < 100) {
            missingEmployeesArr.push(employee2)
          }
        })
      }
    })
    try {
      const response = await fetch("http://localhost:8080/api/missing", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(missingEmployeesArr),
      });

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetch("http://localhost:8080/api/missing")
      .then(res => res.json())
      .then(data => setPostMissing(data))
  }, [])

  function handleSort() {
    if(counter) {
      setCounter(false)
      employees.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
      
        if (nameA < nameB) {
          return -1; // a should come before b
        }
        if (nameA > nameB) {
          return 1; // a should come after b
        }
        return 0; // names are equal
      });
    } else {
      setCounter(true)
      employees.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
      
        if (nameA > nameB) {
          return -1; // a should come before b
        }
        if (nameA < nameB) {
          return 1; // a should come after b
        }
        return 0; // names are equal
      });
    }
    console.log(employees)
  }

  if (search === "") {
    if (missing) {
      return (
        <div className="EmployeeTable">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Level</th>
                <th>Position</th>
                <th id="present">Present</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {postMissing?.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.level}</td>
                  <td>{employee.position}</td>
                  <td>Missing</td>
                  <td>
                    <Link to={`/update/${employee._id}`}>
                      <button type="button">Update</button>
                    </Link>
                    <button type="button" onClick={() => onDelete(employee._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    } else {
      return (
        <div className="EmployeeTable">
          <table>
            <thead>
              <tr>
                <th onClick={handleSort}>Name</th>
                <th>Level</th>
                <th>Position</th>
                <th id="present">Present</th>
                <th>Favorite Brand</th>
                <th>Favorite Color</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.level}</td>
                  <td>{employee.position}</td>
                  <td><input id={employee.name} type="checkbox" onChange={handleChange} /></td>
                  <td>{brands?.map(brand => {
                    if (brand._id === employee.favoriteBrand) {
                      return brand.name
                    }
                  })}</td>
                  <td>{colors?.map(color => {
                      if(color._id === employee.favoriteColor) {
                        return color.name
                      }
                  })}</td>
                  <td>
                  <Link to={`/employee/${employee._id}/notes`}>
                    <button type="button">Notes</button>
                  </Link>
                    <Link to={`/update/${employee._id}`}>
                      <button type="button">Update</button>
                    </Link>
                    <button type="button" onClick={() => onDelete(employee._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    }

  } else {
    const employeesList = employees.filter(employee => employee.name.toUpperCase().includes(search.toUpperCase()))

    return (
      <div className="EmployeeTable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Level</th>
              <th>Position</th>
              <th id="present">Present</th>
              <th>Favorite</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {employeesList.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.level}</td>
                <td>{employee.position}</td>
                <td><input id={employee.name} type="checkbox" onChange={handleChange} /></td>
                <td>{brands?.map(brand => {
                  if (brand._id === employee.favoriteBrand) {
                    return brand.name
                  }
                })}</td>
                <td>
                <Link to={`/employee/${employee._id}/notes`}>
                    <button type="button">Notes</button>
                  </Link>
                  <Link to={`/update/${employee._id}`}>
                    <button type="button">Update</button>
                  </Link>
                  <button type="button" onClick={() => onDelete(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default EmployeeTable;
