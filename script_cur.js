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

    // Встроенный календарь матчей (первые 20 матчей для примера)
    const seasonSchedule = [
        "Лада : Авангард",
"Динамо Мн : Металлург Мг",
"Металлург Мг : Адмирал",
"Барыс : ХК Сочи",
"Сибирь : Лада",
"Барыс : Амур",
"Локомотив : Авангард",
"ХК Сочи : Трактор",
"Динамо Мн : Барыс",
"Сибирь : Салават Юлаев",
"Авангард : Торпедо НН",
"Спартак : ХК Сочи",
"Локомотив : Сибирь",
"Ак Барс : Куньлунь РС",
"Ак Барс : Северсталь",
"Металлург Мг : Куньлунь РС",
"Куньлунь РС : Барыс",
"Куньлунь РС : Торпедо НН",
"Витязь : Лада",
"Нефтехимик : Барыс",
"Нефтехимик : ЦСКА",
"Адмирал : Куньлунь РС",
"ЦСКА : Металлург Мг",
"Авангард : Амур",
"ЦСКА : Металлург Мг",
"Ак Барс : Металлург Мг",
"Локомотив : Трактор",
"Амур : Автомобилист",
"Салават Юлаев : Автомобилист",
"Лада : Авангард",
"Авангард : Спартак",
"Барыс : Ак Барс",
"Барыс : Сибирь",
"Северсталь : Трактор",
"ЦСКА : Лада",
"Динамо Мск : ЦСКА",
"Барыс : Витязь",
"Салават Юлаев : Лада",
"ХК Сочи : ЦСКА",
"Куньлунь РС : Динамо Мск",
"ЦСКА : Лада",
"Ак Барс : Нефтехимик",
"ХК Сочи : Нефтехимик",
"Северсталь : СКА",
"Авангард : Куньлунь РС",
"Динамо Мск : Локомотив",
"Нефтехимик : Адмирал",
"Авангард : Барыс",
"Динамо Мск : Северсталь",
"Адмирал : Локомотив",
"Металлург Мг : Нефтехимик",
"Динамо Мн : Спартак",
"Барыс : Автомобилист",
"Нефтехимик : ХК Сочи",
"Динамо Мн : Салават Юлаев",
"Трактор : Сибирь",
"ХК Сочи : Адмирал",
"Витязь : Ак Барс",
"Салават Юлаев : Динамо Мск",
"Лада : ЦСКА",
"Динамо Мск : Северсталь",
"Адмирал : Салават Юлаев",
"Витязь : Амур",
"Куньлунь РС : Витязь",
"Куньлунь РС : Динамо Мск",
"Автомобилист : Авангард",
"Трактор : Адмирал",
"Адмирал : Ак Барс",
"Сибирь : Динамо Мск",
"Динамо Мн : Динамо Мск",
"Амур : Лада",
"Северсталь : Авангард",
"Автомобилист : Трактор",
"Металлург Мг : Нефтехимик",
"Торпедо НН : Авангард",
"ХК Сочи : Спартак",
"Адмирал : Авангард",
"Адмирал : Нефтехимик",
"Локомотив : Динамо Мск",
"СКА : Ак Барс",
"Сибирь : Металлург Мг",
"Амур : Трактор",
"Металлург Мг : Трактор",
"Торпедо НН : ХК Сочи",
"Ак Барс : Нефтехимик",
"Динамо Мн : Трактор",
"Автомобилист : Динамо Мн",
"Витязь : Куньлунь РС",
"ЦСКА : Куньлунь РС",
"Северсталь : Салават Юлаев",
"Северсталь : Сибирь",
"Динамо Мск : Куньлунь РС",
"СКА : ХК Сочи",
"Куньлунь РС : Локомотив",
"ХК Сочи : Лада",
"Лада : Металлург Мг",
"Металлург Мг : Амур",
"Северсталь : Витязь",
"Лада : Витязь",
"Барыс : Динамо Мн",
"Динамо Мн : Амур",
"Ак Барс : Автомобилист",
"Витязь : Динамо Мн",
"ЦСКА : Динамо Мн",
"Торпедо НН : Ак Барс",
"Ак Барс : Автомобилист",
"СКА : Нефтехимик",
"Сибирь : Авангард",
"Северсталь : Барыс",
"Нефтехимик : Трактор",
"Сибирь : Куньлунь РС",
"Авангард : Куньлунь РС",
"Амур : ЦСКА",
"Ак Барс : Сибирь",
"Куньлунь РС : Нефтехимик",
"Спартак : Салават Юлаев",
"Торпедо НН : Лада",
"ЦСКА : Салават Юлаев",
"Адмирал : Автомобилист",
"Трактор : Торпедо НН",
"Металлург Мг : Спартак",
"СКА : Спартак",
"Барыс : ХК Сочи",
"Куньлунь РС : Амур",
"СКА : ЦСКА",
"Трактор : Автомобилист",
"Торпедо НН : ХК Сочи",
"Металлург Мг : Динамо Мск",
"Куньлунь РС : Витязь",
"Адмирал : Лада",
"Локомотив : Металлург Мг",
"Нефтехимик : ЦСКА",
"Торпедо НН : Амур",
"Локомотив : Лада",
"Северсталь : Куньлунь РС",
"Северсталь : Автомобилист",
"Адмирал : Локомотив",
"Авангард : ЦСКА",
"Локомотив : Автомобилист",
"Салават Юлаев : Металлург Мг",
"Динамо Мн : Динамо Мск",
"Северсталь : Спартак",
"Лада : Динамо Мск",
"СКА : Лада",
"Автомобилист : ХК Сочи",
"ЦСКА : Ак Барс",
"Нефтехимик : Салават Юлаев",
"Адмирал : Спартак",
"Динамо Мск : Локомотив",
"Куньлунь РС : Трактор",
"Динамо Мск : СКА",
"Барыс : Спартак",
"Локомотив : Сибирь",
"Адмирал : Металлург Мг",
"Металлург Мг : Куньлунь РС",
"Автомобилист : Сибирь",
"Лада : Куньлунь РС",
"Торпедо НН : Амур",
"Сибирь : ЦСКА",
"Нефтехимик : Авангард",
"Трактор : Барыс",
"Салават Юлаев : Динамо Мн",
"Спартак : Лада",
"Салават Юлаев : Куньлунь РС",
"Куньлунь РС : Динамо Мн",
"ЦСКА : Ак Барс",
"Трактор : Витязь",
"Автомобилист : Амур",
"Адмирал : Амур",
"Сибирь : Динамо Мн",
"Витязь : Барыс",
"Салават Юлаев : Лада",
"Трактор : Витязь",
"Барыс : СКА",
"Амур : Сибирь",
"Барыс : Автомобилист",
"Северсталь : Автомобилист",
"СКА : Амур",
"Куньлунь РС : ХК Сочи",
"СКА : Сибирь",
"Нефтехимик : Авангард",
"Куньлунь РС : Автомобилист",
"Трактор : Металлург Мг",
"Авангард : Северсталь",
"СКА : Адмирал",
"Динамо Мск : Металлург Мг",
"Салават Юлаев : Барыс",
"Авангард : ЦСКА",
"Динамо Мн : Сибирь",
"Трактор : Торпедо НН",
"Трактор : Торпедо НН",
"СКА : ЦСКА",
"Торпедо НН : Куньлунь РС",
"Барыс : СКА",
"Динамо Мн : Торпедо НН",
"Нефтехимик : Салават Юлаев",
"Витязь : Спартак",
"Ак Барс : Сибирь",
"Динамо Мск : СКА",
"Ак Барс : Лада",
"Нефтехимик : Северсталь",
"Амур : Куньлунь РС",
"Динамо Мск : Барыс",
"Динамо Мн : Салават Юлаев",
"ХК Сочи : Лада",
"Сибирь : Авангард",
"Трактор : Динамо Мск",
"Северсталь : Нефтехимик",
"Торпедо НН : Северсталь",
"Витязь : Автомобилист",
"Нефтехимик : ХК Сочи",
"Ак Барс : Куньлунь РС",
"Витязь : Авангард",
"Торпедо НН : Северсталь",
"Трактор : СКА",
"Трактор : Динамо Мск",
"Салават Юлаев : Адмирал",
"Лада : Барыс",
"СКА : Авангард",
"ХК Сочи : Ак Барс",
"Амур : ХК Сочи",
"Лада : Нефтехимик",
"Ак Барс : ХК Сочи",
"Салават Юлаев : Барыс",
"Салават Юлаев : Динамо Мск",
"Ак Барс : Металлург Мг",
"Трактор : Нефтехимик",
"Салават Юлаев : Витязь",
"Витязь : Салават Юлаев",
"Барыс : Динамо Мск",
"Амур : СКА",
"Динамо Мн : ХК Сочи",
"Спартак : Локомотив",
"ХК Сочи : ЦСКА",
"Сибирь : Ак Барс",
"Спартак : Сибирь",
"Салават Юлаев : Авангард",
"Куньлунь РС : Локомотив",
"Сибирь : Витязь",
"ЦСКА : Адмирал",
"Барыс : Северсталь",
"СКА : Северсталь",
"Салават Юлаев : Витязь",
"Лада : Амур",
"Локомотив : ЦСКА",
"ХК Сочи : Северсталь",
"СКА : Трактор",
"Спартак : ЦСКА",
"Нефтехимик : Спартак",
"Динамо Мск : Автомобилист",
"Северсталь : Салават Юлаев",
"Лада : Ак Барс",
"Северсталь : Салават Юлаев",
"ЦСКА : Барыс",
"Ак Барс : Динамо Мск",
"СКА : Нефтехимик",
"Лада : Салават Юлаев",
"Динамо Мн : Трактор",
"Авангард : СКА",
"ХК Сочи : Барыс",
"СКА : Нефтехимик",
"Авангард : Локомотив",
"Витязь : СКА",
"Куньлунь РС : Трактор",
"Ак Барс : ХК Сочи",
"Куньлунь РС : Торпедо НН",
"Автомобилист : ЦСКА",
"Барыс : Локомотив",
"Сибирь : Локомотив",
"ХК Сочи : Салават Юлаев",
"Салават Юлаев : Торпедо НН",
"Амур : Ак Барс",
"Северсталь : Динамо Мн",
"ЦСКА : Торпедо НН",
"Спартак : ХК Сочи",
"Трактор : Авангард",
"Лада : Амур",
"ЦСКА : Сибирь",
"Локомотив : Куньлунь РС",
"Спартак : Салават Юлаев",
"Амур : Трактор",
"Амур : Салават Юлаев",
"Динамо Мн : Металлург Мг",
"Спартак : Динамо Мск",
"Северсталь : ЦСКА",
"Витязь : Автомобилист",
"Барыс : Металлург Мг",
"Трактор : ЦСКА",
"Салават Юлаев : Трактор",
"Динамо Мск : Металлург Мг",
"Северсталь : Динамо Мн",
"Автомобилист : Северсталь",
"Торпедо НН : Ак Барс",
"Барыс : Витязь",
"Сибирь : Лада",
"Торпедо НН : Барыс",
"Витязь : Адмирал",
"Локомотив : Витязь",
"Авангард : Локомотив",
"Динамо Мск : Ак Барс",
"Ак Барс : Витязь",
"Барыс : Локомотив",
"Спартак : Куньлунь РС",
"Торпедо НН : Адмирал",
"Динамо Мск : Амур",
"Лада : Торпедо НН",
"ЦСКА : Витязь",
"Сибирь : Барыс",
"ХК Сочи : Динамо Мск",
"Торпедо НН : Адмирал",
"Динамо Мн : Авангард",
"СКА : Витязь",
"Динамо Мн : Локомотив",
"Северсталь : СКА",
"Металлург Мг : Салават Юлаев",
"ХК Сочи : Локомотив",
"Торпедо НН : Барыс",
"Ак Барс : Динамо Мн",
"Локомотив : Спартак",
"ЦСКА : Северсталь",
"Адмирал : Лада",
"Северсталь : Динамо Мск",
"Авангард : Северсталь",
"Адмирал : Сибирь",
"ЦСКА : Динамо Мск",
"Торпедо НН : Спартак",
"Локомотив : Ак Барс",
"Витязь : Динамо Мн",
"Спартак : Динамо Мск",
"Локомотив : ЦСКА",
"Амур : Динамо Мн",
"Лада : Локомотив",
"Динамо Мн : Витязь",
"Амур : Нефтехимик",
"Сибирь : Амур",
"Динамо Мск : Торпедо НН",
"Нефтехимик : Металлург Мг",
"Северсталь : Локомотив",
"Барыс : Автомобилист",
"Адмирал : Авангард",
"Спартак : Северсталь",
"Сибирь : Торпедо НН",
"Авангард : Трактор",
"Барыс : Адмирал",
"Динамо Мн : Адмирал",
"Динамо Мск : Ак Барс",
"ЦСКА : Динамо Мн",
"Спартак : Металлург Мг",
"Торпедо НН : Ак Барс",
"Нефтехимик : Северсталь",
"Ак Барс : Трактор",
"Барыс : Ак Барс",
"Амур : Нефтехимик",
"Витязь : Спартак",
"Барыс : Адмирал",
"Динамо Мн : Авангард",
"Витязь : Авангард",
"Лада : Спартак",
"Авангард : Динамо Мн",
"Нефтехимик : Адмирал",
"Витязь : Сибирь",
"Северсталь : Локомотив",
"СКА : Динамо Мн",
"Куньлунь РС : ЦСКА",
"Барыс : Сибирь",
"Лада : Нефтехимик",
"Динамо Мн : Металлург Мг",
"Северсталь : Сибирь",
"Спартак : Нефтехимик",
"Барыс : Амур",
"Трактор : СКА",
"Барыс : Торпедо НН",
"Северсталь : Лада",
"Куньлунь РС : Автомобилист",
"Сибирь : Металлург Мг",
"Витязь : Спартак",
"Барыс : Амур",
"Металлург Мг : Северсталь",
"Сибирь : Адмирал",
"Автомобилист : СКА",
"СКА : Лада",
"Динамо Мн : Лада",
"Барыс : Лада",
"Торпедо НН : Динамо Мн",
"Ак Барс : Локомотив",
"Спартак : СКА",
"Спартак : Автомобилист",
"Торпедо НН : Локомотив",
"Трактор : Барыс",
"Спартак : Авангард",
"СКА : Локомотив",
"Авангард : Барыс",
"Металлург Мг : Амур",
"Локомотив : Динамо Мн",
"ХК Сочи : Витязь",
"Лада : Металлург Мг",
"Трактор : ЦСКА",
"Авангард : ХК Сочи",
"Салават Юлаев : Авангард",
"СКА : Ак Барс",
"Амур : Авангард",
"ХК Сочи : Металлург Мг",
"Ак Барс : Амур",
"Адмирал : Витязь",
"Салават Юлаев : Авангард",
"Сибирь : Нефтехимик",
"Витязь : Северсталь",
"Амур : Трактор",
"Динамо Мск : Нефтехимик",
"СКА : ХК Сочи",
"Трактор : Нефтехимик",
"Лада : Автомобилист",
"Нефтехимик : Спартак",
"Локомотив : Витязь",
"Авангард : ХК Сочи",
"ХК Сочи : Металлург Мг",
"ХК Сочи : Металлург Мг",
"Локомотив : Автомобилист",
"Амур : Динамо Мск",
"Сибирь : Трактор",
"Локомотив : Северсталь",
"Адмирал : Спартак",
"Куньлунь РС : Сибирь",
"Амур : Северсталь",
"Адмирал : ХК Сочи",
"Северсталь : Витязь",
"Торпедо НН : Сибирь",
"Спартак : Ак Барс",
"СКА : Авангард",
"Металлург Мг : Северсталь",
"Лада : Торпедо НН",
"Витязь : Нефтехимик",
"Торпедо НН : Адмирал",
"СКА : Динамо Мн",
"СКА : Торпедо НН",
"Витязь : Ак Барс",
"Салават Юлаев : Сибирь",
"Торпедо НН : Автомобилист",
"Автомобилист : Нефтехимик",
"Салават Юлаев : Трактор",
"ХК Сочи : Сибирь",
"Лада : Куньлунь РС",
"Торпедо НН : Витязь",
"Автомобилист : Адмирал",
"Локомотив : Нефтехимик",
"Трактор : Металлург Мг",
"СКА : Металлург Мг",
"Адмирал : Спартак",
"Трактор : Барыс",
"Автомобилист : Спартак",
"Динамо Мск : Витязь",
"Амур : Нефтехимик",
"Нефтехимик : Торпедо НН",
"Салават Юлаев : ЦСКА",
"Авангард : Сибирь",
"Автомобилист : Авангард",
"Автомобилист : Локомотив",
"ХК Сочи : Сибирь",
"Сибирь : Торпедо НН",
"СКА : Лада",
"Динамо Мн : Автомобилист",
"СКА : Локомотив",
"Автомобилист : Куньлунь РС",
"Динамо Мск : ХК Сочи",
"Авангард : Спартак",
"Северсталь : ЦСКА",
"Торпедо НН : СКА",
"Торпедо НН : Динамо Мск",
"Ак Барс : Спартак",
"Металлург Мг : Витязь",
"Автомобилист : Торпедо НН",
"Динамо Мск : Авангард",
"Адмирал : Ак Барс",
"Металлург Мг : Салават Юлаев",
"Куньлунь РС : Сибирь",
"Спартак : Лада",
"Нефтехимик : Сибирь",
"Металлург Мг : СКА",
"Торпедо НН : Динамо Мн",
"Салават Юлаев : Локомотив",
"Локомотив : Амур",
"Нефтехимик : Авангард",
"Металлург Мг : Лада",
"ЦСКА : Витязь",
"Лада : Динамо Мн",
"Динамо Мн : ХК Сочи",
"Адмирал : Куньлунь РС",
"Куньлунь РС : Северсталь",
"Динамо Мск : Салават Юлаев",
"Спартак : Торпедо НН",
"Нефтехимик : Торпедо НН",
"Авангард : Трактор",
"Амур : Сибирь",
"ХК Сочи : Северсталь",
"Динамо Мн : Адмирал",
"Ак Барс : СКА",
"Автомобилист : ЦСКА",
"Металлург Мг : Сибирь",
"Динамо Мск : Сибирь",
"Барыс : Куньлунь РС",
"Куньлунь РС : СКА",
"Северсталь : Амур",
"Металлург Мг : Торпедо НН",
"Трактор : Ак Барс",
"Адмирал : СКА",
"Салават Юлаев : Автомобилист",
"Спартак : Салават Юлаев",
"Витязь : ХК Сочи",
"Ак Барс : Нефтехимик",
"Куньлунь РС : Динамо Мн",
"Сибирь : Спартак",
"Амур : ЦСКА",
"Салават Юлаев : Ак Барс",
"Витязь : Лада",
"Металлург Мг : Северсталь",
"Металлург Мг : Локомотив",
"Спартак : Сибирь",
"Спартак : Динамо Мн",
"Локомотив : Спартак",
"Спартак : Ак Барс",
"Сибирь : Трактор",
"Адмирал : ЦСКА",
"Динамо Мн : Динамо Мск",
"Витязь : Локомотив",
"Адмирал : Трактор",
"Амур : Адмирал",
"Амур : Локомотив",
"Трактор : Динамо Мск",
"Северсталь : Адмирал",
"Авангард : ЦСКА",
"ЦСКА : Динамо Мн",
"Динамо Мск : Автомобилист",
"Амур : Витязь",
"Адмирал : Северсталь",
"Северсталь : Ак Барс",
"Северсталь : Спартак",
"Салават Юлаев : СКА",
"Нефтехимик : Динамо Мск",
"Металлург Мг : Ак Барс",
"Сибирь : Нефтехимик",
"Нефтехимик : Торпедо НН",
"Лада : Нефтехимик",
"Локомотив : ХК Сочи",
"Локомотив : Нефтехимик",
"Куньлунь РС : Спартак",
"Авангард : Металлург Мг",
"Спартак : Трактор",
"Спартак : ЦСКА",
"Автомобилист : Лада",
"Динамо Мн : Куньлунь РС",
"Авангард : Ак Барс",
"Амур : Спартак",
"Лада : Динамо Мн",
"Амур : СКА",
"СКА : ЦСКА",
"Автомобилист : Адмирал",
"Салават Юлаев : Барыс",
"ЦСКА : Автомобилист",
"Амур : Автомобилист",
"СКА : Куньлунь РС",
"Куньлунь РС : Ак Барс",
"Металлург Мг : СКА",
"Витязь : Авангард",
"Локомотив : Торпедо НН",
"Нефтехимик : Куньлунь РС",
"Автомобилист : СКА",
"Авангард : Металлург Мг",
"ЦСКА : Торпедо НН",
"Динамо Мск : Лада",
"Куньлунь РС : Лада",
"Сибирь : СКА",
"Спартак : Трактор",
"Сибирь : Салават Юлаев",
"Автомобилист : СКА",
"Автомобилист : Салават Юлаев",
"Куньлунь РС : ЦСКА",
"Локомотив : Лада",
"Локомотив : Ак Барс",
"ЦСКА : Спартак",
"Торпедо НН : СКА",
"Амур : Ак Барс",
"Динамо Мн : Локомотив",
"Сибирь : Адмирал",
"Динамо Мн : Нефтехимик",
"Витязь : Нефтехимик",
"Амур : Динамо Мск",
"Адмирал : Витязь",
"Трактор : ЦСКА",
"Трактор : Автомобилист",
"Сибирь : Северсталь",
"Витязь : Металлург Мг",
"Сибирь : СКА",
"Локомотив : Салават Юлаев",
"Лада : Адмирал",
"Куньлунь РС : Адмирал",
"Спартак : СКА",
"Трактор : ХК Сочи",
"Торпедо НН : Динамо Мск",
"Авангард : Амур",
"Автомобилист : Динамо Мн",
"Витязь : Динамо Мск",
"Металлург Мг : Торпедо НН",
"ХК Сочи : Амур",
"Салават Юлаев : СКА",
"СКА : Салават Юлаев",
"Лада : Сибирь",
"Торпедо НН : Салават Юлаев",
"Салават Юлаев : Ак Барс",
"Нефтехимик : Динамо Мн",
"Северсталь : Динамо Мн",
"Нефтехимик : Автомобилист",
"Авангард : Металлург Мг",
"Металлург Мг : Торпедо НН",
"Витязь : Торпедо НН",
"Салават Юлаев : Ак Барс",
"Ак Барс : Барыс",
"Динамо Мск : Барыс",
"Салават Юлаев : Нефтехимик",
"Сибирь : ХК Сочи",
"Амур : Локомотив",
"Амур : Динамо Мн",
"Автомобилист : Спартак",
"Динамо Мн : СКА",
"Локомотив : Торпедо НН",
"ЦСКА : Металлург Мг",
"ХК Сочи : Локомотив",
"Авангард : Адмирал",
"Барыс : Нефтехимик",
"Витязь : Автомобилист",
"Торпедо НН : ХК Сочи",
"Северсталь : Трактор",
"Автомобилист : Металлург Мг",
"Металлург Мг : Амур",
"Барыс : Локомотив",
"Северсталь : Амур",
"Куньлунь РС : ХК Сочи",
"Динамо Мск : Адмирал",
"Амур : Салават Юлаев",
"Динамо Мск : Спартак",
"СКА : Куньлунь РС",
"Северсталь : Трактор",
"Северсталь : Ак Барс",
"Барыс : Куньлунь РС",
"Трактор : Адмирал",
"Барыс : СКА",
"ЦСКА : Барыс",
"Автомобилист : Металлург Мг",
"Динамо Мск : ЦСКА",
"Сибирь : Автомобилист",
"ХК Сочи : Автомобилист",
"Локомотив : Трактор",
"Металлург Мг : Локомотив",
"Куньлунь РС : Трактор",
"Амур : Торпедо НН",
"ХК Сочи : Салават Юлаев",
"Ак Барс : Трактор",
"Авангард : Ак Барс",
"СКА : Локомотив",
"Барыс : Нефтехимик",
"Барыс : Лада",
"Динамо Мск : Авангард",
"Адмирал : Северсталь",
"Адмирал : Барыс",
"Динамо Мск : Витязь",
"Адмирал : Металлург Мг",
"Лада : ХК Сочи",
"ЦСКА : Торпедо НН",
"Куньлунь РС : Авангард",
"Витязь : Торпедо НН",
"ХК Сочи : Витязь",
"Лада : Ак Барс",
"Адмирал : Амур",
"Витязь : Сибирь",
"ХК Сочи : Салават Юлаев",
"ЦСКА : Сибирь",
"Трактор : Лада",
"Динамо Мск : Адмирал",
"Витязь : Нефтехимик",
"Амур : ЦСКА",
"Адмирал : Динамо Мн",
"Ак Барс : Динамо Мн",
"Металлург Мг : Спартак",
"Трактор : Лада",
"Нефтехимик : Куньлунь РС",
"ЦСКА : Ак Барс",
"Автомобилист : Нефтехимик",
"Локомотив : Трактор",
"ЦСКА : Барыс",
"ХК Сочи : СКА",
"Северсталь : Лада",
"Северсталь : Куньлунь РС",
"Трактор : Салават Юлаев",
"ХК Сочи : Адмирал",
"Авангард : Лада",
"Динамо Мн : Ак Барс",
"Амур : ХК Сочи",
"Северсталь : Лада",
"Спартак : Динамо Мн",
"Автомобилист : ХК Сочи",
"Амур : Спартак",
"Амур : Салават Юлаев",
"Трактор : Лада",
"Ак Барс : Адмирал",
"Автомобилист : Ак Барс",
"Трактор : Динамо Мн",
"Адмирал : Локомотив",
"Адмирал : Динамо Мск",
"Автомобилист : Авангард",
"Адмирал : Салават Юлаев",
"Спартак : Куньлунь РС",
"Спартак : Амур",
"Трактор : Спартак",
"Локомотив : Нефтехимик",
"Салават Юлаев : Куньлунь РС",
"Витязь : Трактор",
"ХК Сочи : Куньлунь РС",
"Торпедо НН : Спартак",
"Авангард : Динамо Мск",
"Амур : Витязь",
"Нефтехимик : Динамо Мн",
"Автомобилист : Торпедо НН",
"Автомобилист : Металлург Мг",
"Северсталь : Барыс",
"ЦСКА : Нефтехимик",
"Динамо Мск : Автомобилист",
"ХК Сочи : Трактор",
"Металлург Мг : Витязь",
"Лада : Автомобилист",
"Локомотив : ЦСКА",
"Торпедо НН : Салават Юлаев",
"Барыс : Металлург Мг",
"Сибирь : Динамо Мск",
"Амур : Куньлунь РС",
"Динамо Мск : Лада",
"Сибирь : Динамо Мн",
"Ак Барс : Авангард",
"Спартак : Барыс",
"Динамо Мск : СКА",
"Динамо Мск : ХК Сочи",
"ХК Сочи : Динамо Мн",
"ЦСКА : Витязь",
"Спартак : Барыс",
"Салават Юлаев : Локомотив",
"Барыс : Динамо Мн",
"СКА : Витязь",
"Сибирь : Автомобилист",
"ЦСКА : ХК Сочи",
"Авангард : ХК Сочи",
"Торпедо НН : Авангард",
"ХК Сочи : Северсталь",
"ЦСКА : Адмирал",
"Металлург Мг : Куньлунь РС",
"Куньлунь РС : Салават Юлаев",
"Торпедо НН : Северсталь",
"Барыс : Металлург Мг",
"ЦСКА : Салават Юлаев",
"Нефтехимик : Динамо Мск",
"Адмирал : СКА",
"Авангард : Барыс"
    ];

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

        // Добавляем кнопку автогенерации
        addAutoGenerateButton();
    }

    // Добавление кнопки автогенерации
    function addAutoGenerateButton() {
        const resultsContainer = document.querySelector('.results-container');
        const autoGenerateBtn = document.createElement('button');
        autoGenerateBtn.id = 'auto-generate';
        autoGenerateBtn.className = 'btn';
        autoGenerateBtn.textContent = 'Автогенерация регулярного чемпионата';
        autoGenerateBtn.style.marginBottom = '20px';
        autoGenerateBtn.style.width = '100%';

        autoGenerateBtn.addEventListener('click', generateRegularChampionship);

        resultsContainer.insertBefore(autoGenerateBtn, resultsContainer.firstChild.nextSibling);
    }

    // Генерация регулярного чемпионата
    async function generateRegularChampionship() {
        if (!confirm('Запустить автогенерацию регулярного чемпионата? Все текущие результаты будут удалены.')) {
            return;
        }

        const autoGenerateBtn = document.getElementById('auto-generate');
        const originalText = autoGenerateBtn.textContent;
        autoGenerateBtn.textContent = 'Подготовка...';
        autoGenerateBtn.disabled = true;

        try {
            // Очищаем текущие результаты
            matchesHistory = [];
            resetAllTables();
            document.getElementById("matches-list").innerHTML = '<p class="no-matches">Нет сохраненных результатов</p>';

            // Последовательная генерация матчей
            for (let i = 0; i < seasonSchedule.length; i++) {
                const matchStr = seasonSchedule[i];
                const [homeTeam, guestTeam] = matchStr.split(' : ').map(s => s.trim());

                autoGenerateBtn.textContent = `Матч ${i+1}/${seasonSchedule.length}: ${homeTeam} vs ${guestTeam}`;

                await generateAndDisplayMatch(homeTeam, guestTeam);

                // Небольшая пауза для плавности интерфейса
                await new Promise(resolve => setTimeout(resolve, 50));
            }

            alert('Регулярный чемпионат успешно сгенерирован!');
        } catch (error) {
            console.error('Ошибка генерации:', error);
            alert('Ошибка: ' + error.message);
        } finally {
            autoGenerateBtn.textContent = originalText;
            autoGenerateBtn.disabled = false;
        }
    }

    // Генерация и отображение одного матча
    async function generateAndDisplayMatch(homeTeam, guestTeam) {
        const home = teamList.find(t => t.name === homeTeam);
        const guest = teamList.find(t => t.name === guestTeam);

        if (!home || !guest) {
            console.warn(`Пропущен матч: ${homeTeam} vs ${guestTeam}`);
            return;
        }

        // Генерация результата
        let homeScore = getRandomNumber(0, 5);
        let guestScore = getRandomNumber(0, 5);
        let isOT = false;
        let isPenalty = false;
        let extraInfo = '';

        // Обработка ничьи
        if (homeScore === guestScore) {
            const decider = getRandomNumber(1, 3);
            if (decider === 1) {
                homeScore++;
                extraInfo = 'OT';
                isOT = true;
            } else if (decider === 2) {
                guestScore++;
                extraInfo = 'OT';
                isOT = true;
            } else {
                if (getRandomNumber(1, 2) === 1) homeScore++;
                else guestScore++;
                extraInfo = 'Б';
                isPenalty = true;
            }
        }

        // Обновление статистики
        updateTeamStats(home.id, homeScore > guestScore, isOT, isPenalty);
        updateTeamStats(guest.id, guestScore > homeScore, isOT, isPenalty);

        // Сохранение результата
        const matchResult = {
            homeTeam: home.name,
            guestTeam: guest.name,
            homeScore: homeScore.toString(),
            guestScore: guestScore.toString(),
            extraInfo,
            homeLogo: `img/${home.id}.png`,
            guestLogo: `img/${guest.id}.png`,
            date: new Date().toLocaleString()
        };

        matchesHistory.unshift(matchResult);

        // Немедленное обновление UI
        updateSingleMatchInUI(matchResult);
    }

    // Обновление UI для одного матча
    function updateSingleMatchInUI(match) {
        const matchesList = document.getElementById('matches-list');

        // Удаляем сообщение "Нет результатов", если оно есть
        const noMatchesMsg = matchesList.querySelector('.no-matches');
        if (noMatchesMsg) matchesList.removeChild(noMatchesMsg);

        // Создаем элемент матча
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
                <button class="delete-match" data-index="${matchesHistory.length - 1}">× Удалить</button>
            </div>
        `;

        // Добавляем в начало списка
        if (matchesList.firstChild) {
            matchesList.insertBefore(matchItem, matchesList.firstChild);
        } else {
            matchesList.appendChild(matchItem);
        }

        // Добавляем обработчик для кнопки удаления
        matchItem.querySelector('.delete-match').addEventListener('click', deleteMatchHandler);

        // Прокручиваем к новому матчу
        matchItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
                    <button class="delete-match" data-index="${index}">× Удалить</button>
                </div>
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
        matchesHistory.splice(index, 1);

        // Пересчитываем статистику
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
        const teamRows = document.querySelectorAll(`#${teamId}`);

        teamRows.forEach(row => {
            if (!row) return;

            // Обновляем количество игр
            const gamesCell = row.querySelector('.games');
            gamesCell.textContent = parseInt(gamesCell.textContent) + 1;

            // Обновляем очки и статистику
            const pointsCell = row.querySelector('.points');
            let currentPoints = parseInt(pointsCell.textContent);

            if (isWinner) {
                if (isOT) {
                    const winsOTCell = row.querySelector('.wins-ot');
                    winsOTCell.textContent = parseInt(winsOTCell.textContent) + 1;
                    pointsCell.textContent = currentPoints + 2;
                } else if (isPenalty) {
                    const winsPenCell = row.querySelector('.wins-pen');
                    winsPenCell.textContent = parseInt(winsPenCell.textContent) + 1;
                    pointsCell.textContent = currentPoints + 2;
                } else {
                    const winsCell = row.querySelector('.wins');
                    winsCell.textContent = parseInt(winsCell.textContent) + 1;
                    pointsCell.textContent = currentPoints + 2;
                }
            } else {
                if (isOT) {
                    const loseOTCell = row.querySelector('.lose-ot');
                    loseOTCell.textContent = parseInt(loseOTCell.textContent) + 1;
                    pointsCell.textContent = currentPoints + 1;
                } else if (isPenalty) {
                    const losePenCell = row.querySelector('.lose-pen');
                    losePenCell.textContent = parseInt(losePenCell.textContent) + 1;
                    pointsCell.textContent = currentPoints + 1;
                } else {
                    const loseCell = row.querySelector('.lose');
                    loseCell.textContent = parseInt(loseCell.textContent) + 1;
                }
            }

            // Сортируем таблицу
            sortTable(row.closest('table'));
        });
    }

    // Функция для сортировки таблицы
    function sortTable(table) {
        const tbody = table.querySelector("tbody");
        if (!tbody) return;

        const rows = Array.from(tbody.rows);
        const pointsColIndex = 9; // Колонка с очками

        rows.sort((rowA, rowB) => {
            const pointsA = parseInt(rowA.cells[pointsColIndex].textContent);
            const pointsB = parseInt(rowB.cells[pointsColIndex].textContent);
            return pointsB - pointsA;
        });

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