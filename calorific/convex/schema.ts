import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    userId: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
  // create a table for scanned meals
  // with this schema
  // {
  //   "food": "Food Name",
  //   "components": [
  //     {
  //       "name": "Component Name",
  //       "calories": "Component Calories"
  //     }
  //   ]
  // }
  // and make sure they're associated with a user
  scannedMeals: defineTable({
    userId: v.string(),
    food: v.string(),
    date: v.string(),
    imageStorageId: v.string(),
    components: v.array(
      v.object({
        name: v.string(),
        calories: v.number(),
      })
    ),
  }).index("by_user_date", ["userId", "date"]),
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),
});

export default schema;
