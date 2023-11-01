<script>
    import OpenAI from "openai";
    import { page } from "$app/stores";
    import { auth, db } from "../../../lib/firebase/firebase";
    import { goto } from '$app/navigation';
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
    import { onDestroy } from "svelte";

    const openai = new OpenAI({
        apiKey: "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",
        dangerouslyAllowBrowser: true,
    });
    let msgerInput = "";
    let chatID = $page.params.chatID;
    let reportID = "";
    let chatgpt_running = false;
    let chatInfo = {};
    let doctorList = [];
    $: console.log(chatInfo, chatInfo.db_messages);
    $: db_messages = chatInfo.db_messages;

    const unsub = onSnapshot(doc(db, "chat", chatID), (doc) => {
        chatInfo = doc.data();
    });

    async function createNewConversation(docID){
        const docRef = await addDoc(collection(db, "chat"), {
            chat_ended:false,
            date_started:serverTimestamp(),
            date_ended:serverTimestamp(),
            db_messages:[],
            doctor_id:docID,
            is_chatbot:false,
            patient_id:"RANDOMID"
        });
        goto("/r/chat~"+docRef.id,{replaceState: true})
    }
    async function askHealthCareProf() {
        if (chatInfo!={} && chatInfo.chat_ended ) {
            const docRef = doc(db, "reports", chatInfo.report);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                let reportDetails = docSnap.data();
                const q = query(
                    collection(db, "users"),
                    where(
                        "doctor_roles",
                        "array-contains",
                        reportDetails.doctor_type
                    ),
                    limit(3)
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    let b = doc.data();
                    doctorList.push({
                        role: "doctor",
                        doctor_role: b.doctor_roles[0],
                        name: b.name,
                        id: doc.id,
                    });
                });
                doctorList = doctorList
            } else {
                console.log("No such document!");
            }
        } else {
            alert("WARM");
            let report_num = db_messages.length - 1;
            for (var i = db_messages.length - 1; i > 0; i--) {
                if (
                    db_messages[i].role == "assistant" &&
                    db_messages[i].severity != "undetermined"
                ) {
                    report_num = i;
                    break;
                }
            }
            const docRef = await addDoc(collection(db, "reports"), {
                patient_id: "",
                related_report: "",
                related_conversation: [chatID],
                allowed_doctors: [],
                symptoms: db_messages[report_num].symptoms,
                history: "",
                summary: db_messages[report_num].summary,
                severity: db_messages[report_num].severity,
                doctor_type: db_messages[report_num].doctor_type,
                predicted_illness: "",
                other_illness: "",
                created: serverTimestamp(),
                last_updated: serverTimestamp(),
                final_verdict: {},
                attachments: "",
            });
            let reportID = docRef.id;
            await updateDoc(doc(db, "chat", chatID), {
                date_ended: serverTimestamp(),
                chat_ended: true,
                report: reportID,
            });
        }
    }
    $: if (Object.keys(chatInfo).length) {
        check_chatBot(chatInfo.db_messages);
    }
    function check_chatBot(db_messages) {
        let count_mild_severe = 0;
        for (var i = db_messages.length - 1; i >= 0; i--) {
            console.log(count_mild_severe);
            if (count_mild_severe > 1) {
                askHealthCareProf();
                return false;
            }
            if (
                db_messages[i].role == "assistant" &&
                db_messages[i].severity != "undetermined"
            ) {
                console.log(count_mild_severe + 1);
                count_mild_severe += 1;
            }
        }
        return true;
    }
    async function user_sendMessage(is_chatbot) {
        if (chatInfo.chat_ended && chatInfo.is_chatbot) {
            alert(
                "This Chat Has Ended. Please Perform The Operations mentioned below."
            );
            return;
        } else if (chatInfo.chat_ended) {
            alert(
                "This Chat Has Ended under Request of Doctor. Please Check your Reports. "
            );
        }
        if (db_messages.length > 21) {
            askHealthCareProf();
            return;
        }
        chatInfo.db_messages.push({
            role: "user",
            time: Date.now(),
            content: msgerInput,
        });
        console.log(chatInfo.db_messages);
        msgerInput = "";
        chatInfo.db_messages = chatInfo.db_messages;
        if (is_chatbot) {
            if (check_chatBot()) {
                return;
            }
            chatgpt_running = true;
            let currentmessage = await runConversation(chatInfo.db_messages);
            let response = JSON.parse(currentmessage);
            chatInfo.db_messages.push({
                role: "assistant",
                content: response.response_to_user,
                symptoms: response.symptoms,
                summary: response.summary,
                severity: response.severity,
                doctor_type: response.doctor_type,
                predicted_illness: response.predicted_illness,
                time: Date.now(),
            });
            chatInfo.db_messages = chatInfo.db_messages;
            chatgpt_running = true;
        }
        await updateDoc(doc(db, "chat", chatID), {
            db_messages: chatInfo.db_messages,
        });
    }
    async function runConversation(gh) {
        let db_messages = [...gh];
        console.log(db_messages);
        for (var i = 0; i < db_messages.length; i++) {
            let elem = db_messages[i];
            db_messages[i] = { role: elem.role, content: elem.content };
        }
        console.log(db_messages);
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: db_messages,
            functions: [
                {
                    name: "e",
                    description: "Every response",
                    parameters: {
                        type: "object",
                        properties: {
                            symptoms: {
                                type: "string",
                            },
                            response_to_user: {
                                type: "string",
                            },
                            predicted_illness: {
                                type: "string",
                            },
                            summary: {
                                type: "string",
                            },
                            severity: {
                                type: "string",
                                enum: ["mild", "severe", "undetermined"],
                            },
                            doctor_type: {
                                type: "string",
                                enum: [
                                    "General practitioner",
                                    "Neurologist",
                                    "Surgeon",
                                    "Dermatologist",
                                    "Psychiatrist",
                                    "Pediatrician",
                                    "Cardiologist",
                                    "Radiologist",
                                    "Oncologist",
                                    "Urologist",
                                    "Anesthesiologist",
                                    "Orthopedic surgeon",
                                    "Pathologist",
                                    "Internal medicine",
                                    "Ophthalmologist",
                                    "Rheumatologist",
                                    "Endocrinologist",
                                    "Gastroenterologist",
                                    "Ophthalmology",
                                    "Neurology",
                                    "Family medicine",
                                    "Pediatrics",
                                    "Pulmonologist",
                                    "Otolaryngologist",
                                ],
                            },
                        },
                        required: [
                            "symptoms",
                            "response_to_user",
                            "summary",
                            "severity",
                            "doctor_type",
                            "predicted_illness",
                        ],
                    },
                },
            ],
            function_call: { name: "e" },
            temperature: 0.2,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        const responseMessage =
            response.choices[0].message.function_call.arguments;
        return responseMessage;
    }
    function us_M() {
        user_sendMessage(chatInfo.is_chatbot);
    }
    onDestroy(unsub);
