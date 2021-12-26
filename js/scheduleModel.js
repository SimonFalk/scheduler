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

    this.today = new Date();

    this.names = ["Ines", "Ellen", "Melker", "Simon", "Hannes", "Lena"];

    this.persons = [
      {
        email: "ines@test.com",
        room: 1101,
        name: "Ines",
        stars: {},
      },
      {
        email: "ellen@test.com",
        room: 1202,
        name: "Ellen",
        stars: {},
      },
      {
        email: "melker@test.com",
        room: 1201,
        name: "Melker",
        stars: {},
      },
      {
        email: "smnfalk@gmail.com",
        room: 1104,
        name: "Simon",
        stars: {},
      },
      {
        email: "hannes@test.com",
        room: 1103,
        name: "Hannes",
        stars: {},
      },
      {
        email: "lena@test.com",
        room: 1102,
        name: "Lena",
        stars: {},
      },
    ];

    this.stars = { Ines: 0, Ellen: 0, Melker: 0, Simon: 0, Hannes: 0, Lena: 0 };

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
  setUser(email) {
    this.user = email;
    this.notifyObservers();
  }
  setDate(date) {
    this.today = date;
    this.notifyObservers();
  }
  setBaseDate(date) {
    this.baseDate = date;
    this.tasks = [];
    this.generateDates(20).forEach((date) => this.calculateTasks(date));
    this.notifyObservers();
  }
  calculateMonths() {
    const today = new Date();
    return [0, 1, 2, 3].map((lag) => (today.getMonth() + lag) % 12);
  }
  generateDates(len) {
    const lastSunday = new Date(
      this.baseDate.getTime() - dayMilliSeconds * this.baseDate.getDay()
    );
    console.log(lastSunday.toLocaleDateString("en-US"));
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
          id: dutyId + (date.getTime() / 1000).toString().substring(0, 9),
          done: false,
          stars: 0,
          hasStarred: [],
        },
      ];
    }
    return;
  }
  calculateStars(toPerson) {
    this.stars = { ...this.stars, [toPerson]: this.stars[toPerson] + 1 };
    this.notifyObservers();
  }

  starTask(toPerson, taskId) {
    this.tasks = [...this.tasks].map((task) => {
      return task.id != taskId
        ? task
        : {
            ...task,
            hasStarred: [...task.hasStarred, this.user],
            stars: task.stars + 1,
          };
    });
    this.calculateStars(toPerson);
    this.notifyObservers();
  }
  setTaskState(id, state) {
    this.tasks = [...this.tasks].map((task) => {
      return task.id != id ? task : { ...task, done: state };
    });
    this.notifyObservers();
  }
}
