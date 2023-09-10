import { json, type RequestHandler } from "@sveltejs/kit";
import db from '$lib/database'

export const GET: RequestHandler = async (event) => {
    const goals = await db.goal.findMany()
    event.setHeaders({
        'Cache-Control': 'no-cache, no-store, must-revalidate'
    })
    return json(goals)
};

export const POST: RequestHandler = async (event) => {
    const request_json = await event.request.json()
    const updategoal = await db.goal.update({
        where: {
            id: request_json.id
        },
        data: {
            current_val: request_json.new_value
        }
    })
    return json({ "success": "true" })
};