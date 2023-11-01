<div class="banner">
    <div class="navbar">
        <img src="healthlink.png" class="logo">
        <ul>
            <li><a href="#">Log in</a></li>
            <li><a href="#">Sign up</a></li>
        </ul>
    </div>

    <div class="content">
        <h1>Affordable health-care at your Fingertips</h1>
        <div>
            <button type="button"><span></span>CHAT NOW</button>
            <button type="button"><span></span>BOOK AN APPOINTMENT</button>
        </div>
    </div>  
    
    <img src="phone_chat_blue.png" class="pic1">
</div>

<div class="pg2">
    <h1>How do we do it?</h1>
    <div class="feature1">
        <div><img src="feat_img1 (2).png" class="feat_img1"></div>
        <div><h2>Hello and warm welscome to our veoigfute website ad a i doiwnt knwo what i am doing. Hello hello what are pu doing i myself dont know.</h2></div>
    </div>
    <div class="feature2">
        <div><h2>Hello and warm welscome to our veoigfute website ad a i doiwnt knwo what i am doing. Hello hello what are pu doing i myself dont know.</h2></div>
        <div><img src="feat_img2 (2).png" class="feat_img2"></div>
    </div>
    <div class="feature3">
        <div><img src="feat_img3 (2).png" class="feat_img3"></div>
        <div><h2>Hello and warm welscome to our veoigfute website ad a i doiwnt knwo what i am doing. Hello hello what are pu doing i myself dont know.</h2></div>
    </div>
</div>



<style>

.banner
{
width: 100%;
height:75vh;
background-image: linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.75)),url(background-image.jpg);
background-size: cover;
background-position: center;
}

.navbar 
{
    width: 85%;
    margin: auto;
    padding: 35px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo
{
    width: 170px;
    cursor: pointer;
}

.navbar ul li
{
    list-style: none;
    display: inline-block;
    margin: 0 20px;
    position: relative;
}
.navbar ul li a
{
    text-decoration: none;
    color: #fff;
    padding:5px;
    /*padding-left:10px;
    padding-right:10px;
    border: transparent solid 3px;
    border-radius:10px;
    background-color:olive;*/
}
.navbar ul li::after
{
    content: '';
    height: 3px;
    width: 0;
    background: rgb(120, 230, 206);
    position: absolute;
    left: 0;
    bottom: -10px;
    transition: 0.5s;
}
.navbar ul li:hover::after
{
    width: 100%;
}

.content
{
    width: 60%;
    position: absolute;
    top: 35%;
    transform: translateY(-50%);
    text-align: center;
    color: #ffffff;
}
.content h1
{
    font-size: min(60px,10vh);
    margin-top: 80px;
}

button
{
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

span
{
    background: #009688;
    height: 100%;
    width: 0%;
    border-radius: 25px;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: -1;
    transition: 0.5s;
}

button:hover span
{
    width: 100%;
}
button:hover
{
    border: none;
}

.pic1
{
    position: relative;
    width: 45vw;
    height: 80vh;
    top: 5vh;
    left: 55vw;
}

.pg2
{
    width: 100%;
    height:220vh;
    background-color: rgb(206, 252, 241);
    background-size: cover;
    background-position: center;
    color: #009688;
    
}

.pg2 h1
{
    font-size: min(60px,7vh);
    margin-left: 25%;
    margin-top: 5%;
}

.feature1
{
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

.feature1 div
{
    width: 45%;
    transition: 0.2s;


}

.feature1 div:hover
{
    transform: scale(1.1);
}

.feature2
{
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
.feature2 div
{
    width: 45%;
    transition: 0.2s;
}
.feature2 div:hover
{
    transform: scale(1.1);
}

.feature3
{
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
.feature3 div
{
    width: 45%;
    transition: 0.2s;
}
.feature3 div:hover
{
    transform: scale(1.1);
}

.pg3
{
    width: 100%;
    height:190vh;
    background-color: rgb(244, 222, 255);
    background-size: cover;
    background-position: center;
    color:#009688;
}
.pg3 h1
{
    font-size: min(60px,7vh);
    margin-left: 25%;
    margin-top: 5%;
}

/* .testimonies {
    margin-top: 0vh;
    margin-left: 5vw;
    margin-right: 5vw;
    width: 100vw;
    height: 55vh;;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

}

.testimonies .person 
{
    display: inline-block;
    width: 70vw;
    /*height: 20vh;*/
    /* margin-right: 5vw; 
    margin-left: 5vw;
    background-color: lightgray;
}

    .testimonies::-webkit-scrollbar
{
    width: 0;
}

.testimonies img
{
    width: 30vw;
    height: 50vh;
} */

/* ------testimonial  close-------*/
</style>