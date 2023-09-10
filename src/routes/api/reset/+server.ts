import { json, type RequestHandler } from "@sveltejs/kit";
import db from '$lib/database'

export const POST: RequestHandler = async (event) => {
    const request_json = await event.request.json()
    // Get all current goals
    const relevant_goals = await db.goal.findMany({
        where: {
            reset_frequency: request_json.reset_frequency
        },
        select: {
            id: true,
            reset_to: true
        }
    })
    // Filter down to just the goals we want to reset
    for (var goal of relevant_goals) {
        const updategoal = await db.goal.update({
            where: {
                id: goal.id
            },
            data: {
                current_val: goal.reset_to
            }
        })
    }
    //TODO:  Log current state of all goals
    //for (var snapshot_goal of all_goals) {
    //    await db.goalSnapshot.create({
    //        data: {
    //            name: snapshot_goal.name,
    //            target: snapshot_goal.target,
    //            current_val: snapshot_goal.current_val
    //        }
    //    })
    //}
    return json({ "success": "true" })
};