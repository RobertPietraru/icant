<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<p>{data.user.email}</p>
<form action="?/logout" method="post">
<button class="btn variant-filled w-full mt-4 mb-2" formaction="?/logout">Logut</button>
</form>
