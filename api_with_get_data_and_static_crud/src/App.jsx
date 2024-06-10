import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [allData, setAllData] = useState([]);
  const [editData, setEditData] = useState({id: '', editFlag: false, data: ''});

  useEffect(() => {
    fetchTodosData();
  }, []);

  const fetchTodosData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();
    setAllData(data);
    console.log("data9090909", data);
  };

  const handleChange = (e, id) => {
    const newData = allData.map((item) => {
      if(item.id === id){
        return {...item, title: e.target.value}
      }
      return {...item}
    })
    setAllData(newData)
  }

  const handleUpdate = () => {
    setEditData({id: '', editFlag: false, data: ''});
  }

  return (
    <table>
      <thead>
        <tr>
          <td>id</td>
          <td>title</td>
          <td>Edit</td>
        </tr>
      </thead>
      <tbody>
        {allData.map((item) => {
          return (
            editData.id !== item.id  ?
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>
                <button onClick={() => setEditData({...editData, id: item.id, editFlag: true})}>Edit</button>
              </td>
            </tr>
            : 
            <tr key={item.id}>
              <td><td>{item.id}</td></td>
              <td><input type="text" value={item.title} onChange={(event) => handleChange(event, item.id)} /></td>
              <td>
                <button onClick={handleUpdate}>Update</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default App;