"use strict";

document.addEventListener('DOMContentLoaded', function() {
    // Элементы управления
    const sortElements = document.querySelectorAll(".sort");
    const addElement = document.getElementById("add");
    const calculateElement = document.getElementById("calculate");

    // Секции контента
    const contentSections = document.querySelectorAll(".content-section");

    // Массив для хранения истории матчей
    let matchesHistory = [];

    // Список команд с конференциями и дивизионами
    const teamList = [
        // Конференция Запад
        { name: "Витязь", id: "vityaz", conference: "west", division: "bobrov" },
        { name: "Динамо Мск", id: "dinamo-moscow", conference: "west", division: "tarasov" },
        { name: "Динамо Мн", id: "dinamo-minsk", conference: "west", division: "tarasov" },
        { name: "Локомотив", id: "lokomotiv", conference: "west", division: "tarasov" },
        { name: "Северсталь", id: "severstal", conference: "west", division: "bobrov" },
        { name: "СКА", id: "ska", conference: "west", division: "bobrov" },
        { name: "Спартак", id: "spartak", conference: "west", division: "bobrov" },
        { name: "ХК Сочи", id: "sochi", conference: "west", division: "tarasov" },
        { name: "ЦСКА", id: "cska", conference: "west", division: "tarasov" },
        { name: "Торпедо НН", id: "torpedo", conference: "west", division: "tarasov" },
        { name: "Куньлунь РС", id: "kunlun", conference: "west", division: "tarasov" },

        // Конференция Восток
        { name: "Авангард", id: "avangard", conference: "east", division: "chernyshev" },
        { name: "Автомобилист", id: "avtomobilist", conference: "east", division: "kharlamov" },
        { name: "Ак Барс", id: "ak-bars", conference: "east", division: "kharlamov" },
        { name: "Амур", id: "amur", conference: "east", division: "chernyshev" },
        { name: "Барыс", id: "barys", conference: "east", division: "chernyshev" },
        { name: "Металлург Мг", id: "metallurg", conference: "east", division: "kharlamov" },
        { name: "Нефтехимик", id: "neftekhimik", conference: "east", division: "kharlamov" },
        { name: "Салават Юлаев", id: "salavat-yulaev", conference: "east", division: "chernyshev" },
        { name: "Сибирь", id: "sibir", conference: "east", division: "kharlamov" },
        { name: "Трактор", id: "traktor", conference: "east", division: "kharlamov" },
        { name: "Адмирал", id: "admiral", conference: "east", division: "chernyshev" },
        { name: "Лада", id: "lada", conference: "east", division: "kharlamov" }
    ];

    // Заголовки таблиц
    const tableHeaders = `
        <tr>
            <th>Клуб</th>
            <th>И</th>
            <th>В</th>
            <th>ВО</th>
            <th>ВБ</th>
            <th>ПБ</th>
            <th>ПО</th>
            <th>П</th>
            <th>Ш</th>
            <th>О</th>
        </tr>
    `;

    // Инициализация всех таблиц
    function initializeTables() {
        // Инициализация таблиц конференций
        initConferenceTable('west');
        initConferenceTable('east');

        // Инициализация таблиц дивизионов
        initDivisionTable('bobrov');
        initDivisionTable('tarasov');
        initDivisionTable('kharlamov');
        initDivisionTable('chernyshev');

        // Инициализация таблицы чемпионата
        initChampionshipTable();
    }

    // Инициализация таблицы конференции
    function initConferenceTable(conference) {
        const table = document.querySelector(`.${conference}`);
        if (!table) return;

        table.querySelector('thead').innerHTML = tableHeaders;
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';

        const conferenceTeams = teamList.filter(team => team.conference === conference);
        conferenceTeams.forEach(team => {
            addTeamToTable(tbody, team);
        });
    }

    // Инициализация таблицы дивизиона
    function initDivisionTable(division) {
        const table = document.querySelector(`.${division}`);
        if (!table) return;

        table.querySelector('thead').innerHTML = tableHeaders;
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';

        const divisionTeams = teamList.filter(team => team.division === division);
        divisionTeams.forEach(team => {
            addTeamToTable(tbody, team);
        });
    }

    // Инициализация таблицы чемпионата
    function initChampionshipTable() {
        const table = document.querySelector('.championship');
        if (!table) return;

        table.querySelector('thead').innerHTML = tableHeaders;
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';

        teamList.forEach(team => {
            addTeamToTable(tbody, team);
        });
    }

    // Добавление команды в таблицу
    function addTeamToTable(tbody, team) {
        const row = document.createElement('tr');
        row.id = team.id;
        row.innerHTML = `
            <td>
                <img src="img/${team.id}.png" alt="${team.name}">
                <span class="club-name">${team.name}</span>
            </td>
            <td class="games">0</td>
            <td class="wins">0</td>
            <td class="wins-ot">0</td>
            <td class="wins-pen">0</td>
            <td class="lose-pen">0</td>
            <td class="lose-ot">0</td>
            <td class="lose">0</td>
            <td class="goals">0</td>
            <td class="points">0</td>
        `;
        tbody.appendChild(row);
    }

    // Функция для генерации случайного числа
    function getRandomNumber(min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min));
    }

    // Обработчик переключения между видами таблиц
    function switchViewHandler() {
        sortElements.forEach(el => el.classList.remove("active"));
        this.classList.add("active");

        contentSections.forEach(section => {
            section.classList.remove("active-section");
        });

        const targetSection = document.getElementById(this.id === "4" ? "results" :
                                        this.id === "3" ? "championship" :
                                        this.id === "2" ? "divisions" : "conference");
        targetSection.classList.add("active-section");
    }

    // Обработчик для кнопки "Добавить матч"
    function addMatchHandler() {
        document.getElementById("match-result").style.display = "none";
        document.getElementById("match-form").style.display = "flex";

        document.getElementById("home").value = "";
        document.getElementById("guests").value = "";
        document.getElementById("home-score").textContent = "0";
        document.getElementById("guest-score").textContent = "0";

        const otElement = document.getElementById("OT");
        const penElement = document.getElementById("P");
        if (otElement) otElement.remove();
        if (penElement) penElement.remove();

        document.querySelectorAll(".team-image").forEach(img => img.remove());
    }

    // Функция для обновления списка матчей
    function updateMatchesList() {
    const matchesList = document.getElementById("matches-list");
    matchesList.innerHTML = '';

    if (matchesHistory.length === 0) {
        matchesList.innerHTML = '<p class="no-matches">Нет сохраненных результатов</p>';
        return;
    }

    matchesHistory.forEach((match, index) => {
        const matchItem = document.createElement('div');
        matchItem.className = 'match-item';

        matchItem.innerHTML = `
            <div class="match-teams">
                <img src="${match.homeLogo}" alt="${match.homeTeam}" class="team-image small">
                <span>${match.homeTeam}</span>
                <span class="match-score">${match.homeScore}:${match.guestScore}</span>
                <span>${match.guestTeam}</span>
                <img src="${match.guestLogo}" alt="${match.guestTeam}" class="team-image small">
            </div>
            <div class="match-info">
                ${match.extraInfo ? `<span class="match-extra">${match.extraInfo}</span>` : ''}
                <span class="match-date">${match.date}</span>
            </div>
            <button class="delete-match" data-index="${index}">× Удалить</button>
        `;

        matchesList.appendChild(matchItem);
    });

    // Добавляем обработчики для кнопок удаления
    document.querySelectorAll('.delete-match').forEach(btn => {
        btn.addEventListener('click', deleteMatchHandler);
    });
    }

    // Функция для обработки удаления матча
