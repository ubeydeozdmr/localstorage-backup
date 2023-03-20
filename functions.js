function localStorageBackup() {
  const backup = {};
  Object.keys(localStorage).forEach((key) => {
    const value = localStorage.getItem(key);
    backup[key] = encodeURIComponent(value);
  });
  const json = JSON.stringify(backup);
  const base = btoa(json);
  const href = 'data:text/javascript;charset=utf-8;base64,' + base;
  const link = document.createElement('a');
  link.setAttribute('download', `backup_${new Date().toLocaleString()}.json`);
  link.setAttribute('href', href);
  document.querySelector('body').appendChild(link);
  link.click();
  link.remove();
}

function localStorageRestore() {
  const div = document.createElement('div');
  const anchor = document.createElement('a');
  anchor.appendChild(document.createTextNode('X'));
  anchor.setAttribute('href', '#');

  anchor.style.position = 'absolute';
  anchor.style.top = '10px';
  anchor.style.right = '10px';
  anchor.style['text-decoration'] = 'none';
  anchor.style.color = '#fff';
  div.appendChild(anchor);
  anchor.onclick = function () {
    div.remove();
  };
  div.style.width = '50%';
  div.style.position = 'absolute';
  div.style.top = '25%';
  div.style.left = '25%';
  div.style['background-color'] = 'gray';
  div.style['text-align'] = 'center';
  div.style.padding = '50px';
  div.style.color = '#fff';
  div.style['z-index'] = 10000;

  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('id', 'fileinput');
  input.onchange = function (e) {
    div.remove();
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const text = e.target.result;
        const backup = JSON.parse(text);
        for (const key in backup) {
          const value = decodeURIComponent(backup[key]);
          localStorage.setItem(key, value);
        }
        alert('Imported ' + Object.keys(backup).length + ' items from backup.');
      };
      reader.readAsText(file);
    } else {
      alert('Failed to load file');
    }
  };
  const h3 = document.createElement('h3');
  h3.appendChild(document.createTextNode('Select file with backup'));
  div.appendChild(h3);
  div.appendChild(input);
  document.querySelector('body').appendChild(div);
}

function localStorageClear() {
  if (
    window.confirm(
      `Do you really want to delete all ${localStorage.length} localStorage items of this website?`,
    )
  ) {
    localStorage.clear();
  }
}
