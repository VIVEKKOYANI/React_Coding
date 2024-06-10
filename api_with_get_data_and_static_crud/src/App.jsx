import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [allData, setAllData] = useState([]);
  const [editData, setEditData] = useState({ id: '', editFlag: false, data: '' });
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTodosData();
  }, []);

  const fetchTodosData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();
    setAllData(data);
  };

  const handleChange = (e, id) => {
    const newData = allData.map((item) => {
      if (item.id === id) {
        return { ...item, title: e.target.value }
      }
      return { ...item }
    });
    setAllData(newData);
  };

  const handleUpdate = () => {
    setEditData({ id: '', editFlag: false, data: '' });
  };

  const itemsPerPage = 10;
  const currentPageData = allData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>id</td>
            <td>title</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item) => (
            editData.id !== item.id ?
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>
                  <button onClick={() => setEditData({ ...editData, id: item.id, editFlag: true })}>Edit</button>
                </td>
                <td>
                  <button onClick={() => setAllData(allData.filter((list) => list.id !== item.id))}>delete</button>
                </td>
              </tr>
              :
              <tr key={item.id}>
                <td>{item.id}</td>
                <td><input type="text" value={item.title} onChange={(event) => handleChange(event, item.id)} /></td>
                <td>
                  <button onClick={handleUpdate}>Update</button>
                </td>
                <td>
                  <button onClick={() => setAllData(allData.filter((list) => list.id !== item.id))}>delete</button>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setPage(page > 1 ? page - 1 : page)}>Previous</button>
        <button onClick={() => setPage(page < Math.ceil(allData.length / itemsPerPage) ? page + 1 : page)}>Next</button>
      </div>
    </div>
  );
}

export default App;
