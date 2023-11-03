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
  let height = 0;
  let weight = 0;
  let dob = "";
  let gender = "";
  let mobileno = null;
  let place = "";
  let state = "";
  let allergies = "";
  let past_disease = "";
  let is_doctor = false;
  let doctor_roles = [];
  let registered_on = serverTimestamp();
  let profile_last_updated = serverTimestamp();
  $: x = x;
  function setx(t) {
    x = t;
  }
</script>

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
    <button
      type="submit"
      on:click={function () {
        setx(2);
      }}>Next</button
    >
  </div>
{:else if x == 2}
  <div class="gender">
    <p>Select gender</p>
    <input type="radio" value="Female" id="gender" />
    <span><img src="/undraw_Female_avatar_efig.png" alt="female" /></span>
    <input type="radio" value="Male" id="gender" />
    <span><img src="/undraw_Male_avatar_g98d.png" alt="male" /></span>
  </div>
  <div class="bodyratio">
    <label
      >Height in cms:<input
        type="text"
        placeholder="Enter your height"
      /></label
    >
  </div>
{/if}

<style>
  .basic {
    color: black;
    background-color: green;
    display: flex;
    flex-direction: column;
  }
  .body {
    color: black;
    background-color: green;
    display: flex;
    flex-direction: column;
  }
</style>
