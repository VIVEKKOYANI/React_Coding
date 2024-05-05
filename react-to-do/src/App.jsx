import { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import "./App.css";

const localData = () => {
  let list = localStorage.getItem('data');
  if(list){
    return JSON.parse(localStorage.getItem("data"))
  }else{
    return [];
  }
}

function App() {
  const [input, setInput] = useState("");
  const [item, setItem] = useState(localData());
  const [togglebtn, setToggleBtn] = useState(true);
  const [isEdit, setIsEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(item));
  }, [item]);

  const itemsAdded = () => {
    if (!input) {
      alerit("pls filled somrthing into input box");
    }else if(input && !togglebtn){
      setItem(item.map((ele) => {
        if(ele.id === isEdit){
          return {...ele, name: input}
        }
        return ele;
      }))
      setToggleBtn(true);
      setInput('');
      setIsEdit(null);
    } else {
      const inputData = { id: new Date().getTime().toString(), name: input}
      setItem([...item, inputData]);
      setInput("");
    }
  };

  const editData = (id) => {
    const newData = item.find((value) => value.id === id);
    setInput(newData.name);
    setToggleBtn(false);
    setIsEdit(id);
  }

  const deleteData = (id) => {
    const updateItem = item.filter((value) => value.id !== id)
    setItem(updateItem)
  }
  return (
    <div className="bg-[#061525] w-[100%] h-[100vh] flex flex-col justify-center">
      <div className="w-[400px] h-[60px] flex">
        <input
          type="text"
          value={input}
          className="w-[300px] h-[60px] ml-[6rem] rounded-lg"
          onChange={(e) => setInput(e.target.value)}
        />
        {togglebtn ? 
        <GrAdd
          className="bg-white mt-4 ml-[-2rem] text-[1.3rem]"
          onClick={itemsAdded}
        />:
        <AiFillEdit
          className="bg-white mt-4 ml-[-2rem] text-[1.3rem]"
          onClick={itemsAdded}
        />
      }
      </div>
      <div>
        {item.map((val) => (
          <div className="text-white font-semibold bg-[#101298] w-[300px] h-[60px] mt-[2rem] ml-[6rem] rounded-lg p-4 flex justify-between">
            <h1>{val.name}</h1>
            <AiFillDelete onClick={() => deleteData(val.id)} />
            <AiFillEdit className="ml-[-10rem]" onClick={() => editData(val.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;