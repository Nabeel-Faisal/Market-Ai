/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("contact_submissions");

  const record0 = new Record(collection);
    record0.set("name", "Test User");
    record0.set("email", "test@example.com");
    record0.set("phone", "0791234567");
    record0.set("subject", "Test Subject");
    record0.set("message", "This is a test message for the contact form submission");
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