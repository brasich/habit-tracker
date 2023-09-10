<script lang="ts">
    export let id: Number;
    export let name: String;
    export let description: String;
    export let current_value: String;

    let final_value: String = current_value;

    function handleChange() {
        const response = fetch("/api/goals", {
            method: "POST",
            body: JSON.stringify({ new_value: final_value, id: id }),
            headers: { "Content-Type": "application/json" },
        });
    }
</script>

<article>
    <h4>{name}</h4>
    <p>{description}</p>
    <form>
        <input
            type="text"
            name="contents"
            bind:value={final_value}
            on:input={handleChange}
        />
    </form>
</article>
