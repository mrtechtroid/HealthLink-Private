<script>
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
    //     document.ready(function() {
    //     document.getElementByClassName("hamburger").click(function() {
    //         document.getElementByClassName("left_sidebar").css({
    //             'transform': 'translateX(0)'
    //         });
    //     });
    //     document.getElementByClassName("student").click(function() {
    //         document.getElementByClassName("right_sidebar").css({
    //             'transform': 'translateX(0)'
    //         });
    //     });

    //     document.getElementByClassName("close_btn").click(function() {
    //         document.getElementByClassName("right_sidebar").css({
    //             'transform': 'translateX(150%)'
    //         })
    //     })

    //     document.getElementByClassName("close_hamburger_btn").click(function() {
    //         document.getElementByClassName("left_sidebar").css({
    //             'transform': 'translateX(-150%)'
    //         })
    //     })

    // });
</script>

<div class="container">
    <div class="left_sidebar">
        <div class="close_hamburger_btn">
            <i class="bx bx-x-circle" />
        </div>
        <div class="logo">
            <h2 onclick="myFunction()">
                <img
                    src="healthlink-black.png"
                    alt="logo"
                    style="width:150px;"
                />
            </h2>
        </div>
        <div class="menu_items">
            <div class="menu_item">
                <i class="bx bxs-dashboard" />
                <p>Dashboard</p>
            </div>
            <div class="menu_item">
                <i class="bx bx-message-rounded-dots" />
                <p>Conversations</p>
                <i class="fa-regular fa-circle-2" />
            </div>
            <div class="menu_item">
                <i class="bx bx-calendar" />
                <p>Reports</p>
            </div>
            <div class="menu_item">
                <i class="bx bx-file-blank" />
                <p>Appointments</p>
            </div>
            <div class="menu_item">
                <i class="bx bx-user-circle" />
                <p>Profile</p>
            </div>
            <div class="menu_item">
                <i class="bx bx-cog" />
                <p>Settings</p>
            </div>
        </div>
    </div>
    <div class="main_content">
        <div class="left_right_sidebar_opener">
            <div class="hamburger">
                <i class="bx bx-menu" />
            </div>
            <div class="student">
                <div class="profile_img">
                    <img
                        src="https://i.postimg.cc/Sxb6gssQ/img-1.jpg"
                        alt="profile img"
                    />
                </div>
                <div class="profile_name">
                    <p>Kery Roy</p>
                </div>
            </div>
        </div>
        <div class="main_navbar">
            <div class="search_box">
                <i class="bx bx-search-alt-2" />
                <input type="text " placeholder="Search" />
            </div>
        </div>
    </div>
    <div class="right_sidebar">
        <div class="profile">
            <div class="img">
                <img
                    src="https://i.postimg.cc/g2M32zcz/image.png "
                    alt="studentImg "
                />
            </div>
            <div class="name_and_class">
                <p>James Bond</p>
                <span>User</span>
            </div>
            <div class="other_info">
                <div class="about">
                    <h4>Past/Current Illnesses</h4>
                    <p>
                        AIDS
                    </p>
                </div>
                <div class="age">
                    <h4>Age</h4>
                    <p>18</p>
                </div>
                <div class="gender">
                    <h4>Gender</h4>
                    <p>Female</p>
                </div>
                <div class="dob">
                    <h4>DOB</h4>
                    <p>12/11/2006</p>
                </div>
                <div class="address">
                    <h4>Address</h4>
                    <p>USA</p>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif;
        color: black;
    }

    :root {
        --grey-color: #b1adad;
        --border-color: #e7e8ea;
    }

    .container {
        display: flex;
        height: 99vh;
        letter-spacing: 1px;
        width:100vw;
    }

    /*----- Left SideBar -----*/

    .left_sidebar {
        width: 20vw;
        position: sticky;
        top: 0px;
        align-self: flex-start;
        transition: all 0.3s ease-in-out;
    }

    .left_sidebar .close_hamburger_btn {
        position: absolute;
        top: 30px;
        left: 30px;
        font-size: 34px;
        cursor: pointer;
        color: #000;
        display: none;
    }

    .left_sidebar .logo h2 {
        padding: 20px 30px;
        font-weight: 600;
        font-size: 32px;
        font-style: italic;
    }

    .left_sidebar .menu_items .menu_item {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 17px;
        color: var(--grey-color);
        padding: 20px 30px;
        cursor: pointer;
    }

    /*----- Main Content -----*/

    .main_content {
        flex-basis: 60vw;
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 0 20px;
        transition: all 0.3s ease-in-out;
        overflow-y: scroll;
    }

    .main_content .main_navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
    }

    .main_content .main_navbar .dark_mode_icon i {
        background: var(--border-color);
        color: #000;
        font-size: 18px;
        padding: 10px;
        margin-top: 15px;
        border-radius: 50%;
        cursor: pointer;
    }

    .main_content .left_right_sidebar_opener {
        font-size: 45px;
        cursor: pointer;
        margin-top: 20px;
        display: none;
    }

    .main_content .left_right_sidebar_opener .student {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .main_content .left_right_sidebar_opener .student img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        object-fit: cover;
        background-position: center;
        margin-top: 15px;
    }

    .main_content .left_right_sidebar_opener .student p {
        font-size: 18px;
    }

    .search_box {
        background: var(--border-color);
        display: flex;
        gap: 15px;
        padding: 12px;
        margin-top: 20px;
        align-items: center;
        color: #000;
        width: 100%;
        border-radius: 5px;
        font-size: 20px;
        width: 90%;
    }

    .search_box input {
        width: 100%;
        border: none;
        background: #e9eaec;
        outline: none;
    }

    /*----- Right SideBar -----*/

    .right_sidebar {
        width:20vw;
        position: sticky;
        top: 0px;
        align-self: flex-start;
        transition: all 0.3s ease-in-out;
        margin:5px;
    }

    .profile {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
        margin-bottom: 30px;
        gap: 15px;
    }

    .profile img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
        background-position: center;
    }

    .profile .name_and_class {
        text-align: center;
    }

    .profile .name_and_class P {
        font-weight: 600;
    }

    .profile .name_and_class span {
        font-size: 14px;
        color: var(--grey-color);
    }

    .profile .about {
        /* margin: 15px 0; */
    }

    .profile .about h4,
    .profile .other_info h4 {
        font-weight: 600;
        font-size: 14px;
    }

    .profile .about p,
    .profile .other_info p {
        font-size: 12px;
        margin-top: 10px;
        color: var(--grey-color);
    }

    .profile .other_info {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
    }

    .profile .student_from_same_class img {
        width: 30px;
        height: 30px;
        object-fit: cover;
        background-position: center;
        margin-left: -8px;
    }

    .profile .student_from_same_class img:nth-child(1) {
        margin-left: 0 !important;
    }

    .profile .student_from_same_class h4 {
        font-weight: 600;
        font-size: 14px;
        margin: 10px 0;
    }
    .profile .student_same_class_img span {
        color: #5bb9c0;
        font-size: 14px;
        margin-left: 12px;
    }

    /*----- Media Query -----*/

    @media (max-width: 500px) {
        /*----- left_sidebar -----*/
        .left_sidebar {
            transform: translateX(-150%);
            overflow: hidden;
            z-index: 100;
            position: fixed;
            top: 0;
            left: 0;
            background-color: #fff;
            width: 330px;
            height: 100%;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
                0 6px 6px rgba(0, 0, 0, 0.23);
        }
        .left_sidebar .close_hamburger_btn {
            display: block;
        }
        .left_sidebar .logo h2 {
            margin-top: 100px;
            margin-bottom: 20px;
            color: #000;
        }
        .left_sidebar .menu_items .menu_item {
            font-size: 16px;
        }
        /*----- right_sidebar -----*/
        .right_sidebar {
            transform: translateX(150%);
            overflow: hidden;
            z-index: 100;
            position: fixed;
            top: 0;
            right: 0;
            background-color: #fff;
            width: 100%;
            height: 100%;
            overflow: scroll;
        }
        .right_sidebar .profile {
            gap: 25px;
            padding: 25px;
            text-align: center;
        }
        .profile .other_info {
            justify-content: center;
        }
        .profile .name_and_class P,
        .profile .about h4,
        .profile .other_info h4 {
            font-size: 15px;
            color: #000;
        }
        .profile .name_and_class span {
            font-size: 15px;
        }
        .profile .about p,
        .profile .other_info p,
        .profile .student_from_same_class h4 {
            font-size: 14px;
        }
        /*----- Main Content -----*/
        .main_content {
        }
        .main_content .left_right_sidebar_opener {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .main_content .left_right_sidebar_opener .hamburger {
            text-align: left;
            display: inline;
        }
        input::placeholder {
            font-size: 14px;
        }
    }
</style>
