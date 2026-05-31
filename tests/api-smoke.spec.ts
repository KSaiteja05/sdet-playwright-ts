import { expect, test } from "@playwright/test";

test("retail API health check is available", async ({ request }) => {
  const response = await request.get("/api/health");
  const body = await response.json();

  expect(response.ok()).toBeTruthy();
  expect(body).toEqual({ status: "ok", service: "sdet-retail-app" });
});
