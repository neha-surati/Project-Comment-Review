import { useEffect, useState } from "react"


function Form() {

  let[student,setStudent]=useState({});
  let[list,setList]=useState([]);
  let[index,setIndex]=useState(-1);
  let[error,setError]=useState({});

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

    if(!validationForm()) return;
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
          <td>Password</td>
          <td><input type="password" name="password"  value={student.password ? student.password: ""} onChange={(e)=>handleInput(e)}/>
          {error.password ?<span style={{color:"red"}}>{error.password}</span>:null}</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td><input type="radio" name="gender" value="male" checked={student.gender == "male"} onChange={(e) => handleInput(e)} id="" /> Male
          <input type="radio" name="gender" value="female" checked={student.gender == "female"} onChange={(e) => handleInput(e)} id="" /> FeMale
          {error.gender ?<span style={{color:"red"}}>{error.gender}</span>:null}
          </td>
        </tr>
        <tr>
          <td>City</td>
          <td>
            <select name="city" id="" value={student.city || ""} onChange={(e) => handleInput(e)} >
            <option value="">Select City</option>
                  <option value="surat">Surat</option>
                  <option value="Baroda">Baroda</option>
                  <option value="Vapi">Vapi</option>
            </select>
            {error.city ?<span style={{color:"red"}}>{error.city}</span>:null}
          </td>
        </tr>
        <tr>
          <td>Adress</td>
          <td>
          <textarea rows={3} cols={20} name="address" value={student.address || ""} onChange={(e) => handleInput(e)} id="" />
          {error.address ?<span style={{color:"red"}}>{error.address}</span>:null}
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
          <td>Password</td>
          <td>Gender</td>
          <td>City</td>
          <td>Adress</td>
          <td>Action</td>
        </tr>
        {list.map((v,i)=>{
          return(
            <tr key={i}>
            <td>{v.id}</td>
              <td>{v.name}</td>
              <td>{v.email}</td>
              <td>{v.password}</td>
              <td>{v.gender}</td>
              <td>{v.city}</td>
              <td>{v.address}</td>
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

export default Form
