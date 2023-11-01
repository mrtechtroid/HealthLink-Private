<script>
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';
    goto($page.params.chatID)
</script>