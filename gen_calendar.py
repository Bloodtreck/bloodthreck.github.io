import random
from itertools import combinations

# Все команды КХЛ 2024-2025 (23 команды)
teams = [
    'СКА', 'ЦСКА', 'Динамо Мск', 'Спартак', 'Сочи', 'Северсталь',
    'Локомотив', 'Торпедо НН', 'Витязь', 'Динамо Мн', 'Адмирал',
    'Ак Барс', 'Салават Юлаев', 'Трактор', 'Нефтехимик', 'Лада',
    'Авангард', 'Металлург Мг', 'Барыс', 'Автомобилист', 'Куньлунь РС', 'Амур', 'Сибирь'
]


def generate_schedule():
    schedule = []
    pairs = list(combinations(teams, 2))  # Все возможные пары

    for team1, team2 in pairs:
        # Генерируем 3 матча для каждой пары
        for i in range(3):
            # Случайный выбор домашней команды
            if random.choice([True, False]):
                schedule.append(f"{team1} : {team2}")
            else:
                schedule.append(f"{team2} : {team1}")

    # Перемешиваем матчи для реалистичности
    random.shuffle(schedule)

    return schedule


def save_to_file(schedule, filename='khl_schedule_3games.txt'):
    with open(filename, 'w', encoding='utf-8') as f:
        for i, match in enumerate(schedule, 1):
            f.write(f"{i}. {match}\n")


if __name__ == "__main__":
    schedule = generate_schedule()
    save_to_file(schedule)
    print(f"Календарь сохранён в khl_schedule_3games.txt")
    print(f"Всего матчей: {len(schedule)}")
    print(f"Матчей на команду: {len(schedule) * 2 // len(teams)}")  # Проверка баланса