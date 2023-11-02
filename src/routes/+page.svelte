<div class="banner">
    <div class="navbar">
        <img src="healthlink.png" class="logo" />
        <ul>
            <li><a href="#">Log in</a></li>
            <li><a href="#">Sign up</a></li>
        </ul>
    </div>

    <div class="content">
        <h1>Affordable health-care at your Fingertips</h1>
        <div>
            <button type="button"><span />CHAT NOW</button>
            <button type="button"><span />BOOK AN APPOINTMENT</button>
        </div>
    </div>

    
</div>
<!-- <img src="phone_chat_blue.png" class="pic1" /> -->
<div class="pg2">
    <h1>How do we do it?</h1>
    <div class="feature">
        <div><img src="feat_img1 (2).png" class="feat_img" /></div>
        <div>
            <h2>
                Hello and warm welscome to our veoigfute website ad a i doiwnt
                knwo what i am doing. Hello hello what are pu doing i myself
                dont know.
            </h2>
        </div>
    </div>
    <!-- <img src="arrow-4.png" class="pic2"> -->
    <div class="feature">
        <div>
            <h2>
                Hello and warm welscome to our veoigfute website ad a i doiwnt
                knwo what i am doing. Hello hello what are pu doing i myself
                dont know.
            </h2>
        </div>
        <div><img src="feat_img2 (2).png" class="feat_img" /></div>
    </div>
    <!-- <img src="arrow-4.png" class="pic3"> -->
    <div class="feature">
        <div><img src="feat_img3 (2).png" class="feat_img" /></div>
        <div>
            <h2>
                Hello and warm welscome to our veoigfute website ad a i doiwnt
                knwo what i am doing. Hello hello what are pu doing i myself
                dont know.
            </h2>
        </div>
    </div>
</div>

<div class="pg3">
  <h1>What have we done so far?</h1>
  <div class="Testimonials">
    <div class="person">
      <div><img src="test_img1.jpg" class="test_img"></div>
      <div><p>These guys are the best, they do their work so  wonderfully well  and ther work is so s so satisfying.  am genuinely satisfied.</p></div>
      <div><h3>Salmon Salmon</h3></div>
      <div><h4>Marketing- Amazon productions</h4></div>
    </div>

    <div class="person">
        <div><img src="test_img1.jpg" class="test_img"></div>
        <div><p>These guys are the best, they do their work so  wonderfully well  and ther work is so s so satisfying.  am genuinely satisfied.</p></div>
        <div><h3>Salmon Salmon</h3></div>
        <div><h4>Marketing- Amazon productions</h4></div>
    </div>

    <div class="person">
         <div><img src="test_img1.jpg" class="test_img"></div>
         <div><p>These guys are the best, they do their work so  wonderfully well  and ther work is so s so satisfying.  am genuinely satisfied.</p></div>
         <div><h3>Salmon Salmon</h3></div>
         <div><h4>Marketing- Amazon productions</h4></div>
    </div>
      
    </div>
  </div>

<div class="pg4">

</div>

