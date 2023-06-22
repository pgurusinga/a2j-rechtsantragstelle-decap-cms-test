import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  acceptCookiesFieldName,
  createTrackingCookie,
} from "~/services/analytics/gdprCookie.server";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const fieldContent = formData.get(acceptCookiesFieldName);
  let consent = undefined;
  if (fieldContent === "true") consent = true;
  else if (fieldContent === "false") consent = false;
  const cookie = await createTrackingCookie({ request, consent });
  return json({ success: true }, { headers: { "Set-Cookie": cookie } });
};