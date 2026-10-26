import { z } from "zod";

export const createNoteSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters"),
  content: z
    .string()
    .trim()
    .min(1, "Content is required")
    .max(5000, "Content must be at most 5000 characters"),
});

// your PUT is a full replace, so it needs the same fields
export const updateNoteSchema = createNoteSchema;

// :id from the URL is always a string, so coerce it
export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("Invalid note id"),
});
