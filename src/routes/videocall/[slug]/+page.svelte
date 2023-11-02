<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { browser } from "$app/environment";
    import { onDestroy } from "svelte";
    import { onMount } from 'svelte';
</script>
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
        style="display: flex;flex-direction:column;background-color:white;width:100%;background-color:rgb(120, 230, 206);"
    >
    <div id = "div_main_head" style = "height:60px;background-color:#009688;padding:10px;display:flex;align-items:center;">
        <span style="font-size: 40px;">Video Chat</span>
    </div>
    <iframe style = "width:100%;height:90%;" allow="camera; microphone" src = {"https://mtt.one/minis/jitsimeet#/videocall/"+"HealthLink-" + $page.params.slug}></iframe>
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
