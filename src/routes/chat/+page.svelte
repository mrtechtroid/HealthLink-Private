<script>
    import { goto } from "$app/navigation";
    import Dashboard from "../../components/Dashboard.svelte";
    import { db } from "../../lib/firebase/firebase";
    import { authStore,dataStore } from "../../store/store";

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
    let userID;
    let conversationList = [];
	const unsubscribe = authStore.subscribe((value) => {
        if (value.user!=undefined){
		userID = value.user.uid}else{
            userID = "RANDOMID"
        }
        userID = "RANDOMID"
	});
    const unsubscribe2 = dataStore.subscribe((value) => {
		conversationList = value.conversationlist
	});
    async function getChatList() {
        const q = query(
            collection(db, "chat"),
            where("patient_id", "==", userID),orderBy("date_started", "desc"),limit(10)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let b = doc.data();
            console.log(b)
            conversationList.push({id:doc.id,is_chatbot:b.is_chatbot,date_started:b.date_started.seconds*1000,date_ended:b.date_ended.seconds*1000,doctor_id:b.doctor_id,})
            console.log(b)
        });
    }
    if (conversationList.length == 0){
        getChatList()
    }
</script>

<Dashboard>
    <h1>Conversations</h1>
    {#each conversationList as elem}
        <div style = "width:100%;border:2px solid black;border-radius:10px;" on:click = {function(){goto("/r/chat~"+elem.id)}}>
            <span>{(new Date(elem.date_started)).toLocaleString()}</span>
            <span>Doctor ID: {elem.doctor_id}</span>
        </div>
    {/each}
</Dashboard>

<style>
    .click_btn {
        height: 150px;
        color: white;
        display: flex;
        flex-direction: column;
        padding: 10px;
        border-radius: 10px;
        cursor: pointer;
        margin: 10px;
    }
    .click_btn span {
        font-size: 20px;
    }
    .click_btn i {
        font-size: 50px;
    }
    .click_btn:hover {
        filter: grayscale(0.5);
    }
</style>
