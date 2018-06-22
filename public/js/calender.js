(() => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const targetDate = document.getElementById('targetDate');
  const calender = [];

  /**
   * 対象の年月を表示する
   *
   * @param year
   * @param month
   */
  const displayTargetDate = (year, month) => {
    targetDate.textContent = `${year}年 ${month}月`;
  };

  /**
   * 前月のカレンダーの日付を作成する
   *
   * @param year
   * @param month
   */
  const createPreviousMonth = (year, month) => {
    const prevMonthLastDate = new Date(year, month - 1, 0);
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
   * @param year
   * @param month
   */
  const createNextMonth = (year, month) => {
    const nextMonthFirstDate = new Date(year, month, 1);
    let nextMonthFirstDay = 1;
    let weekday = nextMonthFirstDate.getDay();

    console.log(weekday);

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
   * @param year
   * @param month
   */
  const createCalender = (year, month) => {
    const firstDate = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0).getDate();
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
    createPreviousMonth(year, month);
    createNextMonth(year, month);
    displayTargetDate(year, month);
  };

  /**
   * カレンダーを画面に表示する
   */
  const displayCalender = () => {
    const tbody = document.querySelector('tbody');
    let tr = document.createElement('tr');

    for (let i = 0; i < calender.length; i += 1) {
      const td = document.createElement('td');
      td.textContent = calender[i].day;
      if (calender[i].month === 'target') {
        td.className = `youbi_${calender[i].weekday}`;
      } else {
        td.className = 'gray';
      }
      tr.appendChild(td);

      if (calender[i].weekday === 6) {
        tbody.appendChild(tr);
        tr = document.createElement('tr');
      }
    }

    tbody.appendChild(tr);
  };

  createCalender(currentYear, currentMonth);
  displayCalender();
})();
