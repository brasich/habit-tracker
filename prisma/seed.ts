import { PrismaClient } from "@prisma/client";
import { TracingHelper } from "@prisma/client/runtime/library";
import * as fs from 'fs';

const db = new PrismaClient()

async function main() {
    const goalsJsonString = fs.readFileSync('prisma/goals.json', 'utf-8');
    const goals = JSON.parse(goalsJsonString);

    for (const goal of goals) {
        await db.goal.create({
            data: {
                name: goal.name,
                description: goal.description,
                type: goal.type,
                target: goal.target,
                reset_frequency: goal.reset_frequency,
                reset_to: goal.reset_to,
                current_val: goal.current_val
            }
        })
    }
}

main()