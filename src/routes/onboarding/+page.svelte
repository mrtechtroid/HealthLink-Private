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
    <h1>tell us about yourself</h1>
    <label>
      <input bind:value={name} type="text" placeholder="Enter Your Name" />
    </label>
    <label>
      <input bind:value={dob} type="date" placeholder="dd/mm/yyyy" />
    </label>
    <label>
      <input
        bind:value={mobileno}
        type="tel"
        pattern="[0-9]{10}"
        placeholder="Enter Your Mobile Number"
      />
    </label>
    <div class="merebutton">
      <button
        type="submit"
        on:click={function () {
          setx(2);
        }}>Next</button
      >
    </div>
  </div>
  <!--enter gender ,ht,wt-->
{:else if x == 2}
  <div class="gender_button-container">
    <h1>Select gender</h1>
    <input type="radio" bind:value={gender} id="gender" />
    <span class="gender-button"
      ><img src="/undraw_Female_avatar_efig.png" alt="female" /></span
    >
    <input type="radio" bind:value={gender} id="gender" />
    <span class="gender-button"
      ><img src="/undraw_Male_avatar_g98d.png" alt="male" /></span
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
    <div class="merebutton">
      <button
        type="submit"
        on:click={function () {
          decx(1);
        }}>Back</button
      >
      <button
        type="submit"
        on:click={function () {
          setx(3);
        }}>Next</button
      >
    </div>
  </div>

  <!--previous disease-->
{:else if x == 3}
  <div class="disease">
    <h3>Any Past/Current Major Health Problems?</h3>
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
    <label>Others:<input type="text" bind:value={past_disease} /></label>

    <div class="merebutton">
      <button
        type="submit"
        on:click={function () {
          decx(2);
        }}>Back</button
      >
      <button
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
    <p>medicaiton and allergy</p>
    <div class="merebutton">
      <button
        type="submit"
        on:click={function () {
          decx(3);
        }}>Back</button
      >
      <button type="submit">Next</button>
    </div>
  </div>
{/if}

<style>
  /*x=1*/

  .basic {
    color: black;
    background-color: green;
    display: flex;
    flex-direction: column;
  }

  /*x=2*/
  .bodyratio {
    color: black;
    background-color: white;
    display: flex;
    flex-direction: column;
  }
  img {
    width: 100px;
    height: 100px;
  }
  .gender_button-container {
    display: flex;
    flex-direction: row;
    width: 50%;
    color: black;
  }

  .gender-button {
    font-size: 1.125rem;
    color: #fff;
    background-color: #4caf50;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
  }

  /*x=3*/
  .disease {
    max-width: 400px;
    margin: 0 auto;
    color: black;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    background-color: aqua;
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

  /*x=4*/
  .medall {
    color: black;
  }
  /*overall ig*/
</style>
