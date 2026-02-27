import Elysia from "elysia";
import { authGuard } from "../auth/guard";
import { TransactionService } from "./transaction.service";
import { SimpleSuccess, Success } from "@/core/response";
import { OpenApiKey } from "../app/openapi";
import {
  BaseModel,
  CursorModel,
  CursorPaginationSchema,
  SimpleSuccessSchema,
  SuccessSchema,
  TransactionModel,
} from "@my-wallet/types";

export const transaction = new Elysia()
  .use(authGuard)
  .group("/transactions", (app) => {
    app.get(
      "/",
      async ({ user }) => {
        const data = await TransactionService.findByUserId(user.id);
        return Success(data);
      },
      {
        authenticated: true,
        detail: {
          summary: "Get all transaction",
          tags: [OpenApiKey.Transaction],
        },
        response: SuccessSchema(
          TransactionModel.TransactionWithCategorySchema.array(),
        ),
      },
    );
    app.get(
      "/paginate",
      async ({ query }) => {
        const data = await TransactionService.cPaginate(query);
        return Success(data);
      },
      {
        // authenticated: true,
        query: TransactionModel.TransactionFilterSchema,
        detail: {
          summary: "Paginate transaction by user",
          tags: [OpenApiKey.Transaction],
        },
        response: SuccessSchema(
          CursorPaginationSchema(
            TransactionModel.TransactionWithCategorySchema.array(),
          ),
        ),
      },
    );
    app.get(
      "/:id",
      async ({ params: { id } }) => {
        const data = await TransactionService.findById(id);
        return Success(data);
      },
      {
        params: BaseModel.NumberIdSchema,
        detail: {
          summary: "Get transaction by ID",
          tags: [OpenApiKey.Transaction],
        },
        response: SuccessSchema(TransactionModel.TransactionSchema),
      },
    );

    app.post(
      "/",
      async ({ body, user }) => {
        const data = await TransactionService.create(body, user.id);
        return Success(data);
      },
      {
        parse: "application/json",
        body: TransactionModel.CreateTransactionSchema,
        authenticated: true,
        detail: {
          summary: "Create transaction",
          tags: [OpenApiKey.Transaction],
        },
        response: SuccessSchema(TransactionModel.TransactionSchema),
      },
    );
    app.put(
      "/:id",
      async ({ body, user, params: { id } }) => {
        const data = await TransactionService.update(id, user.id, body);
        return Success(data);
      },
      {
        parse: "application/json",
        body: TransactionModel.UpdateTransactionSchema,
        params: BaseModel.NumberIdSchema,
        authenticated: true,
        detail: {
          summary: "Update transaction by ID",
          tags: [OpenApiKey.Transaction],
        },
        response: SuccessSchema(TransactionModel.TransactionSchema),
      },
    );
    app.delete(
      "/:id",
      async ({ user, params: { id } }) => {
        await TransactionService.delete(id, user.id);
        return SimpleSuccess();
      },
      {
        params: BaseModel.NumberIdSchema,
        authenticated: true,
        detail: {
          summary: "Delete transaction by ID",
          tags: [OpenApiKey.Transaction],
        },
        response: SimpleSuccessSchema(),
      },
    );
    return app;
  });
