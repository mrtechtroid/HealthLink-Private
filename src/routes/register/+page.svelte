<!-- Register Page -->
<script>
  import { auth } from "../../lib/firebase/firebase";
  import { goto } from "$app/navigation";
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
  let confirmpassword = "";

  import { onMount, onDestroy } from "svelte";

  let user = null;
  const unsubscribe = auth.onAuthStateChanged((currentUser) => {
    if (currentUser) {
      // User is signed in
      user = currentUser;
      console.log(user);
    } else {
      // No user is signed in
      user = null;
    }
  });

  onDestroy(() => {
    // Unsubscribe from the auth state changes when the component is destroyed
    unsubscribe();
  });
  async function handleAuthenticate() {
    if (!email || !password) {
      error = true;
      return;
    }
    await authHandlers.signup(email, password);
    console.log("12345");
    goto("/dashboard");
  }
</script>

<div class="authContainer">
  <h1>Sign Up</h1>
  <label>
    <input
      bind:value={email}
      type="email"
      id="email"
      placeholder="Email"
      required
    />
  </label>
  <label>
    <input
      bind:value={password}
      type="password"
      id="password"
      placeholder="Password"
      required
    />
  </label>
  <label>
    <input
      bind:value={confirmpassword}
      type="password"
      id="confirmpassword"
      placeholder="Confirm Password"
      required
    />
  </label>
  <button type="submit" on:click={handleAuthenticate}>Submit </button>
  <p>
    Already have an account?
    <a href="../../login"> Login </a>
  </p>
</div>

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
    color: black;
    padding: 14px;
  }
</style>
