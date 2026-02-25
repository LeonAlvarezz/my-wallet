export const Success = <T>(data: T) => ({ success: true as const, data });
export const Fail = ({
  message,
  status,
  metadata,
}: {
  message: string;
  status: number;
  metadata?: Record<string, any>;
}) => ({
  success: false as const,
  error: {
    message,
    status,
    metadata,
  },
});

export const SimpleSuccess = (message?: string) => ({
  success: true,
  message: message ?? "Success",
});
