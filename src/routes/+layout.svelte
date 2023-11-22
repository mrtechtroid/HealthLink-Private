<svelte:head>
  <title>HealthLink</title>
</svelte:head>
<script>
  import { onMount } from "svelte";
  import { db } from "../lib/firebase/firebase";
  import { auth } from "../lib/firebase/firebase";
  import { goto } from "$app/navigation";
  import { writable, get } from 'svelte/store';
  import { authStore, dataStore , extraStore} from "../store/store";
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
        getCountFromServer,
    } from "firebase/firestore";
  const nonAuthRoutes = ["/", "/aboutus", "/contactus", "/login", "/register","/terms"];
  let authStoreVariable,dataStoreVariable,reportList,conversationList,user
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
          reportList = value.reportlist
          conversationList = value.conversationlist
        }else{
          dataStoreVariable = {}
        }
	});
  let unsub
  async function getChatList() {
        let q
        if (dataStoreVariable.basicinfo.is_doctor == true){
            q = query(
            collection(db, "chat"),
            where("doctor_id", "==", authStoreVariable.uid),orderBy("date_started", "desc"),limit(10)
        );
        }else{
            q = query(
            collection(db, "chat"),
            where("patient_id", "==", authStoreVariable.uid),orderBy("date_started", "desc"),limit(10)
        );
        }
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let b = doc.data();
            conversationList.push({id:doc.id,is_chatbot:b.is_chatbot,date_started:b.date_started.seconds*1000,date_ended:b.date_ended.seconds*1000,doctor_id:b.doctor_id,doctor_name:b.doctor_name,patient_name:b.patient_name})
        });
        dataStore.update(function (state){return {...state,conversationlist:conversationList}})
    }
    async function getReportList() {
        let q;
        console.log(dataStoreVariable.basicinfo)
        if (dataStoreVariable.basicinfo.is_doctor == true){
            q = query(
            collection(db, "reports"),
            where("allowed_doctors", "array-contains", authStoreVariable.uid),orderBy("created", "desc"),limit(10)
        );
        }else{
            q = query(
            collection(db, "reports"),
            where("patient_id", "==", authStoreVariable.uid),orderBy("created", "desc"),limit(10)
        );
        }
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let b = doc.data();
            reportList.push({id:doc.id,patient_name:b.patient_info.name,created:b.created.seconds*1000,severity:b.severity,symptoms:b.symptoms,doctor_name:b.doctor_name})
        });
        dataStore.update(function (state){return {...state,reportlist:reportList}})
    }
  async function getReportChatCount(){
    let q;
      if (dataStoreVariable.basicinfo.is_doctor == true){
            q = query(
            collection(db, "reports"),
            where("allowed_doctors", "array-contains", authStoreVariable.uid),orderBy("created", "desc")
      );
      }else{
            q = query(
            collection(db, "reports"),
            where("patient_id", "==", authStoreVariable.uid),orderBy("created", "desc")
        );
        }
    const snapshot = await getCountFromServer(q);
    if (dataStoreVariable.basicinfo.is_doctor == true){
            q = query(
            collection(db, "chat"),
            where("doctor_id", "==", authStoreVariable.uid),orderBy("date_started", "desc")
        );
        }else{
            q = query(
            collection(db, "chat"),
            where("patient_id", "==", authStoreVariable.uid),orderBy("date_started", "desc")
        );
        }
    const snapshot2 = await getCountFromServer(q);
    extraStore.update(function(state){return {chatcount:snapshot2.data().count,reportcount:snapshot.data().count,retrivedresource:true}})
  }
  // onMount(function () {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const currentPath = window.location.pathname;
      // If user is logged out OR User is not in a page which doesnt require authentication. Redirect him
      if (!user && !nonAuthRoutes.includes(currentPath)) {
        window.location.href = "/";
        return;
      }
      if (user && currentPath == "/register"){
        window.location.href = "/onboarding"
      }
      // If user was already logged in, and he is in landing page, redirect him to dashboard.
      if (user && (currentPath == "/" || currentPath == "/login")) {
        window.location.href = "/dashboard";
      }
      authStore.update(function (state){return {...state,user:user}})
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        unsub = onSnapshot(doc(db, "users", authStoreVariable.uid), (doc) => {
          dataStore.update(function (state){return {...state,basicinfo:doc.data()}})
        });
        if (conversationList.length == 0){
            getChatList()
        }
        if (reportList.length == 0){
            getReportList()
        }
        if (get(extraStore).retrivedresource == false){
          getReportChatCount()
        }
      } else {
        // docSnap.data() will be undefined in this case
        await setDoc(doc(db, "users", user.uid), {
          name: "Some Random Guy",
          height: 180,
          weight: 75,
          dob: "",
          gender: "",
          mobileno: 0,
          place: "",
          state: "",
          allergies: "",
          past_disease: [],
          is_doctor: false,
          doctor_roles: [],
          email: user.email,
          registered_on: serverTimestamp(),
          profile_last_updated: serverTimestamp(),
          profile_picture:"data:image/png;base64,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",
        });
      }
      // goto("/onboarding")
      // Implement code for getting user details and store it in `dataStore.basicinfo`
    });
  // });
</script>

<div id="output" out:blur={{ duration: 0 }} in:blur={{ duration: 300 }}>
  <slot />
</div>

<style>
  #output {
    background-color: rgb(255, 255, 255);
    color: white;
    width: 100vw;
    min-height: 100vh;
    height:100vh;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Nunito;
  }
</style>
