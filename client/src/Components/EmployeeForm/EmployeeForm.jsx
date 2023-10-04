import { useEffect, useState } from "react";

let prevTools = []

const EmployeeForm = ({ onSave, disabled, employee, onCancel, equip }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [tool, setTool] = useState(employee?.tool ?? "")
  const [salary, setSalary] = useState(employee?.salary ?? "")

  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        salary,
        position,
        tool,
      });
    }

    return onSave({
      name,
      level,
      salary,
      position,
      tool,
    });
  };


  function HandleChange(e) {
    let equipments = [...Object.values(equip)]
    equipments?.map((equipment) => {
      if (equipment.name === e.target.value) {
        equipment.amount--
        prevTools.push(equipment)
        setTool(equipment.name)
      }
      if (prevTools.length >= 2) {
        equipments?.map((equipment, i) => {
          const prevTool = prevTools[0]
          if (equipment.name === prevTool.name) {
            equipment.amount++
          }
          if (i === equipments.length - 1) {
            prevTools.splice(0, 1)
          }
        })
      }
    })
  }

  function ifTool() {
    return (
      <>
        <option value={employee.tool}>{employee.tool}</option>
        {equip?.map((equipment, i) => {
          if (equipment.amount === 0) {
            return <option key={i} value={equipment.name} disable>{equipment.name}</option>
          } else {
            return <option key={i} value={equipment.name}>{equipment.name}</option>
          }
        })}
      </>
    )
  }

  function setSalaryAndLevel(salary) {
    setSalary(salary)
    if(salary <= 100){
      return setLevel("Junior")
    }
    if(salary > 100 && salary < 301){
      return setLevel("Medior")
    }
    if(salary > 300 && salary < 401){
      return setLevel("Senior")
    }
    if(salary > 400 && salary < 801){
      return setLevel("Expert")
    }
    if(salary > 800) {
      return setLevel("Godlike")
    }
  }

  function ifNoTool() {
    return (
      <>
        <option value="select">Select a Tool</option>
        {equip?.map((equipment, i) => <option key={i} value={equipment.name}>{equipment.name}</option>)}
      </>
    )
  }

  if (employee === "") {
    return (
      <form className="EmployeeForm" onSubmit={onSubmit}>
        <div className="control">
          <label htmlFor="name">Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            id="name"
          />
        </div>

        <div className="control">
          <label htmlFor="level">Level:</label>
          <input
            value={level}
            name="level"
            id="level"
            disabled
          />
        </div>

        <div className="control">
          <label htmlFor="position">Position:</label>
          <input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            name="position"
            id="position"
          />
        </div>

        <div className="buttons">
          <button type="submit" disabled={disabled}>
            {employee ? "Update Employee" : "Create Employee"}
          </button>

          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    );
  } else {
    return (
      <form className="EmployeeForm" onSubmit={onSubmit}>
        <div className="control">
          <label htmlFor="name">Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            id="name"
          />
        </div>

        <div className="control">
          <label htmlFor="level">Level:</label>
          <input
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            name="level"
            id="level"
            disabled
          />
        </div>

        <div className="control">
          <label htmlFor="position">Position:</label>
          <input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            name="position"
            id="position"
          />
        </div>

        <div className="control">
          <label htmlFor="tool">Tool:</label>
          <select onChange={HandleChange}>
            {
              employee.tool === "" ? ifNoTool() : ifTool()
            }
          </select>
        </div>

        <div className="control">
          <label htmlFor="salary">Salary:</label>
          <input
            value={salary}
            onChange={(e) => setSalaryAndLevel(e.target.value)}
            name="position"
            id="position"
          />
        </div>

        <div className="buttons">
          <button type="submit" disabled={disabled}>
            {employee ? "Update Employee" : "Create Employee"}
          </button>

          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    );

  }
};

export default EmployeeForm;
