<script lang="ts">
    import { json } from "@sveltejs/kit";

    export let id: Number;
    export let name: String;
    export let current_value: String;
    export let description: String;
    export let target: String;

    let count = +current_value;

    function handleDecrement() {
        count -= 1;
        const response = fetch("/api/goals", {
            method: "POST",
            body: JSON.stringify({ new_value: count.toString(), id: id }),
            headers: { "Content-Type": "application/json" },
        });
    }

    function handleIncrement() {
        count += 1;
        const response = fetch("/api/goals", {
            method: "POST",
            body: JSON.stringify({ new_value: count.toString(), id: id }),
            headers: { "Content-Type": "application/json" },
        });
    }
</script>

<article>
    <h4>{name}</h4>
    <p>{description}</p>
    {count}/{target}
    <div style="display:flex">
        <button on:click={handleDecrement}>-</button>
        <button on:click={handleIncrement}>+</button>
        <div class="spacer" />
    </div>
    <progress value={count / +target} max="1" />
</article>

<style>
    button {
        width: 30%;
        margin-left: 0px;
        margin-right: 5%;
        margin-bottom: 1em;
    }
    .spacer {
        width: 30%;
    }
</style>
