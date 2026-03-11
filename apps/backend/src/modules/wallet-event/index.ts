import Elysia from "elysia";
import { authGuard } from "../auth/guard";
import { OpenApiKey } from "../app/openapi";
import { BaseModel, SuccessSchema, WalletEventModel } from "@my-wallet/types";
import { WalletEventService } from "./wallet-event.service";
import { Success } from "@/core/response";

export const walletEvent = new Elysia()
  .use(authGuard)
  .group("/wallet-events", (app) => {
    app.post(
      "/",
      async ({ user, body }) => {
        const data = await WalletEventService.create(user.id, body);
        return Success(data);
      },
      {
        authenticated: true,
        body: WalletEventModel.CreateWalletEventBodySchema,
        detail: {
          summary: "Create Wallet Event",
          tags: [OpenApiKey.WalletEvent],
        },
        response: SuccessSchema(WalletEventModel.WalletEventSchema),
      },
    );

    app.put(
      "/:id",
      async ({ user, body, params }) => {
        const data = await WalletEventService.update(user.id, params.id, body);
        return Success(data);
      },
      {
        authenticated: true,
        params: BaseModel.NumberIdSchema,
        body: WalletEventModel.CreateWalletEventSchema,
        detail: {
          summary: "Update Wallet Event By ID",
          tags: [OpenApiKey.WalletEvent],
        },
        response: SuccessSchema(WalletEventModel.WalletEventSchema),
      },
    );

    app.delete(
      "/:id",
      async ({ user, params }) => {
        const data = await WalletEventService.delete(user.id, params.id);
        return Success(data);
      },
      {
        authenticated: true,
        params: BaseModel.NumberIdSchema,
        body: WalletEventModel.CreateWalletEventSchema,
        detail: {
          summary: "Delete Wallet Event By ID",
          tags: [OpenApiKey.WalletEvent],
        },
        response: SuccessSchema(WalletEventModel.WalletEventSchema),
      },
    );
    return app;
  });
