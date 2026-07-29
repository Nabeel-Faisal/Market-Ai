/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("local_service_inquiries");

  const record0 = new Record(collection);
    record0.set("name", "Test");
    record0.set("email", "test@example.com");
    record0.set("phone", "0791234567");
    record0.set("city", "Zurich");
    record0.set("service", "Web Development");
    record0.set("message", "Test local service inquiry message");
    record0.set("status", "new");
  try {
    app.save(record0);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }
}, (app) => {
  // Rollback: record IDs not known, manual cleanup needed
})