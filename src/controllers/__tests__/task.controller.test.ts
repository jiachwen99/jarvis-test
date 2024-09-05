import { Request, Response } from 'express';
import * as taskService from '../../services/task.services';
import * as taskController from '../task.controller';

jest.mock('../../services/task.services');

describe('Task Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  describe('createTask', () => {
    it('should create a task and return 201 status', async () => {
      const mockTask = { id: 1, title: 'New Task' };
      mockRequest.body = mockTask;
      (taskService.createTask as jest.Mock).mockResolvedValue(mockTask);

      await taskController.createTask(mockRequest as Request, mockResponse as Response, mockNext);

      expect(taskService.createTask).toHaveBeenCalledWith(mockTask);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTask);
    });

    it('should call next with error if service throws', async () => {
      const error = new Error('Service error');
      (taskService.createTask as jest.Mock).mockRejectedValue(error);

      await taskController.createTask(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('getTasks', () => {
    it('should return tasks', async () => {
      const mockTasks = [{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2' }];
      (taskService.getTasks as jest.Mock).mockResolvedValue(mockTasks);

      await taskController.getTasks(mockRequest as Request, mockResponse as Response, mockNext);

      expect(taskService.getTasks).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockTasks);
    });

    it('should call next with error if service throws', async () => {
      const error = new Error('Service error');
      (taskService.getTasks as jest.Mock).mockRejectedValue(error);

      await taskController.getTasks(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});