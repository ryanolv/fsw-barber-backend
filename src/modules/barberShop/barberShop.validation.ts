import { z } from "zod";

export const createBarberShopSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(3, { message: "Title must be at least 3 characters long" }),

  address: z
    .string({
      required_error: "Address is required",
      invalid_type_error: "Address must be a string",
    })
    .min(5, { message: "Address must be at least 5 characters long" }),

  phones: z
    .array(
      z.string({
        invalid_type_error: "Each phone number must be a string",
      }),
    )
    .nonempty({ message: "At least one phone number is required" })
    .refine((phones: string[]) => phones.every((phone: string) => /^\+?[1-9]\d{1,14}$/.test(phone)), {
      message: "All phone numbers must be valid E.164 format (e.g., +12125551212)",
    }),

  image_url: z.string().url({ message: "Image URL must be a valid URL" }).optional().nullable(),

  description: z.string().optional().nullable(),
});

export type CreateBarberShopInput = z.infer<typeof createBarberShopSchema>;

export const getBarberShopParamsSchema = z.object({
  params: z.object({
    barberShopId: z.string().uuid({ message: "BarberShop ID must be a valid UUID in the URL path." }),
  }),
});

export type GetBarberShopParamsInput = z.infer<typeof getBarberShopParamsSchema>["params"];

export const searchBarberShopsQuerySchema = z.object({
  query: z.object({
    q: z
      .string({
        required_error: "Search query 'q' is required.",
      })
      .min(1, { message: "Search query must be at least 1 character long." }),
  }),
});

export type SearchBarberShopsQueryInput = z.infer<typeof searchBarberShopsQuerySchema>["query"];
