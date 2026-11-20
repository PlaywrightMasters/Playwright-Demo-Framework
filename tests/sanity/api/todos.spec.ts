import { expect, test } from '@fixtures';
import { readJson } from '@api/json';
import type { Todo } from '@api/types';

test.describe('Todos API', () => {
  for (const completed of [true, false]) {
    test(`filters a user's todos by completed=${completed}`, async ({ api }) => {
      const response = await api.getUserTodos(1, { completed });

      expect(response.ok()).toBeTruthy();
      const todos = await readJson<Todo[]>(response);
      expect(todos.length).toBeGreaterThan(0);
      for (const todo of todos) {
        expect(todo).toMatchObject({ userId: 1, completed });
      }
    });
  }
});
