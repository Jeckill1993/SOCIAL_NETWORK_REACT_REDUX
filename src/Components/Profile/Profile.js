import React from 'react';
import classes from './Profile.module.css';
import MyPostsContainer from './Myposts/MyPostsContainer.js'



const Profile = (props) => {
  return (
    <div>
      <img className={classes.main_photo} src="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="main-photo"></img>
      <div>
        <img id={classes.avatar} src="https://ah.net.ua/wa-data/public/shop/products/84/54/5484/images/8405/8405.970.png" alt="avatar"></img>
        <div>
          <h3>Tribolonotus gracilis</h3>
          <section>
            Date of Birth: 7 April
              <br></br>
            City: Melnburn
              <br></br>
            Education: None
              <br></br>
            Web Site: https://naked-photo.com
            </section>
        </div>
        <MyPostsContainer />
      </div>
    </div>
  )
}

export default Profile;