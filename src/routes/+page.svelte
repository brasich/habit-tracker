<script lang="ts">
    import type { PageData } from "./$types";
    import CheckGoal from "../CheckGoal.svelte";
    import TextGoal from "../TextGoal.svelte";
    import CountGoal from "../CountGoal.svelte";
    import { invalidate, invalidateAll } from "$app/navigation";

    async function getGoals() {
        const response = await fetch("api/goals");
        const goals = await response.json();
        return goals;
    }

    function resetDaily() {
        const response = fetch("/api/reset", {
            method: "POST",
            body: JSON.stringify({ reset_frequency: "daily" }),
            headers: { "Content-Type": "application/json" },
        });
    }

    function resetWeekly() {
        const response = fetch("/api/reset", {
            method: "POST",
            body: JSON.stringify({ reset_frequency: "weekly" }),
            headers: { "Content-Type": "application/json" },
        });
    }
</script>

<h1>Goal Tracker</h1>

<a href="/" data-sveltekit-reload on:click={resetDaily}>reset daily</a>
<a href="/" data-sveltekit-reload on:click={resetWeekly}>reset weekly</a>

{#await getGoals() then goals}
    <div class="grid">
        <div>
            <h2>Daily</h2>
            {#each goals as goal}
                {#if goal.type == "check" && goal.reset_frequency == "daily"}
                    <CheckGoal
                        id={goal.id}
                        name={goal.name}
                        current_value={goal.current_val}
                        description={goal.description}
                    />
                {:else if goal.type == "count" && goal.reset_frequency == "daily"}
                    <CountGoal
                        id={goal.id}
                        name={goal.name}
                        current_value={goal.current_val}
                        description={goal.description}
                        target={goal.target}
                    />
                {/if}
            {/each}
        </div>
        <div>
            <h2>Weekly</h2>
            {#each goals as goal}
                {#if goal.type == "check" && goal.reset_frequency == "weekly"}
                    <CheckGoal
                        id={goal.id}
                        name={goal.name}
                        current_value={goal.current_val}
                        description={goal.description}
                    />
                {:else if goal.type == "count" && goal.reset_frequency == "weekly"}
                    <CountGoal
                        id={goal.id}
                        name={goal.name}
                        current_value={goal.current_val}
                        description={goal.description}
                        target={goal.target}
                    />
                {/if}
            {/each}
        </div>
    </div>
    {#each goals as goal}
        {#if goal.type == "text" && goal.reset_frequency == "daily"}
            <TextGoal
                id={goal.id}
                name={goal.name}
                description={goal.description}
                current_value={goal.current_val}
            />
        {/if}
    {/each}
{/await}

<a href="/" data-sveltekit-reload on:click={resetDaily}>reset daily</a>
<a href="/" data-sveltekit-reload on:click={resetWeekly}>reset weekly</a>
