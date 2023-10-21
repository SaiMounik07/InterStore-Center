import { useState } from 'react';
import './home.css';
function Home(){

   var userNames=localStorage.getItem('userName').replace("@gmail.com","");
   var role=localStorage.getItem('role');
    return(
      <div >
      <div className="tables">Home</div>
      <div className='messages'>
        Welcome<br/>
      {userNames}!<br></br>
      To the {role} panel
      </div>

  </div>
      
    );
}
export default Home;