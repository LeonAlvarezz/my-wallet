/**
 * 该文件可自行根据业务逻辑进行调整
 */
import type { RequestClientOptions } from "@my-wallet/api-client";

// import { useAppConfig } from "@vben/hooks";
// import { preferences } from "@vben/preferences";
import {
  //   authenticateResponseInterceptor,
  defaultResponseInterceptor,
  RequestClient,
} from "@my-wallet/api-client";
import { errorMessageResponseInterceptor } from "@my-wallet/api-client";
import type { ApiFail } from "@my-wallet/types";
import { toast } from "sonner";

// const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);

function createRequestClient(baseURL: string, options?: RequestClientOptions) {
  const client = new RequestClient({
    ...options,
    baseURL,
  });

  // /**
  //  * 重新认证逻辑
  //  */
  //   async function doReAuthenticate() {
  // console.warn("Access token or refresh token is invalid or expired. ");
  // const accessStore = useAccessStore();
  // const authStore = useAuthStore();
  // accessStore.setAccessToken(null);
  // if (
  //   preferences.app.loginExpiredMode === "modal" &&
  //   accessStore.isAccessChecked
  // ) {
  //   accessStore.setLoginExpired(true);
  // } else {
  //   await authStore.logout();
  // }
  //   }

  /**
   * 刷新token逻辑
   */
  // async function doRefreshToken() {
  //   const accessStore = useAccessStore();
  //   const resp = await refreshTokenApi();
  //   const newToken = resp.data;
  //   accessStore.setAccessToken(newToken);
  //   return newToken;
  // }

  //   function formatToken(token: null | string) {
  //     return token ? `Bearer ${token}` : null;
  //   }

  // 请求头处理
  //   client.addRequestInterceptor({
  //     fulfilled: async () => {
  //       //   const accessStore = useAccessStore();
  //       //   config.headers.Authorization = formatToken(accessStore.accessToken);
  //       //   return config;
  //     },
  //   });

  // 处理返回的响应数据格式
  client.addResponseInterceptor(
    defaultResponseInterceptor({
      codeField: "code",
      dataField: "data",
      successCode: 0,
    }),
  );

  //   // token过期的处理
  //   client.addResponseInterceptor(
  //     authenticateResponseInterceptor({
  //       client,
  //       doReAuthenticate,
  //       enableRefreshToken: preferences.app.enableRefreshToken,
  //       formatToken,
  //     }),
  //   );

  // 通用的错误处理,如果没有进入上面的错误处理逻辑，就会进入这里
  client.addResponseInterceptor(
    errorMessageResponseInterceptor((msg: string, error) => {
      const responseData: ApiFail = error?.response?.data ?? {};
      console.log("responseData:", responseData.error.message);
      toast.error(responseData.error.message || msg);
    }),
  );

  return client;
}

export const requestClient = createRequestClient(import.meta.env.VITE_API_URL, {
  responseReturn: "raw",
});

export const baseRequestClient = new RequestClient({
  baseURL: import.meta.env.VITE_API_URL,
});
