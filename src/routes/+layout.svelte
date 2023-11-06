<script>
  import { onMount } from "svelte";
  import { db } from "../lib/firebase/firebase";
  import { auth } from "../lib/firebase/firebase";
  import { goto } from "$app/navigation";
  import { authStore, dataStore } from "../store/store";
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
  const nonAuthRoutes = ["/", "/aboutus", "/contactus", "/login", "/register"];
  let authStoreVariable,dataStoreVariable
  const unsubscribe2 = authStore.subscribe((value) => {
        if (value.user!={email:"test@test.cc",uid:"RANDOMID"}){
          authStoreVariable = value.user
        }else{
          authStoreVariable = {email:"test@test.cc",uid:"RANDOMID"}
        }
	});
  const unsubscribe3 = dataStore.subscribe((value) => {
        if (value.basicinfo!={}){
          dataStoreVariable = value
        }else{
          dataStoreVariable = {}
        }
	});
  let unsub
  onMount(function () {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const currentPath = window.location.pathname;
      // If user is logged out OR User is not in a page which doesnt require authentication. Redirect him
      if (!user && !nonAuthRoutes.includes(currentPath)) {
        window.location.href = "/";
        return;
      }
      // If user was already logged in, and he is in landing page, redirect him to dashboard.
      if (user && (currentPath == "/" || currentPath == "/login" || currentPath == "/register")) {
        window.location.href = "/dashboard";
      }
      authStore.update(function (state){return {...state,user:user}})
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        unsub = onSnapshot(doc(db, "users", authStoreVariable.uid), (doc) => {
          dataStore.update(function (state){return {...state,basicinfo:doc.data()}})
        });
      } else {
        // docSnap.data() will be undefined in this case
        await setDoc(doc(db, "users", user.uid), {
          name: "Some Random Guy",
          height: 180,
          weight: 75,
          dob: "",
          gender: "",
          phno: 0,
          city: "",
          state: "",
          past_disease: "",
          is_doctor: false,
          doctor_roles: [],
          allergies: "",
          email: user.email,
          registered_on: serverTimestamp(),
          profile_last_updated: serverTimestamp(),
        });
      }
      goto("/r/dashboard")
      // Implement code for getting user details and store it in `dataStore.basicinfo`
    });
  });
</script>

<div id="output">
  <slot />
</div>

<style>
  #output {
    background-color: rgb(255, 255, 255);
    color: white;
    width: 100vw;
    min-height: 100vh;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Nunito;
  }
</style>
