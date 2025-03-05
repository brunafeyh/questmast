import { z } from "zod";

export const verificationSchema = z.object({
    email: z.string(),
    verificationEmailCode: z.string()
})

export type VerificationForm = z.infer<typeof verificationSchema>


export const updatePasswordVerificationFormSchema = z.object({
    newPassword: z.string(),
    resetPasswordCode: z.string()
})

export type UpdatePasswordVerificationForm = z.infer<typeof updatePasswordVerificationFormSchema>