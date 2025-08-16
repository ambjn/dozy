import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTasks = query({
    handler: async (ctx) => {
        return await ctx.db.query("tasks").order("desc").collect()
    }
})

export const addTask = mutation({
    args: {
        text: v.string()
    },
    handler: async (ctx, args) => {
        const taskId = await ctx.db.insert("tasks", {
            text: args.text,
            isCompleted: false,
        })
        return taskId;
    }
})

export const toggleTask = mutation({
    args: {
        id: v.id("tasks")
    },
    handler: async (ctx, args) => {
        const task = await ctx.db.get(args.id)
        if (!task) throw new ConvexError("Task not found");
        return await ctx.db.patch(args.id, {
            isCompleted: !task.isCompleted,
        })
    }
})

export const deleteTask = mutation({
    args: {
        id: v.id("tasks")
    },
    handler: async (ctx, args) => {
        const task = await ctx.db.get(args.id)
        if (!task) throw new ConvexError("Task not found");
        return await ctx.db.delete(args.id)
    }
})

export const updateTask = mutation({
    args: {
        id: v.id("tasks"),
        text: v.string()
    },
    handler: async (ctx, args) => {
        const task = await ctx.db.get(args.id)
        if (!task) throw new ConvexError("Task not found");
        return await ctx.db.patch(args.id, {
            text: args.text
        })
    }
})

export const clearAllTasks = mutation({
    handler: async (ctx) => {
        const tasks = await ctx.db.query("tasks").collect()
        for (const task of tasks) {
            await ctx.db.delete(task._id)
        }
        return { deletedCount: tasks.length }
    }
})