<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { browser } from "$app/environment";
    import { onDestroy } from "svelte";
    import { onMount } from 'svelte';
    import Dashboard from "../../../components/Dashboard.svelte";
</script>

<Dashboard>
    <iframe style = "width:100%;height:90%;" allow="camera; microphone" src = {"https://mtt.one/minis/jitsimeet#/videocall/"+"HealthLink-" + $page.params.slug}></iframe>    
</Dashboard>