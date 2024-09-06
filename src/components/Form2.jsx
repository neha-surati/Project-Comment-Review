import { useEffect, useState } from "react"


function Form2() {

  let[student,setStudent]=useState({});
  let[list,setList]=useState([]);
  let[index,setIndex]=useState(-1);
  let[error,setError]=useState({});
  let[hobby,setHobby]=useState([]);


useEffect(()=>{
  let oldlist=JSON.parse(localStorage.getItem('studentlist'))
  setList(oldlist) 
},[])

  let handleChange=(e)=>{
    e.target.style.fontSize="30px"
    e.target.style.color="yellow"

  }
  let handleInput=(e)=>{
    let {name,value}=e.target
    let newHobby=[...hobby]
    if(name== "hobby"){
        if(e.target.checked){
            newHobby.push(value);
        }
        else{

            let pos=newHobby.findIndex((v,i)=>v== value);
            newHobby.splice(pos,1);
        }
        value=newHobby
        console.log(newHobby);
        

    }
    setHobby(newHobby);
    setStudent({...student,[name]:value})
    console.log(student);

  }
  let validationForm=()=>{
    let tempErrors={};
    if(!student.id)tempErrors.id="Id is required.";
    if(!student.name)tempErrors.name="name is required.";
    if(!student.email)tempErrors.email="email is required.";
    else if(!/\S+@\S+\.\S+/.test(student.email))tempErrors.email="Email is required."
    if(!student.password)tempErrors.password="password is required.";
    if(!student.gender)tempErrors.gender="gender is required.";
    if(!student.city)tempErrors.city="city is required.";
     if(!student.address)tempErrors.address="address is required.";
    setError(tempErrors);
    return Object.keys(tempErrors).length  === 0;

  };

  let handleSubmit=(e)=>{
    e.preventDefault();

    // if(!validationForm()) return;
    let newlist;
    if(index != -1){
      list[index]=student;
      newlist=[...list]
      setIndex(-1);
    }
    else{
      newlist=[...list,student]
    }
    setList(newlist);
     localStorage.setItem('studentlist',JSON.stringify(newlist))
    setStudent({})
  }
  let deletData=(pos)=>{
    let oldlist=JSON.parse(localStorage.getItem('studentlist'));
    oldlist.splice(pos,1)
     localStorage.setItem('studentlist',JSON.stringify(oldlist))
    setList(oldlist)
  }
  let editData=(pos)=>{
    let editstud=list[pos];
    console.log(editstud);
    setStudent(editstud);
    setIndex(pos);
    setHobby(editstud.hobby)
  }

  return (
    <>
     <h2 style={{textAlign:"center"}}  onClick={(e)=>handleChange(e)}>Student Registration</h2>
     <form method="post" onSubmit={(e)=>handleSubmit(e)}>
     <table align="center" border={1}>
      <tbody>
      <tr>
        <td>
          Id
        </td>
        <td><input type="text" name="id" value={student.id ? student.id: ""} onChange={(e)=>handleInput(e)}/>
        {error.id ?<span style={{color:"red"}}>{error.id}</span>:null}
        </td>
      </tr>
        <tr>
          <td>Name</td>
          <td><input type="text" name="name" value={student.name ? student.name: ""} onChange={(e)=>handleInput(e)}/>
          {error.name ?<span style={{color:"red"}}>{error.name}</span>:null}
          </td>
        </tr>
        <tr>
          <td>Email</td>
          <td><input type="email" name="email"  value={student.email ? student.email: ""} onChange={(e)=>handleInput(e)}/>
          {error.email?<span style={{color:"red"}}>{error.email}</span>:null}</td>
        </tr>
        <tr>
        <td>Hobby</td>
            <td>
                <input type="checkbox" name="hobby" value="dance" onChange={handleInput} checked={hobby.includes('dance')?"checked":""}/>Dance
                <input type="checkbox" name="hobby" value="Read" onChange={handleInput} checked={hobby.includes('Read')?"checked":""}/>Read
                <input type="checkbox" name="hobby" value="Write" onChange={handleInput} checked={hobby.includes('Write')?"checked":""}/>Write
                <input type="checkbox" name="hobby" value="Yoga" onChange={handleInput} checked={hobby.includes('Yoga')?"checked":""}/>Yoga
            </td>
        </tr>
     
      
    
        <tr>
          <td></td>
          <td><input type="submit" value={index != -1 ? "Edit Data" : "Add Data"}></input></td>
        </tr>
      </tbody>
     </table>
     </form>

     <br/> <br/>
     
     <table align="center" border={1}>
      <tbody>
        <tr>
        <td>Id</td>
          <td>Name</td>
          <td>Email</td>
          <td>Hobby</td>
          <td>Action</td>
        </tr>
        {list.map((v,i)=>{
          return(
            <tr key={i}>
            <td>{v.id}</td>
              <td>{v.name}</td>
              <td>{v.email}</td>
              <td>{v.hobby ?v.hobby.toString():"No Hobby."}</td>
             
              <td>
              <button onClick={()=>deletData(i)}>Delete</button>
              ||
              <button onClick={()=>editData(i)}  >
                Edit
              </button> </td>
              
            </tr>
          )
        })}
      </tbody>
     </table>

    </>
  )
}

export default Form2
