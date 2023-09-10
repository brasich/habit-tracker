<script lang="ts">
    import type { PageData } from "./$types";
    import CheckGoal from "../CheckGoal.svelte";
    import TextGoal from "../TextGoal.svelte";
    import CountGoal from "../CountGoal.svelte";
    import { invalidate, invalidateAll } from "$app/navigation";

    export let data: PageData;

    async function getGoals() {
        const response = await fetch("api/goals");
        const goals: Goal[] = await response.json();
        return goals;
    }

    function resetDaily() {
        const response = fetch("/api/reset", {
            method: "POST",
            body: JSON.stringify({ reset_frequency: "daily" }),
            headers: { "Content-Type": "application/json" },
        });
        invalidateAll();
    }

    function resetWeekly() {
        const response = fetch("/api/reset", {
            method: "POST",
            body: JSON.stringify({ reset_frequency: "weekly" }),
            headers: { "Content-Type": "application/json" },
        });
        invalidateAll();
    }
</script>

<h1>Goal Tracker</h1>

<a href="/" data-sveltekit-reload on:click={resetDaily}>reset daily</a>
<a href="/" data-sveltekit-reload on:click={resetWeekly}>reset weekly</a>

{#each data.goals as goal}
    {#if goal.type == "text"}
        <TextGoal
            id={goal.id}
            name={goal.name}
            description={goal.description}
            current_value={goal.current_val}
        />
    {:else if goal.type == "check"}
        <CheckGoal
            id={goal.id}
            name={goal.name}
            current_value={goal.current_val}
            description={goal.description}
        />
    {:else if goal.type == "count"}
        <CountGoal
            id={goal.id}
            name={goal.name}
            current_value={goal.current_val}
            description={goal.description}
            target={goal.target}
        />
    {/if}
{/each}
