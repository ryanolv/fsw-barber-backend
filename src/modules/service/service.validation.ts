import { z } from "zod";

export const createServiceSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Service name is required",
        invalid_type_error: "Service name must be a string",
      })
      .min(3, { message: "Service name must be at least 3 characters long" }),

    price: z
      .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      })
      .positive({ message: "Price must be a positive number" }),

    description: z.string().optional().nullable(),

    image_url: z.string().url({ message: "Image URL must be a valid URL" }).optional().nullable(),
  }),
  params: z.object({
    barberShopId: z.string().uuid({ message: "BarberShop ID must be a valid UUID" }),
  }),
});

export type CreateServiceBodyInput = z.infer<typeof createServiceSchema>["body"];
export type CreateServiceParamsInput = z.infer<typeof createServiceSchema>["params"];
