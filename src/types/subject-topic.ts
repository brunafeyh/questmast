import { z } from "zod"
import { subjectSchema } from "./subject"

export const subjectTopicSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    subject: subjectSchema
})

export type SubjectTopic = z.infer<typeof subjectTopicSchema>