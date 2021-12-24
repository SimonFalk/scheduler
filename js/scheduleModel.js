const dayMilliSeconds = 24 * 3600 * 1000;

function generateDates() {
  const today = new Date(2022, 0, 5);
  const lastSunday = new Date(
    today.getTime() - dayMilliSeconds * today.getUTCDay()
  );
  return [0, 1, 2, 3].map((lag) => {
    return new Date(lastSunday.getTime() + lag * 7 * dayMilliSeconds);
  });
}

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

    this.dates = generateDates();

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
    generateDates().forEach((date) => this.calculateTasks(date));
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
  calculateMonths() {
    const today = new Date();
    return [0, 1, 2, 3].map((lag) => (today.getMonth() + lag) % 12);
  }
  calculateTasks(date) {
    for (let dutyId = 0; dutyId < this.duties.length; dutyId++) {
      this.tasks = [
        ...this.tasks,
        {
          duty: this.duties[dutyId],
          person: this.persons[(getWeek(date) + dutyId * 2) % 6].name,
          date: date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
          }),
          id: dutyId + (date.getTime() / 1000).toString().substring(3),
          done: false,
        },
      ];
    }
    return;
  }
  toggleTaskState(id) {
    const objIndex = this.tasks.findIndex((obj) => obj.id == id);
    this.tasks = this.tasks.map((task) => {
      return task.id != id ? task : { ...task, done: !task.done };
    });
    console.log(this.tasks);
    this.notifyObservers();
  }
}
