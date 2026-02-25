import { requestClient } from "@/lib/request";

export const category = {
  getAll: () => requestClient.get("/categories"),
};
