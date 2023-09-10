<script lang="ts">
    export let id: Number;
    export let name: String;
    export let current_value: String;
    export let description: String;

    let is_checked = current_value == "1";

    function handleChange() {
        const response = fetch("/api/goals", {
            method: "POST",
            body: JSON.stringify({ new_value: is_checked ? "1" : "0", id: id }),
            headers: { "Content-Type": "application/json" },
        });
    }
</script>

<article>
    <h4>{name}</h4>
    <p>{description}</p>
    <form>
        <input
            type="checkbox"
            name="contents"
            bind:checked={is_checked}
            on:change={handleChange}
        />
    </form>
</article>
