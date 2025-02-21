let sectionCount = 0;

function createSection() {
    if (sectionCount >= 6) return;
    sectionCount++;

    const section = document.createElement('div');
    section.className = 'calculation-section';
    section.innerHTML = `
        <div class="input-group">
            <label>Введите диаметр трубы:</label>
            <input type="number" class="input-field diameter" oninput="calculateArea(this)" placeholder="мм">
            <label>Введите длину трубы:</label>
            <input type="number" class="input-field length" oninput="calculateVolume(this)" placeholder="м">
            <p class="output">Площадь сечения: <span class="area">0</span> м²</p>
            <p class="output">Объём: <span class="volume">0</span> м³</p>
            <button class="copy-btn" onclick="copyResult(this)">Скопировать</button>
        </div>
    `;
    document.getElementById('calculationContainer').appendChild(section);

    updateAddButtonPosition();
}

function addSection() {
    createSection();
}

function calculateArea(input) {
    const section = input.closest('.calculation-section');
    const diameter = parseFloat(section.querySelector('.diameter').value);

    if (!isNaN(diameter)) {
        const area = (Math.PI * Math.pow(diameter / 1000, 2)) / 4;
        section.querySelector('.area').textContent = area.toFixed(4);

        // Обновляем объём, если уже введена длина
        const length = parseFloat(section.querySelector('.length').value);
        if (!isNaN(length)) {
            const volume = area * length;
            section.querySelector('.volume').textContent = volume.toFixed(4);
        }
    } else {
        section.querySelector('.area').textContent = '0';
        section.querySelector('.volume').textContent = '0';
    }
}

function calculateVolume(input) {
    const section = input.closest('.calculation-section');
    const area = parseFloat(section.querySelector('.area').textContent);
    const length = parseFloat(input.value);

    if (!isNaN(area) && !isNaN(length)) {
        const volume = area * length;
        section.querySelector('.volume').textContent = volume.toFixed(4);
    } else {
        section.querySelector('.volume').textContent = '0';
    }
}

function copyResult(button) {
  const section = button.closest('.calculation-section');
  const diameter = section.querySelector('.diameter').value;
  const area = section.querySelector('.area').textContent;
  const volume = section.querySelector('.volume').textContent;

  if (diameter) {
      const result = 
          `Площадь сечения трубы диаметром ⌀${diameter} мм равна: ${area} м²\n` +
          `Объём трубы диаметром ⌀${diameter} мм равен: ${volume} м³`;

      navigator.clipboard.writeText(result)
          .then(() => {
              // Изменяем текст и цвет кнопки
              button.textContent = 'Скопировано!';
              button.style.background = '#565fd3';
              button.style.cursor = 'default';

              // Возвращаем через 2 секунды, если нет ввода
              setTimeout(() => {
                  button.textContent = 'Скопировать';
                  button.style.background = '#28a745';
                  button.style.cursor = 'pointer';
              }, 2000);
          })
          .catch(err => console.error('Ошибка копирования:', err));
  } else {
      alert('Введите данные для копирования.');
  }
}



function updateAddButtonPosition() {
    const addBtn = document.getElementById('addSectionBtn');
    const container = document.getElementById('calculationContainer');
    addBtn.style.display = sectionCount < 6 ? 'block' : 'none';
    container.appendChild(addBtn);
}

// Создаём 2 стартовые строки (3 колонки по 2 ячейки = 6 максимум)
createSection();
createSection();
createSection();
