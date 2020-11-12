import React from "react";
import FixedContainer from "../FixedContainer";
import Input from "../Login/Input";

export default function Register(props) {
  const middle = {
    margin: "auto",
  };
  return (
    <FixedContainer displayType='return'>
     <div style={{display: 'flex',flexDirection:'column',alignItems:'center',height:'65vh',justifyContent:'center'}}>
      <div style={{ textAlign: 'center', fontSize: '1.5em' }}>Register</div>
      <form style={{color:'white',padding:'0px 5px',textAlign:'center'}}>
        <Input
          placeholder="Username"
          name="username"
        ></Input>
        <Input
          placeholder="Password"
          name="password"
        ></Input>
        <Input
          placeholder="Email"
          name="email"
        ></Input>
        
         <input type="submit" value="Register" style={{marginTop:'50px',backgroundColor: '#54BEF5',padding: '5px',border:'none',color:"white",width:'28vw',height:'4vh'}}/>
     
      </form>
      </div>
    </FixedContainer>
  );
}
