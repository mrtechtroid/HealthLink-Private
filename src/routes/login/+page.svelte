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
    {#if error}
      <p class="error">One of the fields is blank</p>
    {/if}
    <label>
      <input bind:value={email} type="email" placeholder="Email" required />
    </label>
    <label>
      <input
        bind:value={password}
        type="password"
        placeholder="Password"
        required
      />
    </label>
  </form>

  <button
    type="button"
    on:click={handleAuthenticate}
    onclick="window.location.href='../../dashboard';">Submit</button
  >
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

  form {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  form input {
    width: 100%;
  }

  h1 {
    text-align: center;
    color: white;
    border: 1px;
    border-radius: 5px;
    background: #40aeae;
    padding: 2px;
    font-family: sans-serif;
    font-size: xx-large;
  }

  form label {
    position: relative;
    border: 1px solid Onavy;
    border-radius: 5px;
  }

  form input {
    border: none;
    background: transparent;
    color: white;
    padding: 14px;
  }
</style>
