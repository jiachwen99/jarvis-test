import { PrismaClient } from '@prisma/client';
import { redis } from '../utils/redis';

export const prisma = new PrismaClient();

export const createTask = async (data: any) => {
  const task = await prisma.task.create({ data });
  await redis.del('tasks');

  return task;
};

export const getTasks = async () => {
  const cachedTasks = await redis.get('tasks');
  if (cachedTasks) {
    return JSON.parse(cachedTasks);
  }

  const tasks = await prisma.task.findMany({
    include: {
      comments: true
    }
  });
  await redis.set('tasks', JSON.stringify(tasks), { EX: 300 });
  
  return tasks;
};

export const getTask = async (id: number) => {
  return prisma.task.findUnique({ where: { id } });
};

export const updateTask = async (id: number, data: any) => {
  const task = await prisma.task.update({ where: { id }, data });
  await redis.del('tasks');

  return task;
};

export const deleteTask = async (id: number) => {
  const task = await prisma.task.delete({ where: { id } });
  await redis.del('tasks');

  return task;
};

export const addComment = async (taskId: number, content: string) => {
  const comment = await prisma.comment.create({
    data: { content, taskId }
  });
  await redis.del('tasks');

  return comment;
};