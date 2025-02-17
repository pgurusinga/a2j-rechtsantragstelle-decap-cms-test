import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { consentCookieFromRequest } from "~/services/analytics/gdprCookie.server";

export const loader = () => redirect("/");

export const action = async ({ request }: ActionFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const clientJavaScriptAvailable = searchParams.get("js");

  const cookie = await consentCookieFromRequest({ request });
  const headers = { "Set-Cookie": cookie };

  if (clientJavaScriptAvailable) {
    return json({ success: true }, { headers });
  }

  return redirect("/cookie-einstellungen", { headers });
};
