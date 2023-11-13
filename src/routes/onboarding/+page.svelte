<script>
  import {
    getAuth,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword,
  } from "firebase/auth";
  import {
    getFirestore,
    orderBy,
    limit,
    writeBatch,
    collection,
    addDoc,
    onSnapshot,
    deleteDoc,
    arrayUnion,
    arrayRemove,
    setDoc,
    updateDoc,
    getDocs,
    doc,
    serverTimestamp,
    getDoc,
    query,
    where,
  } from "firebase/firestore";

  let x = 1;

  let name = "";
  let height = null;
  let weight = null;
  let dob = "";
  let gender = "";
  let mobileno = null;
  let place = "";
  let state = "";
  let allergies = "";
  let past_disease = [];
  let is_doctor = false;
  let doctor_roles = [];
  let registered_on = serverTimestamp();
  let profile_last_updated = serverTimestamp();
  $: x = x;
  function setx(t) {
    x = t;
  }
  function decx(k) {
    x = k;
  }
</script>

<!--enter name , dob, mobileno-->

{#if x == 1}
  <div class="basic">
    <h1>Tell us about yourself</h1>
    <br>
    <label>
      <input bind:value={name} type="text" placeholder="Enter Your Name" />
    </label>
    <br>
    <label>
      <input bind:value={dob} type="date" placeholder="dd/mm/yyyy" />
    </label>
    <br>
    <label>
      <input
        bind:value={mobileno}
        type="tel"
        pattern="[0-9]{10}"
        placeholder="Enter Your Mobile Number"
      />
    </label>
    <br>
    <div class="merebutton">
      <button
        type="submit" class = "back"
        on:click={function () {
          decx(1);
        }}>Back</button
      >

      <button class = "next"
        type="submit"
        on:click={function () {
          setx(2);
        }}>Next</button
      >
    </div>
  </div>
  <!--enter gender ,ht,wt-->
{:else if x == 2}
  <div class = "page2">
  <div class="gender_button-container">
    <h1>Select gender</h1>
    <input type="radio" bind:value={gender} id="gender" />
    <span class="gender-button"
      ><img src="/undraw_Female_avatar_efig.png" alt="female" width = "150" height = "150" /></span
    >
    <input type="radio" bind:value={gender} id="gender" />
    <span class="gender-button"
      ><img src="/undraw_Male_avatar_g98d.png" alt="male" width = "150" height = "150" /></span
    >
  </div>
 
    <div class="bodyratio">
      <label
        >Height in cms:<input
          bind:value={height}
          type="text"
          placeholder="Enter your height"
        /></label
      >
      <label
        >Weight in kilos:<input
          bind:value={weight}
          type="text"
          placeholder="Enter your weight"
        /></label
      >
      <br><br>
      <div class="merebutton">
        <button class  = "back"
          type="submit"
          on:click={function () {
            decx(2);
          }}>Back</button
        >
        <button class = "next"
          type="submit"
          on:click={function () {
            setx(3);
          }}>Next</button
        >
      </div>
    </div>
  </div>
  <!--previous disease-->
{:else if x == 3}
  <div class="disease">
    <h3>Any Past/Current Major Health Problems?</h3>
    <br>
    <div class="inner1">
      <p>
        <input bind:value={past_disease} type="checkbox" id="cancer" /> Cancer
      </p>
      <p>
        <input bind:value={past_disease} type="checkbox" id="asthma" /> Asthma
      </p>
      <p>
        <input bind:value={past_disease} type="checkbox" id="hypertension" /> Hypertension
      </p>
    </div>
    <div class="inner2">
      <p>
        <input bind:value={past_disease} type="checkbox" id="syphilis" /> Syphilis
      </p>
      <p>
        <input bind:value={past_disease} type="checkbox" id="arthritis" /> Arthritis
      </p>
      <p>
        <input bind:value={past_disease} type="checkbox" id="diabetes" /> Diabetes
      </p>
    </div>
    <div class="inner3">
      <p>
        <input bind:value={past_disease} type="checkbox" id="high-cholestrol" />
        High Cholestrol
      </p>
      <p><input bind:value={past_disease} type="checkbox" id="aids" /> AIDS</p>
      <p>
        <input bind:value={past_disease} type="checkbox" id="alzheimers" /> Alzheimer's
      </p>
    </div>
    <br>
    <label>Others:<input type="text" bind:value={past_disease} /></label>
    <br>
    <div class="merebutton">
      <button class = "back"
        type="submit"
        on:click={function () {
          decx(2);
        }}>Back</button
      >
      <button class = "next"
        type="submit"
        on:click={function () {
          setx(4);
        }}>Next</button
      >
    </div>
  </div>

  <!--med and allergy-->
{:else if x == 4}
  <div class="medall">
    <p>Medicaiton and Allergies</p>
    <br><br><br>
    <div class="merebutton">
      <button class = "back"
        type="submit"
        on:click={function () {
          decx(3);
        }}>Back</button
      >
      <button class = "next" type="submit">Next</button>
    </div>
  </div>
{/if}


<style>

  .basic {
    display: flex;
    flex-direction: column;
    align-items: center;
    color:black;
    justify-content: center;
    flex: 1;
    width: 100%;
    height:500%;
    background-image: linear-gradient(
                rgba(206, 252, 241, 0.9),
                rgba(244, 222, 255, 0.9)
            ),
            url("bgvev1.png");
  }
  
  .merebutton{
    text-align: center;
    width: 15%;
    font-size: 30px;
    justify-content:center;
    display: flex;
    flex-direction: row;
  }

  .next
  {
    background-color:rgb(120, 230, 206) ;
    border-radius:12px;
    width:50%;
    font-size: 30px;
    float: right;
    margin-left: 10px;
  }

  .back
  {
    background-color:rgb(120, 230, 206) ;
    border-radius:12px;
    width:50%;
    font-size: 30px;
    float:left;
    margin-right: 10px;
  }

   label {
    background-color:aliceblue;
    width: 300px;
    font-size: 20px;
    border-style: solid;

  }

  p{
    color:black;
    font-size: 20px;
  }

  h1 {
    text-align: center;
    color:#009688;
    border: 1px;
    border-radius: 5px;
    padding: 2px;
    font-family: sans-serif;
    font-size: xx-large;
  } 

  label {
    position: relative;
    border: 1px solid Onavy;
    border-radius: 5px;
  }

  input {
    width: 300px;
    border: none;
    background: transparent;
    color: black;
    padding: 14px;
  }

  .page2
  {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    width: 100%;
    height:500%;
    background-image: linear-gradient(
                rgba(206, 252, 241, 0.9),
                rgba(244, 222, 255, 0.9)
            ),
            url(bgvev1.png);
    color:black;
  }


  .disease
  {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    width: 100%;
    height:500%;
    background-image: linear-gradient(
                rgba(206, 252, 241, 0.9),
                rgba(244, 222, 255, 0.9)
            ),
            url(bgvev1.png);
    color:black;
  }

  .disease h3 {
    margin-bottom: 15px;
  }

  .disease p {
    margin-bottom: 10px;
    padding: 10px;
  }

  .disease input[type="checkbox"] {
    margin-right: 5px;
  }

  .inner1 {
    display: flex;
    flex-direction: row;
  }

  .inner2 {
    display: flex;
    flex-direction: row;
  }

  .inner3 {
    display: flex;
    flex-direction: row;
  }

.medall
{
  display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    width: 100%;
    height:500%;
    background-image: linear-gradient(
                rgba(206, 252, 241, 0.9),
                rgba(244, 222, 255, 0.9)
            ),
            url(bgvev1.png);
    color:black;
}
</style>

