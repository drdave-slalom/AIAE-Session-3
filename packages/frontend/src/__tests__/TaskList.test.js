import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import TaskList from '../TaskList';

const server = setupServer(
  rest.get('/api/tasks', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, title: 'Test Task 1', description: 'Desc 1', due_date: null, completed: 0 },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  window.localStorage.clear();
});
afterAll(() => server.close());

describe('TaskList priority selector', () => {
  test('defaults a task with no stored priority to P3', async () => {
    await act(async () => {
      render(<TaskList onEdit={() => {}} />);
    });
    await waitFor(() => {
      expect(screen.getByTestId('priority-P3-1')).toHaveAttribute('aria-pressed', 'true');
    });
    expect(screen.getByTestId('priority-P1-1')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTestId('priority-P2-1')).toHaveAttribute('aria-pressed', 'false');
  });

  test('selecting a priority acts like a radio button and persists it', async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<TaskList onEdit={() => {}} />);
    });
    await waitFor(() => {
      expect(screen.getByTestId('priority-P3-1')).toBeInTheDocument();
    });

    await user.click(screen.getByTestId('priority-P1-1'));

    expect(screen.getByTestId('priority-P1-1')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('priority-P3-1')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTestId('priority-P2-1')).toHaveAttribute('aria-pressed', 'false');

    expect(JSON.parse(window.localStorage.getItem('todoTaskPriorities'))).toEqual({ 1: 'P1' });
  });

  test('rejects an invalid priority value stored in local storage and falls back to P3', async () => {
    window.localStorage.setItem('todoTaskPriorities', JSON.stringify({ 1: 'HIGH' }));
    await act(async () => {
      render(<TaskList onEdit={() => {}} />);
    });
    await waitFor(() => {
      expect(screen.getByTestId('priority-P3-1')).toHaveAttribute('aria-pressed', 'true');
    });
  });
});
