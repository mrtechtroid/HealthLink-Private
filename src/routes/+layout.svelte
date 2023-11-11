<script>
  import { onMount } from "svelte";
  import { db } from "../lib/firebase/firebase";
  import { auth } from "../lib/firebase/firebase";
  import { authStore, dataStore } from "../store/store";
  import { serverTimestamp } from "firebase/firestore";
  const nonAuthRoutes = ["/", "/aboutus", "/contactus", "/login", "/register"];

  onMount(function () {
    console.log("Mounting");
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const currentPath = window.location.pathname;
      // If user is logged out OR User is not in a page which doesnt require authentication. Redirect him
      if (!user && !nonAuthRoutes.includes(currentPath)) {
        window.location.href = "/";
        return;
      }
      // If user was already logged in, and he is in landing page, redirect him to dashboard.
      if (user && currentPath == "/") {
        window.location.href = "/dashboard";
      }
      authStore.user = user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        dataStore = docSnap.data();
        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        await setDoc(doc(db, "users", user.uid), {
          name: "",
          height: 0,
          weight: 0,
          dob: "",
          gender: "",
          mobileno: 0,
          place: "",
          state: "",
          allergies: "",
          past_disease: [],
          is_doctor: false,
          doctor_roles: [],
          registered_on: serverTimestamp(),
          profile_last_updated: serverTimestamp(),
        });
      }

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
