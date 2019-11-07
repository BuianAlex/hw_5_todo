import { MDCRipple } from '@material/ripple/index';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCList } from '@material/list';
import { MDCCheckbox } from '@material/checkbox';
import { MDCMenu } from '@material/menu';
import { MDCFormField } from '@material/form-field';
import { MDCDialog } from '@material/dialog';

Number.prototype.toDate = function () {
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
  if (this) {
    const d = new Date(this);
    datastring = `${d.getHours()}:${d.getMinutes()} ${d.getDate()} ${
      months[d.getMonth()]
    } ${d.getFullYear()}`;
  }
  return datastring;
};

document.addEventListener('change', (e) => {
  if (e.target.checked) {
    newTodo.addSelected(e.target.closest('li').getAttribute('data_id'));
  } else {
    newTodo.dellSelected(e.target.closest('li').getAttribute('data_id'));
  }
});
document
  .querySelector('#delete-task')
  .addEventListener('click', () => newTodo.deleteTask());

const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);
const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));

// const list = new MDCList(document.querySelector('.mdc-list'));
// const listItemRipples = list.listElements.map(
//   (listItemEl) => new MDCRipple(listItemEl),
// );
// const fabRipple = new MDCRipple(document.querySelector('.mdc-fab'));
// const checkbox = new MDCCheckbox(document.querySelector('.mdc-checkbox'));
// const formField = new MDCFormField(document.querySelector('.mdc-form-field'));
// formField.input = checkbox;
// const iconButtonRipple = new MDCRipple(
//   document.querySelector('.mdc-icon-button'),
// );
// iconButtonRipple.unbounded = true;

// const menu = new MDCMenu(document.querySelector('.mdc-menu'));
// menu.open = false;

// const menuButton = document.querySelector('#show_menu');
// menuButton.addEventListener('click', () => {
//   menu.open = !menu.open;
// });
const addButton = document.querySelector('#add-task');
addButton.addEventListener('click', () => {
  dialog.open();
});
dialog.listen('MDCDialog:opened', () => {
  // Assuming contentElement references a common parent element with the rest of the page's content
  console.log(dialog);
});

dialog.listen('MDCDialog:closing', () => {
  console.log();
});

const testTasks = [
  {
    id: 1,
    name: 'Learn HTML',
    time: 1573082126942,
    status: true,
  },
  {
    id: 2,
    name: 'Learn CSS',
    time: 1573082126942,
    status: true,
  },
  {
    id: 3,
    name: 'JavaScript',
    time: 1573082126942,
    status: false,
  },
  {
    id: 4,
    name: 'Learn React',
    time: 1573082126942,
    status: false,
  },
  {
    id: 5,
    name: 'Learn Node.js',
    time: 1573082126942,
    status: false,
  },
  {
    id: 6,
    name: 'Learn how to rule the World',
    time: 1573082126942,
    status: false,
  },
];

class ToDo {
  constructor() {
    this.savedTasks = localStorage.getItem('myTasks') || testTasks;
    this.wrapNodeTaskList = document.querySelector('#task-list');
    this.calcSelected = document.querySelector('#calc-selected');
    this.select = [];
    this.calcSelected.textContent = ` ${this.select.length}`;
    this.renderTasks();
  }

  renderTasks() {
    this.wrapNodeTaskList.innerHTML = '';
    this.savedTasks.forEach((item) => {
      const taskseparator = document.createElement('li');
      taskseparator.setAttribute('role', 'separator');
      taskseparator.classList.add('mdc-list-divider');

      const oneTask = document.createElement('li');
      oneTask.classList.add('mdc-list-item');
      oneTask.setAttribute('data_id', item.id);
      oneTask.innerHTML = `<div class="mdc-form-field">
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
    <span class="mdc-list-item__text mdc-layout-grid--align-right">${item.time.toDate()}</span>
      `;
      this.wrapNodeTaskList.appendChild(oneTask);
      this.wrapNodeTaskList.append(taskseparator);
    });
  }

  addTask() {}

  addSelected(id) {
    const intId = parseInt(id, 10);
    this.select.push(intId);
    this.calcSelected.textContent = ` ${this.select.length}`;
  }

  dellSelected(id) {
    const intId = parseInt(id, 10);
    const temp = this.select.filter((item) => item !== intId);
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
}

const newTodo = new ToDo();
