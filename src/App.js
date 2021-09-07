
import './App.css';
import {useState} from "react"

function App() {
  const [todo,setTodo]=useState("")
  const  [error,setError]=useState({
    textarea:""
  })
  const [todos,setTodos]=useState([
    {
      id:1,
      desc:"clean my room",
  date:new Date("september,07,21"),
  completed:true
    },
    {
      id:2,
      desc:"Prepare for  viva",
  date:new Date("september,08,21"),
  completed:false
    }
  ])
//instead of getting event ,destructuring the event object  
    let handleChange =({target:{name,value,type}})=>{
      setTodo(value)
      // console.log(name,value,type)
 
      const regex=new RegExp(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g);
      // const regex=new RegExp(/^[a-zA-Z0-9 ]/g);
   if(value.length<15 || value.length>=20 ){
    setError({...error,textarea:"words limit 15-20"})
    // console.log(error.textarea)
   }
    else if(!regex.test(value))
    {console.log("in regex")
      setError({...error,textarea:"should not use special characters"})
      
    }
    else{
      setError({...error,textarea:""})
    }
  }
 
let handleSubmit=(event)=>{
  console.log("in")
event.preventDefault();
console.log(todo)
let obj={
  desc:todo,
  date:new Date(),
  completed:false
}
setTodos([...todos,obj])
setTodo("")
console.log(todos)
}

let changeState=(a)=>{
a.completed= !a.completed
  setTodos([...todos])
}

  return (
    <div className="App">
     <form onSubmit={handleSubmit}>
       <label ><h3>Add To-Do activity</h3></label>
       <textarea name="todo" value={todo} onChange={handleChange} rows="2"  ></textarea>
       <span>{error.textarea}</span>
       <div><button type="submit">Add</button></div>
     </form>
     <div className="list">
       <h2>To-Do List</h2>
       <div className="listItem">
         <ol>
         {todos.map(a=>{
          
           let btn;
           if(a.completed)
           btn=<i className="fas fa-check-circle tick"></i>
           else
           btn=<i className="fas fa-times-circle wrong"></i>
           return <li key={a.desc.toString()}>
             <span className="btn" onClick={()=>changeState(a)}><h3>{btn}</h3></span>
             <span className="desc">{a.desc}</span>
              <span className="date">{a.date.toDateString()}</span> 
             </li>
         })}
         </ol>
       </div>
     </div>
    </div>
  );
}

export default App;
