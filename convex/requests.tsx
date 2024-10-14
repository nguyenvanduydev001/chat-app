import { ConvexError } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const get = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Không có quyền truy cập");
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!currentUser) {
      throw new ConvexError("Không tìm thấy người dùng");
    }

    const requests = await ctx.db
      .query("requests")
      .withIndex("by_receiver", (q) => q.eq("receiver", currentUser._id))
      .collect();

    const requestsWitSender = await Promise.all(
      requests.map(async (request) => {
        const sender = await ctx.db.get(request.sender);

        if (!sender) {
          throw new ConvexError("Không thể tìm thấy người gửi yêu cầu");
        }

        return { sender, request };
      })
    );

    return requestsWitSender;
  },
});

export const count = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Không có quyền truy cập");
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!currentUser) {
      throw new ConvexError("Không tìm thấy người dùng");
    }

    const requests = await ctx.db
      .query("requests")
      .withIndex("by_receiver", (q) => q.eq("receiver", currentUser._id))
      .collect();

    return requests.length;
  },
});
