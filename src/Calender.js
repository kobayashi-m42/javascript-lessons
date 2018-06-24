class Calender {
  static generateCalender(targetDate) {
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth() + 1;

    const calender = [];

    /**
     * 前月のカレンダーの日付を作成する
     *
     */
    const createPreviousMonth = () => {
      const prevMonthLastDate = new Date(targetYear, targetMonth - 1, 0);
      let prevMonthLastDay = prevMonthLastDate.getDate();
      let weekday = prevMonthLastDate.getDay();

      if (weekday === 6) {
        return;
      }

      while (weekday >= 0) {
        calender.unshift({
          day: prevMonthLastDay,
          weekday,
          month: 'previous'
        });

        prevMonthLastDay -= 1;
        weekday -= 1;
      }
    };

    /**
     * 翌月のカレンダーの日付を作成する
     *
     */
    const createNextMonth = () => {
      const nextMonthFirstDate = new Date(targetYear, targetMonth, 1);
      let nextMonthFirstDay = 1;
      let weekday = nextMonthFirstDate.getDay();

      if (weekday === 0) {
        return;
      }

      while (weekday <= 6) {
        calender.push({
          day: nextMonthFirstDay,
          weekday,
          month: 'next'
        });

        nextMonthFirstDay += 1;
        weekday += 1;
      }
    };

    /**
     * カレンダーの日付を作成する
     *
     */
    const createCalender = () => {
      calender.length = 0;
      const firstDate = new Date(targetYear, targetMonth - 1, 1);
      const lastDay = new Date(targetYear, targetMonth, 0).getDate();
      let weekday = firstDate.getDay();

      for (let i = 0; i < lastDay; i += 1) {
        calender[i] = {
          day: i + 1,
          weekday,
          month: 'target'
        };
        weekday += 1;

        if (weekday > 6) {
          weekday = 0;
        }
      }
      createPreviousMonth();
      createNextMonth();
    };

    createCalender();
    return calender;
  }

  /**
   * 対象の日付を取得する
   *
   * @param inputDate
   * @returns {Date}
   */
  static generateTargetDate(inputDate) {
    if (this.validateDate(inputDate)) {
      return new Date(Date.parse(inputDate));
    }
    return new Date();
  }

  /**
   * 日付のバリデーションを行う
   *
   * @param date
   * @returns {boolean}
   */
  static validateDate(date) {
    const regDate = /^\d{4}-{1}\d{2}/g;
    return regDate.test(date);
  }
}

module.exports = Calender;
