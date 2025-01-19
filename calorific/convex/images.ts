import { v } from "convex/values";
import { action, internalMutation, mutation } from "./_generated/server";
import { internal } from "./_generated/api";

export const storeImage = action({
  args: {
    userId: v.string(),
    image: v.string(),
    results: v.object({
      food: v.string(),
      components: v.array(
        v.object({
          name: v.string(),
          calories: v.number(),
        })
      ),
    }),
  },
  handler: async (ctx, args) => {
    const userId = args.userId;

    // Convert base64 to binary using atob and Uint8Array
    const base64Data = args.image.split(",")[1] || args.image;
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: "image/jpeg" });
    const storageId = await ctx.storage.store(blob);

    await ctx.runMutation(internal.images.storeResult, {
      userId,
      image: storageId,
      results: args.results,
    });
    // return await ctx.db.insert("scannedMeals", {
    //   userId,
    //   food: args.results.food,
    //   date: new Date().toISOString(),
    //   imageStorageId: storageId,
    //   components: args.results.components,
    // });
  },
});

export const storeResult = internalMutation({
  args: {
    userId: v.string(),
    image: v.string(),
    results: v.object({
      food: v.string(),
      components: v.array(
        v.object({
          name: v.string(),
          calories: v.number(),
        })
      ),
    }),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("scannedMeals", {
      userId: args.userId,
      food: args.results.food,
      date: new Date().toISOString(),
      imageStorageId: args.image,
      components: args.results.components,
    });
  },
});
