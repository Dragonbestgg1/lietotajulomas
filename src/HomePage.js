import React from 'react';
import "../src/styles/homePage.css";

var today = new Date()
var curHr = today.getHours()

if (curHr < 12) {
  console.log('good morning')
} else if (curHr < 18) {
  console.log('good afternoon')
} else {
  console.log('good evening')
}

function HomePage() {
  return (
    <div className='main-container'>
      {/* <h1>Welcome to the Home Page!</h1> */}
      <img src="https://images.pexels.com/photos/8532928/pexels-photo-8532928.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
      <div class="bottom-left">Labrīt ;)</div>
      {/* <img src="https://images.pexels.com/photos/3806690/pexels-photo-3806690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" /> */}
    </div>
  );
}

export default HomePage;
