
<script>
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';
    import { auth, db } from "../../lib/firebase/firebase";
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
    import {dataStore,authStore} from "../../store/store"
    import { onDestroy } from "svelte";

    let dataLocal;
    let authLocal;

	const unsubscribe = dataStore.subscribe((value) => {
		dataLocal = value;
	});
    const unsubscribe1 = authStore.subscribe((value) => {
		authLocal = value;
	});
    async function createChatbotChat(){
        const docRef = await addDoc(collection(db, "chat"), {
            chat_ended:false,
            date_started:serverTimestamp(),
            date_ended:serverTimestamp(),
            db_messages:[{"role":"system","content":"You are Lyra, a medical illness diagnosing chatbot.You are expected to ask various questions, such as patient's symptoms, duration of symptoms, and try to identify the illness they might be having and type of doctor they might have to consult. Do not be sympathetic towards the patient. Try to ask concise questions.Initially you are supposed to Greet the user and politely ask for symptoms."}],
            doctor_id:"CHATBOT",
            is_chatbot:true,
            patient_id:"RANDOMID"
        });
        goto("/r/chat/"+docRef.id)
    }
    onDestroy(function(){
        unsubscribe()
        unsubscribe1()
    })
</script>
<!-- Three things will be present in this - Initial Welcome Screen 
List of Conversations
List of Past Reports
-->
<div
    id="dashboard"
    style="display:flex;flex-direction:row;width:90vw;border-radius:10px;border:transparent solid 2px;height:90vh;overflow:hidden;"
>
    <div
        id="dashboard_sidebar"
        style="display: flex;flex-direction:column;width:100px;border:transparent solid 2px;align-items:center;justify-content:space-evenly;background-color:#7951fc;"
    >
        <span class="dash_side_ico"
            ><img style="width:50px;height:50px;" src="favicon.png" /></span
        >
        <span class="dash_side_ico material-symbols-outlined">chat</span>
        <span class="dash_side_ico material-symbols-outlined">summarize</span>
        <span class="dash_side_ico material-symbols-outlined"
            >calendar_month</span
        >
        <span class="dash_side_ico material-symbols-outlined">settings</span>
        <span class="dash_side_ico material-symbols-outlined">support</span>
    </div>
    <div
        id="div_main"
        style="display: flex;flex-direction:column;flex-wrap:wrap;background-color:white;width:100%;overflow-y:scroll;overflow-x:hidden;"
    >
        <div
            id="div_greet"
            style="width:100%;color:black;display:flex;flex-direction:row;height:20vh;align-items:center;margin:10px;"
        >
            <h1>Hi User,</h1>
            <button on:click={createChatbotChat}>Talk to Our Chatbot</button>
        </div>
    </div>
</div>

<style>
    .dash_side_ico {
        font-size: 40px;
    }
    .dash_side_ico:hover{
        color:rgb(230, 215, 10)
    }
</style>
