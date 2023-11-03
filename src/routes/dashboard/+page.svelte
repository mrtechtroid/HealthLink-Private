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

    let dataLocal;
    let authLocal;

    const unsubscribe = dataStore.subscribe((value) => {
        dataLocal = value;
    });
    const unsubscribe1 = authStore.subscribe((value) => {
        authLocal = value;
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
                        "You are a medical illness diagnosing chatbot. Greet the user, ask various concise non-sympathetic questions such as patient's symptoms, duration of symptoms, etc and identify the illness they are having and type of doctor they have to consult.After identification, reroute the user to correct doctor.",
                },
            ],
            doctor_id: "CHATBOT",
            is_chatbot: true,
            patient_id: "RANDOMID",
            doctor_chosen: false,
            doctor_chosen_id: "",
        });
        goto("/r/chat~" + docRef.id);
    }
    onDestroy(function () {
        unsubscribe();
        unsubscribe1();
    });
</script>
<Dashboard>
    <h1>Hi</h1>
</Dashboard>