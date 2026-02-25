import z from "zod";

export const FailSchema = (errorSchema: any = z.any()) =>
  z.object({
    success: z.literal(false),
    error: errorSchema,
  });

export const SuccessSchema = <T>(data: T) =>
  z.object({
    success: z.literal(true),
    data,
  });

export const SimpleSuccessSchema = () =>
  z.object({
    success: z.boolean().default(true),
    message: z.string().default("Success"),
  });

export type ApiResult<T> = ApiSuccess<T> | ApiFail;

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiFail = {
  success: false;
  error: {
    message: string;
    status: number;
  };
};
