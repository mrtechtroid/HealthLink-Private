<script>
    import Dashboard from "../../components/Dashboard.svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
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
    import { dataStore, authStore } from "../../store/store";
    import { onDestroy } from "svelte";

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
          dataStoreVariable = value.basicinfo
        }else{
          dataStoreVariable = {}
        }
	});
    async function createChatbotChat() {
        const docRef = await addDoc(collection(db, "chat"), {
            chat_ended: false,
            date_started: serverTimestamp(),
            date_ended: serverTimestamp(),
            db_messages: [
                {
                    role: "system",
                    content:
                        "You are a medical illness diagnosing chatbot. Ask various concise non-sympathetic questions such as patient's symptoms, duration of symptoms, any past medical conditions, etc. Ask follow up questions to narrow down the possible illness. Identify the illness they are having and type of doctor they have to consult. Ask follow up questions .  After identification, reroute the user to correct doctor. The patient has diabetes.",
                },
            ],
            doctor_id: "CHATBOT",
            doctor_name: "CHATBOT",
            patient_name: dataStoreVariable.name,
            is_chatbot: true,
            patient_id: authStoreVariable.uid,
            doctor_chosen: false,
            doctor_chosen_id: "",
        });
        goto("/r/chat~" + docRef.id);
    }
</script>

    <Dashboard>
        <div
            style="height:20%;display:flex;flex-direction:column;justify-content:center;"
        >
            <span>Welcome Back,</span>
            <span style="font-size:25px;font-weight:bold;">{dataStoreVariable.name}</span>
        </div>
        <div style="display: flex;flex-direction:row;flex-wrap:wrap;">
            <div class = "click_btn" style="background-color: #1ebfc4;" on:click={createChatbotChat}><i class='bx bx-plus-medical'></i><span>Chat with MediBot</span></div>
        </div>
    </Dashboard>


<style>
    .click_btn {
        width: 200px;
        height: 150px;
        color: white;
        display: flex;
        flex-direction: column;
        padding: 10px;
        border-radius: 10px;
        cursor:pointer;
        margin:10px;
    }
    .click_btn span {
        font-size:20px;
    }
    .click_btn i{
        font-size:50px;
    }
    .click_btn:hover{
        filter:grayscale(0.5)
    }
</style>
