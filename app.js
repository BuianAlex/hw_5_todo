import { MDCDialog } from '@material/dialog';

function toDate(time) {
  let datastring = '';
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  if (time) {
    const d = new Date(time);
    datastring = `${d.getHours()}:${d.getMinutes()} ${d.getDate()} ${
      months[d.getMonth()]
    } ${d.getFullYear()}`;
  }
  return datastring;
}

const testTasks = [
  {
    id: '1',
    name: 'Learn HTML',
    time: 1573082126942,
    status: true,
  },
  {
    id: '2',
    name: 'Learn CSS',
    time: 1573082126942,
    status: true,
  },
  {
    id: '3',
    name: 'JavaScript',
    time: 1573082126942,
    status: false,
  },
  {
    id: '4',
    name: 'Learn React',
    time: 1573082126942,
    status: false,
  },
  {
    id: '5',
    name: 'Learn Node.js',
    time: 1573082126942,
    status: false,
  },
  {
    id: '6',
    name: 'Learn how to rule the World',
    time: 1573082126942,
    status: false,
  },
];

class ToDo {
  constructor() {
    this.savedTasks = JSON.parse(localStorage.getItem('myTasks')) || testTasks;
    this.wrapNodeTaskList = document.querySelector('#task-list');
    this.calcSelected = document.querySelector('#calc-selected');
    this.select = [];
    this.calcSelected.textContent = ` ${this.select.length}`;
    this.renderTasks();
  }

  renderTasks() {
    localStorage.setItem('myTasks', JSON.stringify(this.savedTasks));
    this.wrapNodeTaskList.innerHTML = '';
    this.savedTasks.forEach((item) => {
      const taskseparator = document.createElement('li');
      taskseparator.setAttribute('role', 'separator');
      taskseparator.classList.add('mdc-list-divider');
      const oneTask = document.createElement('li');
      oneTask.classList.add('mdc-list-item');
      oneTask.setAttribute('data_id', item.id);
      oneTask.innerHTML = `
      <div class="mdc-form-field">
        <div class="mdc-checkbox">
          <input type="checkbox"
                class="mdc-checkbox__native-control"
                id="checkbox-1"/>
          <div class="mdc-checkbox__background">
            <svg class="mdc-checkbox__checkmark"
                viewBox="0 0 24 24">
              <path class="mdc-checkbox__checkmark-path"
                    fill="none"
                    d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
            </svg>
            <div class="mdc-checkbox__mixedmark"></div>
          </div>
          <div class="mdc-checkbox__ripple"></div>
      </div>
      </div>
      <span class="mdc-list-item__text" ${
  item.status ? 'style="text-decoration:line-through"' : false
}>${item.name}</span>
      <span class="mdc-list-item__text mdc-layout-grid--align-right">${toDate(
    item.time,
  )}</span>`;
      this.wrapNodeTaskList.appendChild(oneTask);
      this.wrapNodeTaskList.append(taskseparator);
    });
  }

  addTask(text) {
    this.savedTasks.push({
      id: (
        Date.now().toString(36)
        + Math.random()
          .toString(36)
          .substr(2, 5)
      ).toUpperCase(),
      name: text,
      time: Date.now(),
      status: false,
    });
    this.renderTasks();
  }

  addSelect(id) {
    this.select.push(id);
    this.calcSelected.textContent = ` ${this.select.length}`;
  }

  unSelect(id) {
    const temp = this.select.filter((item) => item !== id);
    this.select = temp;
    this.calcSelected.textContent = ` ${this.select.length}`;
  }

  deleteTask() {
    this.select.forEach((itemID) => {
      const temp = this.savedTasks.filter((item) => item.id !== itemID);
      this.savedTasks = temp;
    });
    this.select = [];
    this.calcSelected.textContent = ` ${this.select.length}`;
    this.renderTasks();
  }

  setDone() {
    this.select.forEach((itemID) => {
      this.savedTasks.map((item) => {
        if (item.id === itemID) {
          const newState = !item.status;
          return newState;
        }
        return item;
      });
    });
    this.select = [];
    this.calcSelected.textContent = ` ${this.select.length}`;
    this.renderTasks();
  }
}

const newTodo = new ToDo();
const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
const addButton = document.querySelector('#add-task');

document.addEventListener('change', (e) => {
  if (e.target.type === 'checkbox') {
    if (e.target.checked) {
      newTodo.addSelect(e.target.closest('li').getAttribute('data_id'));
    } else {
      newTodo.unSelect(e.target.closest('li').getAttribute('data_id'));
    }
  }
});

document.addEventListener('keydown', (e) => {
  if (e.target.type === 'text') {
    const saveBtn = document.querySelector(
      'button[data-mdc-dialog-action="save"]',
    );
    if (e.target.value.length >= 3) {
      saveBtn.disabled = false;
    } else {
      saveBtn.disabled = true;
    }
  }
});

document
  .querySelector('#delete-task')
  .addEventListener('click', () => newTodo.deleteTask());

document
  .querySelector('#set-done')
  .addEventListener('click', () => newTodo.setDone());

addButton.addEventListener('click', () => {
  dialog.open();
});

dialog.listen('MDCDialog:opened', () => {});

dialog.listen('MDCDialog:closing', (e) => {
  if (e.detail.action === 'save') {
    const taskName = document.querySelector('input[name = "task-name"]');
    newTodo.addTask(taskName.value);
    taskName.value = '';
  }
});
