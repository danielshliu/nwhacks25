import { query } from "./_generated/server";
import { v } from "convex/values";

export const listMeals = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("scannedMeals")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
  },
});

export const listMealImages = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const meals = await ctx.db
      .query("scannedMeals")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    return Promise.all(
      meals.map(async (meal) => {
        const image = await ctx.storage.getUrl(meal.imageStorageId);
        return {
          id: meal._id,
          imageUrl: image,
        };
      })
    );
  },
});
