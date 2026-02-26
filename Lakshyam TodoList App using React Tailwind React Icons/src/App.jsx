// this is App.jsx file  
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import LakshyamTitleLogo from './components/LakshyamTitleLogo';
import AnimatedBackground from './components/AnimatedBackground';
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
function App() {

  const [todo, setTodo] = useState("") // it will be a text
  const [todos, setTodos] = useState([]) // it will be a array
  const [showFinished, setShowFinished] = useState(true)


  // to avoid data lost on refreshing...
  // we save the data in localstorage...

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleToggle = () => {
    setShowFinished(!showFinished)
  }


  const handleAdd = () => {
    setTodos([...todos, { todo, id: uuidv4(), isCompleted: false }])
    console.log(todos)
    setTodo("")
    saveToLS()
  }
  const handleEdit = (id) => {
    let t = todos.filter(item => item.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos)
    saveToLS()
  }
  const handleRemove = (id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <><div className='h-[95vh]'>
      <AnimatedBackground/>
      <Navbar />
      <div className=" relative bg-[#111118] border border-white/[0.07] h-[87vh] md:w-[520px] w-[calc(100%-1rem)] my-2 mx-auto rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(120,80,255,0.12)] animate-fade-up">
        {/* ── Purple top glow ── */}
        <div className=" absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-24 bg-[radial-gradient(ellipse,rgba(120,80,255,0.35)_0%,transparent_70%)] pointer-events-none" />
        {/* ══════════ HEADER ══════════ */}
        <div className="relative px-6 pt-8 pb-5 text-center border-b border-white/[0.06]">
          <h1 className=" font-mono font-bold tracking-[6px] uppercase text-xl text-white flex items-center justify-center gap-3">
            <span className="text-violet-400 text-sm animate-spin [animation-duration:8s] text-[25px] ">✦</span>


            <LakshyamTitleLogo />



            <span className="text-violet-400 text-sm animate-spin [animation-duration:8s] [animation-direction:reverse] text-[25px] ">✦</span>
          </h1>


          {/* Progress bar */}
          {todos.length > 0 && (
            <div className="mt-4 flex flex-col items-center gap-1.5">
              <div className="w-56 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-teal-400 transition-all duration-500 shadow-[0_0_8px_rgba(120,80,255,0.6)]"
                  style={{ width: `${(todos.filter(t => t.isCompleted).length / todos.length) * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-white/20 tracking-widest">
                {todos.filter(t => t.isCompleted).length} / {todos.length} completed
              </span>
            </div>
          )}
        </div>

        {/* ══════════ INPUT ══════════ */}
        <div className="px-6 py-2 border-b border-white/[0.06]">
          <div className="flex gap-2">
            <input
              type="text"
              onChange={handleChange}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              value={todo}
              placeholder="What needs to be done?"
              className=" flex-1 bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 font-[Syne,sans-serif] outline-none transition-all duration-200 focus:border-violet-500/60 focus:shadow-[0_0_0_3px_rgba(120,80,255,0.15)]" />


            <span className='h-8'>
            <button 
              onClick={handleAdd}
              disabled={todo.length <= 3} className="w-30 bg-violet-600 hover:bg-violet-800 disabled:opacity-30 disabled:cursor-not-allowed text-gray-400 border border-purple-800 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
              <span className="bg-violet-800 shadow-purple-400 absolute -top-[150%] left-0 inline-flex w-full h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_4px_12px_rgba(0,0,0,0.25),0_0_20px_rgba(168,85,247,0.6)]"></span>
              Add
              <span className="text-base font-light leading-none">+</span>
            </button>
            </span>

            {/* <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-[0_4px_20px_rgba(120,80,255,0.4)] hover:-translate-y-px active:translate-y-0">
              Add
              <span className="text-base font-light leading-none">+</span>
            </button> */}
          </div>
        </div>

        {/* ══════════ TOGGLE ══════════ */}
        <div className="px-6 py-2 border-b border-white/[0.06]">
          <label className="flex items-center gap-2.5 cursor-pointer group select-none w-fit">
            <input
              type="checkbox"
              id="show"
              onChange={handleToggle}
              checked={showFinished}
              className="hidden "
            />
            {/* Custom checkbox */}
            <div className={`
        w-[18px] h-[18px] rounded-[4px] border flex items-center justify-center
        transition-all duration-200 text-white text-[11px]
        ${showFinished
                ? 'bg-violet-600 border-violet-600 shadow-[0_0_8px_rgba(120,80,255,0.5)]'
                : 'border-white/20 bg-transparent'
              }
      `}>
              {showFinished && '✓'}
            </div>
            <span className="text-[12px] text-white/40 group-hover:text-white/70 transition-colors tracking-wide">
              Show completed tasks
            </span>
          </label>
        </div>

        {/* ══════════ TODO LIST ══════════ */}
        <div className="px-6 py-3 h-[50%]">
          <h2 className="text-[10px] font-mono tracking-[3px] uppercase text-white/20 mb-3 h-[10%]">
            Your Tasks
          </h2>

          <div className=" flex flex-col gap-2 h-[90%] overflow-y-scroll pr-1 [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:bg-violet-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
            {/* Empty state */}
            {todos.length === 0 && (
              <div className="py-12 text-center">
                <div className="text-3xl opacity-20 mb-2 animate-bounce">◎</div>
                <p className="text-[12px] font-mono text-white/20 tracking-widest">No tasks yet</p>
              </div>
            )}

            {/* Todo items */}
            {todos.map((item, index) => {
              return (!item.isCompleted || showFinished) && (

                <div
                  key={item.id}
                  className={`h-[85%] group relative flex items-center gap-3 px-4 py-2 rounded-xl border transition-all duration-200 animate-slide-in ${item.isCompleted
                    ? 'bg-white/[0.02] border-white/[0.04] opacity-50'
                    : 'bg-white/[0.04] border-white/[0.07] hover:bg-white/[0.07] hover:border-violet-500/20 hover:translate-x-0.5'
                    }
            `}
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {/* Hover accent bar */}
                  <div className=" absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  {/* Checkbox */}
                  <label className="cursor-pointer flex-shrink-0">
                    <input
                      onChange={handleCheckBox}
                      name={item.id}
                      checked={item.isCompleted}
                      type="checkbox"
                      className="hidden"
                    />
                    <div className={` w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-250 text-[#0a0a0f] text-[11px] font-bold ${item.isCompleted
                      ? 'bg-teal-400 border-teal-400 shadow-[0_0_10px_rgba(0,229,204,0.4)]'
                      : 'border-white/20 hover:border-violet-400'
                      }
              `}>
                      {item.isCompleted && '✓'}
                    </div>
                  </label>

                  {/* Text */}
                  <span className={`
              flex-1 text-sm transition-all duration-200 break-words
              ${item.isCompleted ? 'line-through text-white/25' : 'text-white/85'}
            `}>
                    {item.todo}
                  </span>

                  {/* Action buttons — visible on hover */}
                  <div className=" flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className=" w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-violet-400 hover:border-violet-500/50 hover:bg-violet-500/10 transition-all duration-150">
                      <MdEdit size={15} />
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className=" w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-150">
                      <MdDelete size={15} />
                    </button>
                  </div>
                </div>
              )
            })}

          </div>
        </div>
      </div>











      {/*       
      <div className="main bg-teal-300 md:w-1/2 my-4 p-4 md:mx-auto mx-2 text-black h-[90vh] rounded-[10px]">
        <div className="addTodo w-full">
          <h1 className='font-bold text-xl flex'>लक्ष्यम् - Manage Your Todos At One Place</h1>
          <div className='flex flex-col justify-center'>
            <input type="text" onChange={handleChange} value={todo} className='text-center my-2 w-full flex justify-center py-1 items-center rounded-full px-2' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='add-btn py-1 bg-teal-500 rounded-md  text-white py-auto hover:bg-teal-600 mx-1 px-2'>Add</button>
          </div>
        </div>
        <div className="show-finished my-2">
          <input type="checkbox" id='show' onChange={handleToggle} checked={showFinished} />
          <label className='mx-1' htmlFor="show">Show Finished</label>
          <div className='h-[1px] bg-black my-1 opacity-[0.3] mx-auto w-[90%]'></div>
        </div>
        <h2 className='font-bold'>Your Todos</h2>
        <div className="todo-list-container todo-box overflow-scroll overflow-x-hidden h-[70%]">
          {todos.length == 0 && <div className='noTodos m-4'>No Todos to display</div>}

          {todos.map(item => {
            return (!item.isCompleted || showFinished) && <div className=" flex my-2 w-full justify-between bg-teal-200 py-2 rounded-md">
              <div className='flex mx-2 item-center md:w-[85%] w-[65%]'>
                <input onChange={handleCheckBox} name={item.id} value={item.isCompleted} type="checkbox" className={item.isCompleted ? "line-through" : ""} />
                <div className={item.isCompleted ? "line-through mx-2" : "mx-2"}>{item.todo}</div>
              </div>
              <div className='btn mx-1 ml-auto md:w-[15%] w-[35%]'>
                <button onClick={() => { handleEdit(item.id) }} className=' w-8 bg-teal-500 rounded-md text-white py-auto hover:bg-teal-600 mx-1 px-2 h-full'><MdEdit /></button>
                <button onClick={() => { handleRemove(item.id) }} className=' w-8 bg-teal-500 rounded-md text-white py-auto hover:bg-teal-600 mx-1 px-2 h-full'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div> */}


    </div>
    </>
  )
}

export default App
