(() => {
  const tableHeaders = document.getElementsByTagName('th');
  let sortOrder = 1;

  const rebuildTbody = rows => {
    const tbody = document.querySelector('tbody');
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
    for (let i = 0; i < rows.length; i += 1) {
      tbody.appendChild(rows[i]);
    }
  };

  const updateClassName = e => {
    for (let i = 0; i < tableHeadersLength; i += 1) {
      tableHeaders[i].className = '';
    }
    e.target.className = sortOrder === 1 ? 'asc' : 'desc';
  };

  const compare = (a, b, column, type) => {
    let compareA = a.children[column].textContent;
    let compareB = b.children[column].textContent;

    if (type === 'number') {
      compareA *= 1;
      compareB *= 1;
    } else if (type === 'string') {
      compareA = compareA.toLocaleLowerCase();
      compareB = compareB.toLocaleLowerCase();
    }

    if (compareA < compareB) {
      return -1;
    } else if (compareA > compareB) {
      return 1;
    }
    return 0;
  };

  const sortTable = e => {
    const rows = Array.prototype.slice.call(
      document.querySelectorAll('tbody > tr')
    );
    const column = e.target.cellIndex;
    const type = e.target.dataset;

    rows.sort((a, b) => compare(a, b, column, type.type) * sortOrder);

    rebuildTbody(rows);

    updateClassName(e);

    sortOrder *= -1;
  };

  const tableHeadersLength = tableHeaders.length;
  for (let i = 0; i < tableHeadersLength; i += 1) {
    tableHeaders[i].addEventListener('click', e => {
      sortTable(e);
    });
  }
})();
