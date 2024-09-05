import { redis } from '../../utils/redis';
import * as taskService from '../task.services';

jest.mock('../../utils/redis');

const mockPrismaClient = {
  task: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  comment: {
    create: jest.fn(),
  },
};

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrismaClient)
}));

jest.mock('../task.services', () => {
  const actualModule = jest.requireActual('../task.services');
  return {
    ...actualModule,
    prisma: mockPrismaClient,
  };
});

describe('Task Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTask', () => {
    it('should create a task and clear cache', async () => {
      const mockTask = { id: 1, title: 'Test Task' };
      mockPrismaClient.task.create.mockResolvedValue(mockTask);

      const result = await taskService.createTask(mockTask);

      expect(mockPrismaClient.task.create).toHaveBeenCalledWith({ data: mockTask });
      expect(redis.del).toHaveBeenCalledWith('tasks');
      expect(result).toEqual(mockTask);
    });
  });

  describe('getTasks', () => {
    it('should return cached tasks if available', async () => {
      const cachedTasks = [{ id: 1, title: 'Cached Task' }];
      (redis.get as jest.Mock).mockResolvedValue(JSON.stringify(cachedTasks));

      const result = await taskService.getTasks();

      expect(redis.get).toHaveBeenCalledWith('tasks');
      expect(result).toEqual(cachedTasks);
    });

    it('should fetch tasks from database if not cached', async () => {
      const dbTasks = [{ id: 1, title: 'DB Task', comments: [] }];
      (redis.get as jest.Mock).mockResolvedValue(null);
      mockPrismaClient.task.findMany.mockResolvedValue(dbTasks);

      const result = await taskService.getTasks();

      expect(redis.get).toHaveBeenCalledWith('tasks');
      expect(mockPrismaClient.task.findMany).toHaveBeenCalledWith({ include: { comments: true } });
      expect(redis.set).toHaveBeenCalledWith('tasks', JSON.stringify(dbTasks), { EX: 300 });
      expect(result).toEqual(dbTasks);
    });
  });
});