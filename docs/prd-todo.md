# Product Requirements Document (PRD) - Todo App Upgrade

## 1. Overview

The Todo app currently supports basic tasks with a required title and a completed state. This upgrade will help users organize tasks by adding optional due dates, priority levels, and quick date-based filters while keeping the experience simple and teachable. The MVP will continue to use local storage and will not require backend changes.

---

## 2. MVP Scope

- Preserve the existing required `title` and completed state for each task.
- Add an optional `dueDate` field in ISO `YYYY-MM-DD` format.
- Ignore invalid `dueDate` values and treat them as absent.
- Add a required `priority` field with the allowed values `P1`, `P2`, and `P3`.
- Default `priority` to `P3` when no priority is provided.
- Display priority using color-coded badges:
  - `P1`: red
  - `P2`: orange
  - `P3`: gray
- Provide **All**, **Today**, and **Overdue** filters as quick-switch views.
- In the **All** view, show both completed and incomplete tasks.
- In the **Today** view, show only incomplete tasks due on the current date.
- In the **Overdue** view, show only incomplete tasks with a due date before the current date.
- Keep all task storage local, with no backend or external storage changes.

---

## 3. Post-MVP Scope

- Visually highlight overdue tasks, with red as the proposed highlight color.
- Automatically sort tasks in this order:
  1. Overdue tasks first
  2. Priority from `P1` to `P3`
  3. Due date in ascending order
  4. Tasks without a due date last

---

## 4. Out of Scope

- Notifications
- Recurring tasks
- Multi-user support
- Keyboard navigation and additional specialized accessibility features
- Backend changes
- External storage