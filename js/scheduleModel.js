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

    this.baseDate = new Date();

    this.persons = [
      {
        name: "Ines",
        score: 0,
      },
      {
        name: "Ellen",
        score: 0,
      },
      {
        name: "Melker",
        score: 0,
      },
      {
        name: "Simon",
        score: 0,
      },
      {
        name: "Hannes",
        score: 0,
      },
      {
        name: "Lena",
        score: 0,
      },
    ];

    this.duties = ["Kitchen/recycling"];

    this.tasks = [];
    this.generateDates(20).forEach((date) => this.calculateTasks(date));
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
  setUser(user) {
    this.user = user;
    this.notifyObservers();
  }
  setDate(date) {
    this.date = date;
    this.notifyObservers()
  }
  calculateMonths() {
    const today = new Date();
    return [0, 1, 2, 3].map((lag) => (today.getMonth() + lag) % 12);
  }
  generateDates(len) {
    const lastSunday = new Date(this.baseDate.getTime() - dayMilliSeconds * this.baseDate.getUTCDay());
    return [...Array(len).keys()].map((lag) => {
      return new Date(lastSunday.getTime() + lag * 7 * dayMilliSeconds);
    });
  }
  calculateTasks(date) {
    for (let dutyId = 0; dutyId < this.duties.length; dutyId++) {
      this.tasks = [
        ...this.tasks,
        {
          duty: this.duties[dutyId],
          person: this.persons[(getWeek(date) + dutyId * 2) % 6].name,
          date: date,
          id: dutyId + (date.getTime() / 1000).toString().substring(0,9),
          done: false,
          stars: 0,
        },
      ];
    }
    return;
  }
  toggleTaskState(id) {
    const todayTime = new Date().getTime();
    const taskTime = this.tasks.filter((obj) => obj.id === id)[0].date;
    if ((todayTime - taskTime)>7*dayMilliSeconds || (taskTime > todayTime)) {
      return;
    }
    const objIndex = this.tasks.findIndex((obj) => obj.id == id);
    this.tasks = this.tasks.map((task) => {
      return task.id != id ? task : { ...task, done: !task.done };
    });
    this.notifyObservers();
  }
}
