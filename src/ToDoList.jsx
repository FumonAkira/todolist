import React,{useState,useRef,useEffect} from 'react'

function ToDoList() {
    const [check,setCheck] = useState(false);
    const [lists,setLists] = useState(["Eg: I have to eat with my Friends"])
    const [inputValue,setInputValue] = useState("");
    function submitHandle(e){
        e.preventDefault()
        addHandle()
    }
    function inputHandle(e){
        setInputValue(e.target.value);
    }
    useEffect(()=>{
        if(lists.length>4){
            setCheck(!check);
        }
    },[lists.length>5])
    function addHandle(){
        if(inputValue===""){
            return;
        }
        setLists(l=>[...l,inputValue]);
        setInputValue("");
    }
    function removeList(index){
        setLists(lists.filter((_,i)=>i !== index));
        if(lists.length<6){
            setCheck(false);
        }
    }
    function moveUpHandle(index){
        if(index>0){
            const updatedLists = [...lists];
        [updatedLists[index],updatedLists[index-1]] = [updatedLists[index-1],updatedLists[index]];
        setLists(updatedLists)
        }
    }
    function moveDownHandle(index){
        if(index<lists.length-1){
            const updatedLists = [...lists];
        [updatedLists[index],updatedLists[index+1]] = [updatedLists[index+1],updatedLists[index]];
        setLists(updatedLists)
        }
    }
    function rewriteHandle(index){
        setInputValue(lists[index]);
        removeList(index);
    }
  return (
    <div className='container-fluid bg-dark min-vh-100 d-flex justify-content-center align-items-center'>
        <div style={{height:"640px",width:"420px"}} className='row'>
            <div className='bg-light border border-2 rounded-5'>
                <h1 className=' text-center p-4 fw-bolder'>TO Do List</h1>
                <form onSubmit={submitHandle}  className='submit d-flex justify-content-center gap-3 mb-3'>
                    <input className=' w-75 py-2 px-4 form-control' type='text' value={inputValue} onChange={inputHandle}/>
                    <button type='button' className='btn btn-danger' onClick={addHandle}>Add</button>
                </form>
                <ul className={check ? "to-do-list me-4 p-3 rounded":"me-1 p-2 rounded"} style={{listStyle:"none",width:"100%",height:"500px"}}>
                    {lists.map((list,index)=>{
                        return(<li className='row overflow-hidden list border border-1 rounded-2 d-flex justify-content-between align-items-center me-2 mb-2 p-2' key={index}>
                            <span className=' col-md-7 to-do-name'>{index+1}. {list}</span>
                            <span className='d-flex gap-1 col-md-5'>
                            <i onClick={()=>removeList(index)} className='bx bx-trash p-1 rounded-circle'></i>
                            <span className='up-down d-flex align-items-center me-2'>
                            <i onClick={()=>rewriteHandle(index)} className='bx bxs-message-square-edit p-1 rounded-circle'></i>
                            <i onClick={()=>moveUpHandle(index)} className='bx bx-up-arrow-alt p-1 rounded-circle'></i>
                            <i onClick={()=>moveDownHandle(index)} className='bx bx-down-arrow-alt p-1 rounded-circle' ></i>
                            </span>
                            </span>
                        </li>)
                    })}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default ToDoList
