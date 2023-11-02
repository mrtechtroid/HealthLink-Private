
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
            db_messages:[{"role":"system","content":"You are a medical illness diagnosing chatbot. Greet the user, ask various concise non-sympathetic questions such as patient's symptoms, duration of symptoms, etc and identify the illness they are having and type of doctor they have to consult.After identification, reroute the user to correct doctor."}],
            doctor_id:"CHATBOT",
            is_chatbot:true,
            patient_id:"RANDOMID",
            doctor_chosen:false,
            doctor_chosen_id: ""
        });
        goto("/r/chat~"+docRef.id)
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
    style="display:flex;flex-direction:row;width:99vw;border-radius:10px;border:transparent solid 2px;height:99vh;overflow:hidden;"
>
    <div
        id="dashboard_sidebar"
        style="display: flex;flex-direction:column;width:100px;border:transparent solid 2px;align-items:center;justify-content:space-evenly;background-color:#009688;border-right:2px solid white;"
    >
        <span
            on:click={function () {
                goto("/r/dashboard");
            }}
            class="dash_side_ico"
            ><img style="width:50px;height:50px;" src="/favicon.png" /></span
        >
        <div
            style="display:flex;flex-direction:column;align-items:center;font-size:12px;"
            on:click={function () {
                goto("/r/chat");
            }}
        >
            <span class="dash_side_ico material-symbols-outlined">chat</span
            >Chat
        </div>
        <div
            style="display:flex;flex-direction:column;align-items:center;font-size:12px;"
            on:click={function () {
                goto("/r/reports");
            }}
        >
            <span class="dash_side_ico material-symbols-outlined"
                >summarize</span
            >Reports
        </div>
        <div
            style="display:flex;flex-direction:column;align-items:center;font-size:12px;"
            on:click={function () {
                goto("/r/appointments");
            }}
        >
            <span class="dash_side_ico material-symbols-outlined"
                >calendar_month</span
            >Appointments
        </div>
        <div
            style="display:flex;flex-direction:column;align-items:center;font-size:12px;"
            on:click={function () {
                goto("/r/settings");
            }}
        >
            <span class="dash_side_ico material-symbols-outlined">settings</span
            >Settings
        </div>
        <div
            style="display:flex;flex-direction:column;align-items:center;font-size:12px;"
            on:click={function () {
                goto("/r/support");
            }}
        >
            <span class="dash_side_ico material-symbols-outlined">support</span
            >Support
        </div>
    </div>
    <div
        id="div_main"
        style="display: flex;flex-direction:column;flex-wrap:wrap;background-color:white;width:100%;background-color:rgb(120, 230, 206);"
    >
    <div id = "div_main_head" style = "height:20vh;background-color:#009688;padding:10px;display:flex;align-items:center;">
        <span style="font-size: 40px;">Hi Arun</span>
    </div>
    <div>
        
    </div>
    </div>
</div>

<style>
    .dash_side_ico {
        font-size: 40px;
        cursor: pointer;
    }
    .dash_side_ico:hover {
        color: rgb(230, 215, 10);
    }
</style>
