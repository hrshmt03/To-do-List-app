import React, { useState,useEffect} from "react";
import ToDoList from "./ToDoList";

const getlocalitems=()=>{
  let list=localStorage.getItem('list');
  console.log(list);
  if(list)
  return JSON.parse(localStorage.getItem('list'));
  else
  return [];
}

const App=()=>{
  const[addItem,setAddItem]=useState("");
  const[Items,setItems]=useState(getlocalitems());
  const eventHandler=(event)=>{
setAddItem(event.target.value);
  };
  const addItems=()=>{
    setItems((oldItems)=>{
      return [...oldItems,addItem];
    })
    setAddItem('');
  };
  const deleteItem=(id)=>{
   setItems((items)=>{
     return items.filter((arr,index)=>{
    return id!==index;
     })
   })
  };
  //add data to local storage
  useEffect(() => {
   localStorage.setItem('list',JSON.stringify(Items));
  }, [Items]);
  
return(
  <>
<div className="m-div">
  <div className="mid-div">
    <br />
    <h1>ToDo List</h1>
    <br />
    <input type="text" placeholder="Add your Items" value={addItem} onChange={eventHandler}/>
    <button onClick={addItems}>+</button>
    <ul>
      {Items.map((val,index)=>{
        return <ToDoList key={index} id={index} onSelect={deleteItem} text={val}/>
      })}
    </ul>
  </div>
</div>
  </>
);
}

export default App;
