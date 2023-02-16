import React, {useEffect, useState} from 'react';
import  {  animated,  useSpring }  from  'react-spring';
import Phaser from "phaser";




const App1 = ({currMessage}) => {
    const [list, setList] = useState([]);
    const [input, setInput] = useState("");
    const [currTodo, setCurrTodo] = useState({id:0, todo:""});
    //const [clist, setcList] = useState([]);
    const [point, setPoint] = useState(0);
    const [descInp, setDescInp] =  useState("");
    const [desc, setDesc] = useState({did:0, de:"", show: false});

    const [delist, setdeList] = useState([]);
    const[showD, setShowD] = useState(false);
    const[don, setDon] = useState(false);
    const [otherInp, setOther] = useState("");
    const [thought, setThought] = useState([]);
    const [textColor, setTextColor] = useState('black');
    const[aff, setAff] = useState("");
    
    const bEvent = new CustomEvent('button');
    //window.dispatchEvent('button');

  
    const addTodo = (todo) => {
      const newTodo = {
        id: Math.random(),
        todo: todo,
      };

      setCurrTodo(newTodo);
      // add the todo to the list
      setList([...list, newTodo]);
      // clear input box
      setInput("");
      //setDate("");
    };

    const deleteTodo = (id) => {
      // Filter out todo with the id
      const newList = list.filter((todo) => todo.id !== id);
      setList(newList);
      
      // const nList = clist.filter((todo) => todo.id !== id);
      // setcList(nList);

      setdeList([]);
    };

    const completeTodo = (id) => {
      // Filter out todo with the id
      const newList = list.filter((todo) => todo.id !== id);

      //custom heart
      
      setList(newList);
      setPoint(point + 1);

      if (point%3 === 0 && point > 2){
        setAff(aff + '\u2764');

        const mEvent = new CustomEvent('meow');
        window.dispatchEvent(mEvent);
      }
      else{
        const dEvent = new CustomEvent('ding');
        window.dispatchEvent(dEvent);
      }
    };



    /*const addDesc = (desc) => {
      const newDesc = {did: Math.random(), desc:desc, show: false};

      setDesc(newDesc);
      //setCurrTodo({d:newDesc});
      setdeList([...delist, newDesc]);
      setDescInp('');
      //setList([...list, newDesc]);
    }

    const deleteDesc = (did) => {
      //const ndList = delist.filter((desc) => desc.did !== did);

      setdeList([]);
      //console.log('meow')
    }*/

    const doneClick = () => {
      window.dispatchEvent(bEvent);
      currMessage = 1;
      if (!don){
        setDon(true);
        const cEvent = new CustomEvent('new-dialog', {detail: {currMessage},});
        dispatchEvent(cEvent);
      }
      else{
        setDon(false);
      }
      
    }

    const clice = () => {
      window.dispatchEvent(bEvent);

      !desc.show ?setDesc({show: true}) :setDesc({show:false})
      !showD 
      ?setShowD(true) //setDesc({}) 
      : setShowD(false)
    }

    const otherClick = (inp) => {
      window.dispatchEvent(bEvent);
      !showD 
      ?setShowD(true) //setDesc({}) 
      : setShowD(false)

      setThought([...thought, inp]);
      setOther("")
    }

    const finish = () => {
      window.dispatchEvent(bEvent);

      const customEvent = new CustomEvent('endscene');
      window.dispatchEvent(customEvent);

      const cEvent = new CustomEvent('finish');
      window.dispatchEvent(cEvent);
    }

    return(
          <div>

            <header className="head">
    
              <div className="PointBox" >
                Points: <div style={{color:textColor}}>{point} </div>   
                Affection: {aff}
              </div>
          
              <input
                  type="text"
                  name="todo"
                  placeholder = "enter a task..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
              />
              <button id = "add" onClick={() => {addTodo(input); window.dispatchEvent(bEvent);}} style={{ cursor: 'pointer'}}>Add</button>
            
            </header>

            <div className="lists">
              <h1>Todo List</h1>
              <ul>
                {list.map((todo) => (
                  <li key={todo.id}>
                      {todo.todo}
                
                      <button onClick={() => deleteTodo(todo.id)}>&times;</button>
                      <button onClick={() => {completeTodo(todo.id); setTextColor('#9072fc')}}>done</button>

                      {/* {desc.show 
                        ? 
                        <>
                          <input 
                          value={descInp}
                          placeholder = "add a description..."
                          onChange={(i) => setDescInp(i.target.value)}
                          />
                          <button onClick={() => addDesc(descInp)}>enter</button>
                          {delist.map((desc) => (
                          <ol>
                              <li key={desc.did}>
                              {desc.desc}
                              <button onClick={() => deleteDesc(desc.did)}>&times;</button>
                              </li>
                          </ol>
                          ))}
                        </>
                        : null
                      } */}
                    </li>
                  ))}
              </ul>
            </div>
            <div className='buttons'>
              {!don
                ?<button onClick={doneClick}>done</button>
                :<>
                  <button onClick={finish}>Finish for Today</button>
                  <button onClick={clice}>Other Goals</button>
                </>
              }
            </div>
            {showD
              ? <div className='goal'>
                  <input
                  className='goalbox'
                  value={otherInp}
                  placeholder= "meow"
                  onChange = {(i) => setOther(i.target.value)}
                  />
                  <button onClick={() => otherClick(otherInp)} className='buttons' style={{right: 310}}>Enter</button>
                  
                </div>
              :null
            }
            {thought !== ""
              ?<div className='thoghtbox'><h2>Other Thoughts/Goals:</h2>  {thought} </div>
              :null
            }
            
          </div>
    );
}



export default App1;