<style>
    .banner {
        width: 100%;
        min-height: 75vh;
        height:fit-content;
        background-image: linear-gradient(
                rgba(0, 0, 0, 0.75),
                rgba(0, 0, 0, 0.75)
            ),
            url(background-image.jpg);
        background-size: cover;
        background-position: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .navbar {
        width: 85vw;
        /* margin: auto; */
        padding: 35px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100px;
    }

    .logo {
        width: 170px;
        cursor: pointer;
    }

    .navbar ul li {
        list-style: none;
        display: inline-block;
        margin: 0 20px;
        position: relative;
    }
    .navbar ul li a {
        text-decoration: none;
        color: #fff;
        padding: 5px;
    }
    .navbar ul li::after {
        content: "";
        height: 3px;
        width: 0;
        background: rgb(120, 230, 206);
        position: absolute;
        left: 0;
        bottom: -10px;
        transition: 0.5s;
    }
    .navbar ul li:hover::after {
        width: 100%;
    }

    .content {
        width: 60%;
        text-align: center;
        color: #ffffff;
    }
    .content h1 {
        font-size: min(60px, 10vh);
        margin-top: 80px;
    }

    button {
        width: 200px;
        padding: 15px 0;
        text-align: center;
        margin: 20px 20px;
        border-radius: 25px;
        font-weight: bold;
        border: 2px solid #009688;
        background: transparent;
        color: #fff;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    span {
        background: #009688;
        height: 100%;
        width: 0%;
        border-radius: 25px;
        position: absolute;
        left: 0;
        bottom: 0;
        
        transition: 0.5s;
    }

    /* button:hover span 
    {  
        width: 100%;
    } */
    button:hover {
        border: none;
    }

    .pic1 {
        position: absolute;
        width: 45vw;
        height: 80vh;
        right:0vw;
        top:50vh;

    }

    .pg2 {
        width: 100%;
        height: 250vh;
        background-color: rgb(206, 252, 241);
        background-size: cover;
        background-position: center;
        color: #96000e;
        background-image: linear-gradient(
                rgba(206, 252, 241, 0.9),
                rgba(244, 222, 255, 0.9)
            ),
            url(bgvev1.png);
        /* background-image: linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.75)),url(background-image.jpg); */
    }

    .pg2 h1 {
        font-size: min(60px, 7vh);
        margin-left: 25%;
        margin-top: 5%;
    }
    .feat_img {
        width: 100%;
        height: 100%;
    }

    .feature {
        width: 100%;
        position: relative;
        text-align: center;
        color: #009688;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
    }
    .feature:nth-child(2n) {
    }

    .feature div {
        width: 45%;
        min-width: 250px;
        transition: 0.2s;
    }

    .feature div:hover {
        transform: scale(1.1);
    }

    .feature div:hover {
        transform: scale(1.1);
    }

    /* .pic2
{
    position: relative;
    width: 40%;
    height: 10%;
    top: -20    vh;
    bottom: -20 vh;
    left: 55vw;
} */
    .pic3 {
        position: relative;
        width: 45vw;
        height: 80vh;
        top: 5vh;
        left: 55vw;
    }
    .pg3 {
        width: 100%;
        height: 75vh;
        background-color: rgb(244, 222, 255);
        background-size: cover;
        background-position: center;
        color: #96000e;
    }

    .pg4
    {
      width: 100%;
        height: 70vh;
        /* background-color: rgb(244, 222, 255); */
        background-color:#009688;
        background-size: cover;
        background-position: center;
        color: #96000e;
    }
    .pg3 h1 {
        font-size: min(40px, 7vh);
        margin-left: 15vw;
        margin-top: 5%;
        text-align: center;
    }

    .Testimonials {
        margin-top: 8vh;
        width: 100%;
        /* height: 25%; */
        position: relative;
        text-align: center;
        color: #96000e;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
        align-content: space-between;
    }
    
    .person
    {
      width: 25vw;
      min-width: 400px;
      margin-top: 3vh;
      margin-bottom: 3vh;
      margin-left: 1vw;
      margin-right: 1vw;
      /* margin-left: 5vw; */
      border-radius: 25px;
        font-weight: bold;
        border: 0px solid rgb(244, 222, 255);
        background: transparent;
        box-shadow: 0px 0px 0px rgb(244, 222, 255);
        transition: 0.2s;
    }

    .person:hover
    {
        box-shadow: 10px 5px 5px rgb(244, 222, 255);
        border: 3px solid rgb(244, 222, 255);
    }
    .person div
    {
        margin-bottom: 3vh;
        text-align: left;
    }
    .person .h4
    {text-align: left;
    margin-left: 3%;}
    .person .h3
    {text-align: left;
    margin-left: 3vw;}
    .person .p
    {text-align: left;
    margin-left: 3vw;}
 


    .test_img
    {
      width: 100%;
      height: 90%;
      border-radius: 25px;
    }

</style>