</script>

<!-- Code for Chat Component.  -->
<!-- Inspirations - https://sendbird.sfo3.digitaloceanspaces.com/cms/Chat-UI-architecture-on-a-mobile-device.png -->

<!-- chatgpt - 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 -->
<section class="msger">
    <header class="msger-header">
        <div class="msger-header-title">
            <i class="fas fa-comment-alt" /> SimpleChat
        </div>
        <div class="msger-header-options">
            <span><i class="fas fa-cog" /></span>
        </div>
    </header>

    <main class="msger-chat">
        {#if db_messages != undefined}
            {#each db_messages as item, index}
                {#if item.role == "system"}
                    <div />
                {:else if item.role == "assistant"}
                    <div class="msg left-msg">
                        <div class="msg-bubble">
                            <div class="msg-info">
                                <div class="msg-info-name">{item.role}</div>
                            </div>

                            <div class="msg-text">{item.content}</div>
                            <div class="msg-info-time">
                                {new Date(item.time).toISOString()}
                            </div>
                        </div>
                    </div>
                {:else}
                    <div class="msg right-msg">
                        <div class="msg-bubble">
                            <div class="msg-info">
                                <div class="msg-info-name">{item.role}</div>
                            </div>
                            <div class="msg-text">{item.content}</div>
                            <div class="msg-info-time">
                                {new Date(item.time).toISOString()}
                            </div>
                        </div>
                    </div>
                {/if}
            {/each}
        {/if}
        {#if chatgpt_running}
            <div style="color:black">Generating Response...</div>
        {/if}
        {#if chatInfo.chat_ended}
            <div style="color:black">This Conversation has Ended.</div>
        {/if}
        <div style="display: flex;flex-direction:row;color:black">
            {#if doctorList != []}
                {#each doctorList as item, index}
                    <div
                        style="width:150px;height:150px;display:flex;flex-direction:column"
                    >
                        <span>{item.name}</span>
                        <span>{item.doctor_role}</span>
                        <button
                            on:click={function () {
                                createNewConversation(item.id);
                            }}
                        >Chat with Doctor</button>
                    </div>
                {/each}
            {/if}
        </div>
    </main>
    <div id="msger-inputarea">
        <input
            type="text"
            id="msger-input"
            disabled={chatInfo.chat_ended}
            placeholder="Enter your message..."
            bind:value={msgerInput}
        />
        <button
            type="submit"
            id="msger-send-btn"
            on:click={us_M}
            disabled={chatInfo.chat_ended}>Send</button
        >
    </div>
</section>

<style>
    :root {
        --body-bg: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        --msger-bg: #fff;
        --border: 2px solid #ddd;
        --left-msg-bg: #9b6464;
        --right-msg-bg: #579ffb;
    }

    *,
    *:before,
    *:after {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    }

    .msger {
        display: flex;
        flex-flow: column wrap;
        justify-content: space-between;
        width: 100%;
        max-width: 867px;
        margin: 25px 10px;
        height: calc(100% - 50px);
        border: var(--border);
        border-radius: 5px;
        background: var(--msger-bg);
        box-shadow: 0 15px 15px -5px rgba(0, 0, 0, 0.2);
    }

    .msger-header {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border-bottom: var(--border);
        background: #eee;
        color: #666;
    }

    .msger-chat {
        flex: 1;
        overflow-y: auto;
        padding: 10px;
    }
    .msger-chat::-webkit-scrollbar {
        width: 6px;
    }
    .msger-chat::-webkit-scrollbar-track {
        background: #ddd;
    }
    .msger-chat::-webkit-scrollbar-thumb {
        background: #bdbdbd;
    }
    .msg {
        display: flex;
        align-items: flex-end;
        margin-bottom: 10px;
    }
    .msg:last-of-type {
        margin: 0;
    }
    .msg-img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        background: #ddd;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        border-radius: 50%;
    }
    .msg-bubble {
        max-width: 450px;
        padding: 15px;
        border-radius: 15px;
        background: var(--left-msg-bg);
    }
    .msg-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }
    .msg-info-name {
        margin-right: 10px;
        font-weight: bold;
    }
    .msg-info-time {
        font-size: 0.85em;
    }

    .left-msg .msg-bubble {
        border-bottom-left-radius: 0;
    }

    .right-msg {
        flex-direction: row-reverse;
    }
    .right-msg .msg-bubble {
        background: var(--right-msg-bg);
        color: #fff;
        border-bottom-right-radius: 0;
    }
    .right-msg .msg-img {
        margin: 0 0 0 10px;
    }

    #msger-inputarea {
        display: flex;
        padding: 10px;
        border-top: var(--border);
        background: #eee;
    }
    #msger-inputarea * {
        padding: 10px;
        border: none;
        border-radius: 3px;
        font-size: 1em;
    }
    #msger-input {
        flex: 1;
        background: #ddd;
    }
    #msger-send-btn {
        margin-left: 10px;
        background: rgb(0, 196, 65);
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.23s;
    }
    .msger-send-btn:hover {
        background: rgb(0, 180, 50);
    }

    .msger-chat {
        background-color: #fcfcfe;
    }
</style>
