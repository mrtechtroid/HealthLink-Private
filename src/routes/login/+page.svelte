<script>
  import Auth from "../../components/Auth.svelte";
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
  import { authHandlers } from "../../store/store";
  let email = "";
  let password = "";
  let error = false;
  async function handleAuthenticate() {
    if (!email || !password) {
      error = true;
      return;
    }
    await authHandlers.login(email, password);
    console.log("12345");
  }
</script>

<div class="authContainer">
  <form>
    <h1>Login</h1>
    <br>
    {#if error}
      <p class="error">One of the fields is blank</p>
    {/if}
    <label>
      <input bind:value={email} type="email" placeholder="Email" required />
    </label>
    <br><br>
    <label>
      <input
        bind:value={password}
        type="password"
        placeholder="Password"
        required
      />
    </label>
    <br><br>
  </form>

  <button  class="button"
    type="button"
    on:click={handleAuthenticate}
    onclick="window.location.href='../../dashboard';">Submit</button
  >
  <br><br>
  <p>
    Dont have an account?
    <a href="../../register"> Sign Up </a>
  </p>
</div>

<Auth />

<style>
  .authContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .button{
    background-color:rgb(120, 230, 206) ;
    width:25%;
    color: white;
    text-align: center;
    font-size: 30px;
    border-radius:12px;
  }

   label {
    background-color:aliceblue;
    width: 300px;
    font-size: 30px;
    border-style: solid;

  }

  p{
    color:black;
  }

  div{
    width: 100%;
    height:500%;
    background-image: linear-gradient(
                rgba(206, 252, 241, 0.9),
                rgba(244, 222, 255, 0.9)
            ),
            url(bgvev1.png);
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
    height: 50px;
    border: none;
    background: transparent;
    font-size: 17px;
    color: black;
    padding: 14px;
  }
</style>
