import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "./EquipmentTable/EquipmentTable";
import { useNavigate } from "react-router-dom";

const fetchEquipments = () => {
  return fetch("/api/equipments").then((res) => res.json());
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipments/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EquipmentList = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [equipments, setEquipments] = useState([]);
  const [whichSearch, setWhichSearch] = useState("Name")
  const [copy, setCopy] = useState(null)

  const handleDelete = (id) => {
    deleteEquipment(id);

    setEquipments((equipments) => {
      return equipments.filter((equipment) => equipment._id !== id);
    });
  };

  useEffect(() => {
    fetchEquipments()
      .then((equipments) => {
        setLoading(false);
        setEquipments(equipments)
        setCopy(equipments);
      })
  }, []);

  function handleInput(event) {
    if(whichSearch === "type"){
        const sortedToolEquipment = copy.filter(tool => tool.type.toUpperCase().includes(event.target.value.toUpperCase()))
        setEquipments(sortedToolEquipment)
    }
    if(whichSearch === "name"){
        const sortedNameEquipment = copy.filter(tool => tool.name.toUpperCase().includes(event.target.value.toUpperCase()))
        setEquipments(sortedNameEquipment)
    }
}

  const handleRedirect = () => {
    navigate('/'); 
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <select id="whichSearch" onChange={(event) => setWhichSearch(event.target.value)}>
        <option value="name">Name</option>
        <option value="type">Type</option>
      </select>
      <button id="equip"  onClick={handleRedirect}>Employees</button>
      <input id="search" placeholder="search" onInput={handleInput} />
      {/* <Autocomplete /> */}
      <EquipmentTable equipments={equipments} onDelete={handleDelete} />
    </>
  )
};

export default EquipmentList;
