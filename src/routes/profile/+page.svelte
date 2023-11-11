<!-- Check and change Profile Details -->
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
</script>

<Dashboard>
    <div
            style="height:20%;display:flex;flex-direction:column;justify-content:center;"
        >
            <span style="font-size:25px;font-weight:bold;">Profile</span>
        </div>
</Dashboard>

<style>
    input {
        width: 300px;
        height: 50px;
        border: none;
        background: transparent;
        font-size: 17px;
        color: black;
        padding: 14px;
    }
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