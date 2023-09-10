import type { Goal } from "@prisma/client";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
    const response = await fetch('/api/goals')
    const goals: Goal[] = await response.json()
    return { goals }
}