<script>
  import { onMount } from "svelte";
  import { db } from "../lib/firebase/firebase";
  import { auth } from "../lib/firebase/firebase";
  import { authStore } from "../store/store";
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
        return;
      }
      // Implement code for getting user details and store it in `dataStore.basicinfo`
    });
  });
</script>

<div id="output">
  <slot />
</div>

<style>
    #output{
        background-color: rgb(255, 255, 255);
        color:white;
        width:100vw;
        min-height:100vh;
        min-width:300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: Nunito;
    }
</style>
