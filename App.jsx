import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

const Page = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [table, setTable] = useState([]);

  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTable((prev)=>{
        return [...prev,...storedTasks]
      });
    }
  }, []);

  // Save tasks to local storage whenever the table state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(table));
  }, [table]);

  function setVal(e) {
    if (e.target.id === 'title') {
      setTitle(e.target.value);
    } else {
      setDesc(e.target.value);
    }
  }

  function addTask(e) {
    e.preventDefault();
    if (title.trim() !== '' && desc.trim() !== '') {
      setTable((prev) => [...prev, { Title: title, Desc: desc, id: uuid() }]);
    }
    if(title.trim() === '' || desc.trim() === ''){
      alert("Todo Title and Description can't be empty.")
    }
    setTitle('');
    setDesc('');
  }

  function deleteTask(id) {
    setTable((prev) => prev.filter((element) => element.id !== id));
  }

  return (
    <>
      <h1 className='bg-zinc-900 text-white text-5xl py-5 text-center font-bold w-screen'>Todo List App - By Anant</h1>
      <form className='flex flex-col w-screen md:flex-row'>
        <textarea
          suppressHydrationWarning
          type='text'
          id='title'
          className=' border-zinc-800 border-4 text-2xl px-4 py-2 m-8 rounded'
          placeholder='Enter Title Here'
          onChange={setVal}
          value={title}
        ></textarea>
        <textarea
          suppressHydrationWarning
          type='text'
          id='desc'
          className=' border-zinc-800 border-4 text-2xl px-4 py-2 m-8 rounded'
          placeholder='Enter Description Here'
          onChange={setVal}
          value={desc}
        ></textarea>
        <button
          suppressHydrationWarning
          className='bg-zinc-900 px-4 py-3 font-bold text-2xl rounded text-white m-10 hover:bg-zinc-800'
          onClick={addTask}
        >
          Add Task
        </button>
      </form>
      <table className='w-full border-collapse border border-gray-300 table-fixed'>
        <thead className='bg-gray-200'>
          <tr>
            <th className='border border-gray-300 py-2 px-4'>Title</th>
            <th className='border border-gray-300 py-2 px-4'>Description</th>
            <th className='border border-gray-300 py-2 px-4'>Delete</th>
          </tr>
        </thead>
        <tbody key={uuid()}>
          {table.map((element, index) => {
            return (
              <tr key={element.id || index}>
                <td className='border border-gray-300 py-2 px-4 text-center font-bold overflow-auto'>{element.Title}</td>
                <td className='border border-gray-300 py-2 px-4 text-center overflow-auto'>{element.Desc}</td>
                <td className='border border-gray-300 py-2 px-4 text-center'>
                  <button
                    className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
                    onClick={() => {
                      deleteTask(element.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Page;