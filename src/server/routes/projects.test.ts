import { describe, expect, test } from "vitest";
import { createApp } from "../app";
import { createTestDatabase } from "../test/test-db";

describe("project routes", () => {
  test("creates, lists, reads, updates, and deletes projects in SQLite", async () => {
    const testDb = createTestDatabase();
    const app = createApp({ db: testDb.db });

    const createResponse = await app.request("/api/projects", {
      method: "POST",
      body: JSON.stringify({
        title: "Pocket Fox",
        status: "active",
        yarnType: "Cotton blend",
        yarnWeight: "4 worsted",
        colorsUsed: "rust, cream",
        hookSize: "3.5mm",
        finishedSize: "6 inches",
        notes: "Use safety eyes after round 12.",
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    expect(createResponse.status).toBe(201);
    const created = await createResponse.json();
    expect(created.project).toMatchObject({
      id: "pocket-fox",
      title: "Pocket Fox",
      status: "active",
      hookSize: "3.5mm",
    });

    const listResponse = await app.request("/api/projects");
    expect(listResponse.status).toBe(200);
    const listed = await listResponse.json();
    expect(listed.projects).toHaveLength(1);
    expect(listed.projects[0].title).toBe("Pocket Fox");

    const readResponse = await app.request("/api/projects/pocket-fox");
    expect(readResponse.status).toBe(200);
    const read = await readResponse.json();
    expect(read.project.notes).toBe("Use safety eyes after round 12.");

    const updateResponse = await app.request("/api/projects/pocket-fox", {
      method: "PATCH",
      body: JSON.stringify({
        status: "paused",
        notes: "Paused until the replacement yarn arrives.",
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    expect(updateResponse.status).toBe(200);
    const updated = await updateResponse.json();
    expect(updated.project).toMatchObject({
      id: "pocket-fox",
      status: "paused",
      notes: "Paused until the replacement yarn arrives.",
    });

    const deleteResponse = await app.request("/api/projects/pocket-fox", {
      method: "DELETE",
    });
    expect(deleteResponse.status).toBe(204);

    const missingResponse = await app.request("/api/projects/pocket-fox");
    expect(missingResponse.status).toBe(404);

    testDb.sqlite.close();
  });

  test("rejects invalid create payloads", async () => {
    const testDb = createTestDatabase();
    const app = createApp({ db: testDb.db });

    const response = await app.request("/api/projects", {
      method: "POST",
      body: JSON.stringify({ title: "" }),
      headers: {
        "content-type": "application/json",
      },
    });

    expect(response.status).toBe(400);

    testDb.sqlite.close();
  });
});
