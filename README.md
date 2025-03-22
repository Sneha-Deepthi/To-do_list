# Get It Done - Todo List Application

A clean, user-friendly task management application that helps you organize and track your daily tasks with priority-based visualization.

## Features

- **Task Management**: Add, edit, and delete tasks with ease
- **Priority Levels**: Assign High, Medium, or Low priority to tasks
- **Task Status**: Mark tasks as complete/incomplete with a simple click
- **Task Counter**: Track completed vs. remaining tasks
- **Pagination**: Navigate through tasks with a user-friendly page system
- **Persistent Storage**: Tasks are saved in local storage for data persistence
- **Visual Indicators**: Color-coded priority markers for better task organization
- **Responsive Design**: Clean interface that works on various screen sizes

## Usage

1. **Adding Tasks**
   - Enter a task name in the input field
   - Select a priority level (High, Medium, Low)
   - Click the "Add" button

2. **Managing Tasks**
   - Click on a task to toggle between completed/incomplete status
   - Use the "Edit" button to modify task names
   - Use the "✖" button to delete tasks

3. **Navigation**
   - Use "Prev" and "Next" buttons to navigate between pages
   - Each page shows up to 4 tasks

## Technical Details

### Files

- **index.html**: Main structure of the application
- **styles.css**: Styling rules for the application
- **script.js**: JavaScript functionality

### Key JavaScript Functions

- `addTask()`: Creates a new task and adds it to storage
- `updateTaskStatus()`: Toggles task completion status
- `editTask()`: Enables inline editing of task names
- `removeTask()`: Deletes a task from the list
- `updatePagination()`: Handles task display based on current page
- `updateTaskCounter()`: Updates the completed/remaining tasks counter

### Storage

The application uses `localStorage` to save tasks between sessions, ensuring your data persists when you close or refresh the browser.

## Installation

1. Clone or download the repository
2. Open the `index.html` file in any modern web browser

No additional dependencies or installation steps are required.

## Customization

You can easily customize the application by modifying:

- Color scheme in the CSS file
- Number of tasks per page (modify `tasksPerPage` in script.js)
- Priority color indicators (modify the background colors in the addTaskToUI function)

## Browser Compatibility

The application works in all modern browsers that support:
- ES6 JavaScript
- Local Storage API
- Modern CSS features
