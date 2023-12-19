import z from "zod";

export const DingloIOMessageValidator = z.object({
    message: z.string({required_error:"Message field is required"}).min(1, "Please provide a message"),
});
export type DingloIORequest = z.infer<typeof DingloIOMessageValidator>;