function deleteMatchHandler() {
    if (!confirm('Удалить этот матч из истории? Статистика будет пересчитана.')) {
        return;
    }

    const index = parseInt(this.getAttribute('data-index'));
    const matchToDelete = matchesHistory[index];

    // Удаляем матч из истории
    matchesHistory.splice(index, 1);

    // Пересчитываем статистику для всех матчей
    resetAllTables();
    recalculateAllStatistics();

    // Обновляем список матчей
    updateMatchesList();
}

    // Функция для сброса всех таблиц
function resetAllTables() {
    const allTeamRows = document.querySelectorAll('tbody tr');
    allTeamRows.forEach(row => {
        row.querySelector('.games').textContent = '0';
        row.querySelector('.wins').textContent = '0';
        row.querySelector('.wins-ot').textContent = '0';
        row.querySelector('.wins-pen').textContent = '0';
        row.querySelector('.lose-pen').textContent = '0';
        row.querySelector('.lose-ot').textContent = '0';
        row.querySelector('.lose').textContent = '0';
        row.querySelector('.goals').textContent = '0';
        row.querySelector('.points').textContent = '0';
    });
}

    // Функция для перерасчета статистики
function recalculateAllStatistics() {
    matchesHistory.forEach(match => {
        const homeTeam = teamList.find(t => t.name === match.homeTeam);
        const guestTeam = teamList.find(t => t.name === match.guestTeam);

        if (!homeTeam || !guestTeam) return;

        const isOT = match.extraInfo === 'OT';
        const isPenalty = match.extraInfo === 'Б';
        const isHomeWinner = parseInt(match.homeScore) > parseInt(match.guestScore);

        updateTeamStats(homeTeam.id, isHomeWinner, isOT, isPenalty);
        updateTeamStats(guestTeam.id, !isHomeWinner, isOT, isPenalty);
    });
}

    // Обновление статистики команды в таблице
    function updateTeamStats(teamId, isWinner, isOT, isPenalty) {
        // Обновляем во всех таблицах, где есть эта команда
        const teamRows = document.querySelectorAll(`#${teamId}`);

        teamRows.forEach(row => {
            if (!row) return;

            // Обновляем количество игр
            const gamesCell = row.querySelector('.games');
            gamesCell.textContent = parseInt(gamesCell.textContent) + 1;

            // Обновляем очки и статистику в зависимости от исхода
            const pointsCell = row.querySelector('.points');
            let currentPoints = parseInt(pointsCell.textContent);

            if (isWinner) {
                if (isOT) {
                    // Победа в овертайме
                    const winsOTCell = row.querySelector('.wins-ot');
                    winsOTCell.textContent = parseInt(winsOTCell.textContent) + 1;
                    pointsCell.textContent = currentPoints + 2;
                } else if (isPenalty) {
                    // Победа по буллитам
                    const winsPenCell = row.querySelector('.wins-pen');
                    winsPenCell.textContent = parseInt(winsPenCell.textContent) + 1;
                    pointsCell.textContent = currentPoints + 2;
                } else {
                    // Обычная победа
                    const winsCell = row.querySelector('.wins');
                    winsCell.textContent = parseInt(winsCell.textContent) + 1;
                    pointsCell.textContent = currentPoints + 2;
                }
            } else {
                if (isOT) {
                    // Поражение в овертайме
                    const loseOTCell = row.querySelector('.lose-ot');
                    loseOTCell.textContent = parseInt(loseOTCell.textContent) + 1;
                    pointsCell.textContent = currentPoints + 1;
                } else if (isPenalty) {
                    // Поражение по буллитам
                    const losePenCell = row.querySelector('.lose-pen');
                    losePenCell.textContent = parseInt(losePenCell.textContent) + 1;
                    pointsCell.textContent = currentPoints + 1;
                } else {
                    // Обычное поражение
                    const loseCell = row.querySelector('.lose');
                    loseCell.textContent = parseInt(loseCell.textContent) + 1;
                }
            }

            // Сортируем таблицу после обновления
            sortTable(row.closest('table'));
        });
    }

    // Функция для сортировки таблицы
    function sortTable(table) {
        const tbody = table.querySelector("tbody");
        if (!tbody) return;

        const rows = Array.from(tbody.rows);
        const pointsColIndex = 9; // Колонка с очками (0-based индекс)

        rows.sort((rowA, rowB) => {
            const pointsA = parseInt(rowA.cells[pointsColIndex].textContent);
            const pointsB = parseInt(rowB.cells[pointsColIndex].textContent);
            return pointsB - pointsA;
        });

        // Очищаем и перезаполняем tbody
        tbody.innerHTML = '';
        rows.forEach(row => tbody.appendChild(row));
    }

    // Обработчик для расчета результата матча
    function calculateResultHandler() {
        const homeTeamInput = document.getElementById("home").value.trim();
        const guestTeamInput = document.getElementById("guests").value.trim();

        if (!homeTeamInput || !guestTeamInput) {
            alert("Пожалуйста, введите названия обеих команд");
            return;
        }

        const homeTeam = teamList.find(team => team.name === homeTeamInput);
        const guestTeam = teamList.find(team => team.name === guestTeamInput);

        if (!homeTeam || !guestTeam) {
            alert("Одна или обе команды не найдены. Проверьте правильность ввода.");
            return;
        }

        document.getElementById("match-form").style.display = "none";
        const matchResult = document.getElementById("match-result");
        matchResult.style.display = "flex";

        const homeTeamSpan = document.getElementById("hometeam");
        const guestTeamSpan = document.getElementById("guestteam");

        homeTeamSpan.textContent = homeTeam.name;
        guestTeamSpan.textContent = guestTeam.name;

        homeTeamSpan.insertAdjacentHTML("beforebegin",
            `<img src="img/${homeTeam.id}.png" alt="${homeTeam.name}" class="team-image">`);
        guestTeamSpan.insertAdjacentHTML("afterend",
            `<img src="img/${guestTeam.id}.png" alt="${guestTeam.name}" class="team-image">`);

        const homeScore = document.getElementById("home-score");
        const guestScore = document.getElementById("guest-score");

        homeScore.textContent = getRandomNumber(0, 5);
        guestScore.textContent = getRandomNumber(0, 5);

        let isOT = false;
        let isPenalty = false;
        let extraInfo = '';

        // Если ничья, определяем исход в овертайме или по буллитам
        if (homeScore.textContent === guestScore.textContent) {
            const decider = getRandomNumber(1, 3);

            if (decider === 1) {
                homeScore.textContent = +homeScore.textContent + 1;
                guestScore.insertAdjacentHTML("afterend", '<span id="OT">OT</span>');
                extraInfo = 'OT';
                isOT = true;
            }
            else if (decider === 2) {
                guestScore.textContent = +guestScore.textContent + 1;
                guestScore.insertAdjacentHTML("afterend", '<span id="OT">OT</span>');
                extraInfo = 'OT';
                isOT = true;
            }
            else {
                const penWinner = getRandomNumber(1, 2);
                if (penWinner === 1) {
                    homeScore.textContent = +homeScore.textContent + 1;
                    guestScore.insertAdjacentHTML("afterend", '<span id="P">Б</span>');
                    extraInfo = 'Б';
                    isPenalty = true;
                } else {
                    guestScore.textContent = +guestScore.textContent + 1;
                    guestScore.insertAdjacentHTML("afterend", '<span id="P">Б</span>');
                    extraInfo = 'Б';
                    isPenalty = true;
                }
            }
        }

        // Определяем победителя
        const isHomeWinner = +homeScore.textContent > +guestScore.textContent;

        // Обновляем статистику команд
        updateTeamStats(homeTeam.id, isHomeWinner, isOT, isPenalty);
        updateTeamStats(guestTeam.id, !isHomeWinner, isOT, isPenalty);

        // Сохраняем результат в историю
        matchesHistory.unshift({
            homeTeam: homeTeam.name,
            guestTeam: guestTeam.name,
            homeScore: homeScore.textContent,
            guestScore: guestScore.textContent,
            extraInfo: extraInfo,
            homeLogo: `img/${homeTeam.id}.png`,
            guestLogo: `img/${guestTeam.id}.png`,
            date: new Date().toLocaleString()
        });

        // Обновляем список матчей
        updateMatchesList();
    }

    // Назначаем обработчики событий
    sortElements.forEach(el => el.addEventListener("click", switchViewHandler));
    addElement.addEventListener("click", addMatchHandler);
    calculateElement.addEventListener("click", calculateResultHandler);

    // Инициализируем таблицы
    initializeTables();
});