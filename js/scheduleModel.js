const dayMilliSeconds = 24 * 3600 * 1000;

function getWeek(dateObj) {
  const newYearsEve = new Date(dateObj.getFullYear(), 0, 1);
  return Math.ceil(
    (dateObj.getTime() - newYearsEve.getTime()) / (dayMilliSeconds * 7)
  );
}

export default class ScheduleModel {
  constructor() {
    this.persistors = [];
    this.updatePersistors = true;
    this.observers = [];

    this.user = null;
    this.userError = "";
    this.today = new Date(2022, 1, 20);

    this.stars = { Ines: 0, Ellen: 0, Melker: 0, Simon: 0, Hannes: 0, Lena: 0 };
    this.persons = [
      {
        email: "ines@test.com",
        room: 1101,
        name: "Ines",
      },
      {
        email: "ellen.ode@outlook.com",
        room: 1202,
        name: "Ellen",
      },
      {
        email: "melker@test.com",
        room: 1201,
        name: "Melker",
      },
      {
        email: "smnfalk@gmail.com",
        room: 1104,
        name: "Simon",
      },
      {
        email: "hannes@test.com",
        room: 1103,
        name: "Hannes",
      },
      {
        email: "lena@test.com",
        room: 1102,
        name: "Lena",
      },
    ];
  }
  build() {
    console.log("Building model...");
    this.generateDates(24, new Date(2022, 0, 2), true).forEach((date) =>
      this.calculateTasks(date)
    );
  }
  addObserver(callback) {
    this.observers = [...this.observers, callback];
  }
  removeObserver(callback) {
    this.observers = this.observers.filter((ob) => ob !== callback);
  }
  notifyObservers() {
    this.observers.forEach((cb) => {
      try {
        cb();
      } catch (error) {
        // prevent one observer error from stopping the other callbacks to happen
      }
    });
  }
  setTasks(tasks) {
    this.tasks = [...tasks];
    this.notifyObservers();
  }
  setStars(stars) {
    this.stars = { ...stars };
    this.notifyObservers();
  }
  setUser(email) {
    if (email) {
      if (this.persons.map((obj) => obj.email).includes(email)) {
        this.user = this.persons.filter((obj) => obj.email === email)[0];
      }
    } else {
      this.userError =
        "The signed-in user is not linked to a room in Lucidor. Please contact klucidor@gmail.com and describe your problem.";
      this.user = null;
    }

    this.notifyObservers();
  }
  setDate(date) {
    this.today = date;
    this.notifyObservers();
  }
  generateDates(len, baseDate, reset) {
    if (reset) {
      this.tasks = [];
    }
    const lastSunday = new Date(
      baseDate.getTime() - dayMilliSeconds * baseDate.getDay()
    );
    return [...Array(len).keys()].map((lag) => {
      return new Date(lastSunday.getTime() + lag * 7 * dayMilliSeconds);
    });
  }
  calculateTasks(date) {
    this.tasks = [
      ...this.tasks,
      {
        person: this.persons[getWeek(date) % 6].name,
        date: date.getTime(),
        id: (date.getTime() / 1000).toString().substring(0, 9),
        done: false,
        stars: 0,
        hasStarred: {
          Ellen: false,
          Hannes: false,
          Ines: false,
          Lena: false,
          Melker: false,
          Simon: false,
        },
      },
    ];
    return;
  }
  calculateStars(toPerson, sign) {}

  starTask(toPerson, taskId, sign) {
    if (sign === 1) {
      this.tasks = [...this.tasks].map((task) => {
        return task.id != taskId
          ? task
          : {
              ...task,
              hasStarred: { ...task.hasStarred, [this.user.name]: true },
              stars: task.stars + 1,
            };
      });
    } else {
      this.tasks = [...this.tasks].map((task) => {
        return task.id != taskId
          ? task
          : {
              ...task,
              hasStarred: { ...task.hasStarred, [this.user.name]: false },
              stars: task.stars - 1,
            };
      });
    }
    this.stars = { ...this.stars, [toPerson]: this.stars[toPerson] + sign };
    this.notifyObservers();
  }
  setTaskState(id, state) {
    this.tasks = [...this.tasks].map((task) => {
      return task.id != id ? task : { ...task, done: state };
    });
    this.notifyObservers();
  }
}
