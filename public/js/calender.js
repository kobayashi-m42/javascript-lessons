(() => {
  let targetYear;
  let targetMonth;

  const previous = document.getElementById('previous');
  const next = document.getElementById('next');
  const thisMonth = document.getElementById('this_month');
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

  /**
   * 対象の年月を表示する
   *
   */
  const displayTargetDate = () => {
    document.getElementById('targetYear').textContent = targetYear;
    document.getElementById('targetMonth').textContent = targetMonth;
  };

  /**
   * カレンダーを画面に表示する
   */
  const displayCalender = () => {
    const tbody = document.querySelector('tbody');
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }

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
    displayTargetDate();
  };

  /**
   * 対象年月を翌月にする
   */
  const increaseMonth = () => {
    targetMonth += 1;
    if (targetMonth > 12) {
      targetMonth = 1;
      targetYear += 1;
    }
  };

  /**
   * 対象年月を前月にする
   */
  const decreaseMonth = () => {
    targetMonth -= 1;
    if (targetMonth < 1) {
      targetMonth = 12;
      targetYear -= 1;
    }
  };

  /**
   * カレンダーを初期化する
   */
  const initCalender = () => {
    const today = new Date();
    targetYear = today.getFullYear();
    targetMonth = today.getMonth() + 1;
    createCalender();
    displayCalender();
  };

  previous.addEventListener('click', e => {
    e.preventDefault();
    targetYear = Number(document.getElementById('targetYear').textContent);
    targetMonth = Number(document.getElementById('targetMonth').textContent);
    decreaseMonth();
    createCalender();
    displayCalender();
  });

  next.addEventListener('click', e => {
    e.preventDefault();
    targetYear = Number(document.getElementById('targetYear').textContent);
    targetMonth = Number(document.getElementById('targetMonth').textContent);
    increaseMonth();

    createCalender();
    displayCalender();
  });

  thisMonth.addEventListener('click', e => {
    e.preventDefault();
    initCalender();
  });
})();
