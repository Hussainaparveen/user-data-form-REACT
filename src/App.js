import React, { useState } from "react";

function App() {

  const [userData, setuserData] = useState({ username: "", mobileno: "", designation: "" })
  const [userList, setUserList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [searchValue, setSearchValue] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setuserData({ ...userData, [name]: value });
  }

  function handleClick(e) {
    e.preventDefault();

    if (editIndex !== -1) {
      const newList = [...userList];
      newList[editIndex] = userData;
      setUserList(newList);
      setEditIndex(-1);
    }
    else {
      const userInput = { ...userData };
      setUserList(userList.concat(userInput));
    }

    setuserData({ username: "", mobileno: "", designation: "" });
  }

  function handleEdit(index) {
    setEditIndex(index);
    setuserData({ ...userList[index] });
  }

  function handleDelete(index) {
    const delList = [...userList]
    delList.splice(index, 1);
    setUserList(delList);
  }

  const filterBySearch = userList.filter((user) =>
    user.username.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <div>
      <form>
        <h1>user information</h1>
        <input type="text" name="username" value={userData.username} placeholder="write your name" onChange={handleChange} />
        <input type="text" name="mobileno" value={userData.mobileno} placeholder="write your mobileno" onChange={handleChange} />
        <input type="text" name="designation" value={userData.designation} placeholder="write your designation" onChange={handleChange} />

        <button onClick={handleClick}>submit</button>

        <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="search" />
        {filterBySearch.map(function (value, index) {
          return (
            <div key={index}>
              <p>username:{value.username}</p>
              <p>mobileno:{value.mobileno}</p>
              <p>designation:{value.designation}</p>
              <p>array index:{index}</p>
              <button type="button" onClick={() => handleEdit(index)}>edit</button>
              <button type="button" onClick={() => handleDelete(index)}>delete</button>
            </div>
          );
        })}
      </form>
    </div>
  )
      
}

export default App

