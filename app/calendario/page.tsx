"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Home as HomeIcon,
  CheckSquare,
  Trophy,
} from "lucide-react";

interface Event {
  id: number;
  title: string;
  type: "aula" | "prova" | "trabalho" | "outros";
  time: string;
  date: string;
  discipline?: string;
}

export default function CalendarioPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 8)); // Dezembro 2025

  const events: Event[] = [
    {
      id: 1,
      title: "Aula de Cálculo II",
      type: "aula",
      time: "08:00",
      date: "2025-12-08",
      discipline: "Cálculo II",
    },
    {
      id: 2,
      title: "Aula de Física I",
      type: "aula",
      time: "10:00",
      date: "2025-12-08",
      discipline: "Física I",
    },
    {
      id: 3,
      title: "Entregar Trabalho",
      type: "trabalho",
      time: "23:59",
      date: "2025-12-10",
      discipline: "Cálculo II",
    },
    {
      id: 4,
      title: "Prova de Física",
      type: "prova",
      time: "14:00",
      date: "2025-12-12",
      discipline: "Física I",
    },
    {
      id: 5,
      title: "Aula de Algoritmos",
      type: "aula",
      time: "08:00",
      date: "2025-12-09",
      discipline: "Algoritmos",
    },
  ];

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Dias vazios no início
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const hasEvent = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.some((e) => e.date === dateStr);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const todayEvents = events.filter((e) => e.date === "2025-12-08");
  const upcomingEvents = events
    .filter((e) => new Date(e.date) > new Date("2025-12-08"))
    .slice(0, 3);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "aula":
        return "bg-blue-100 text-blue-800";
      case "prova":
        return "bg-red-100 text-red-800";
      case "trabalho":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="1.5" fill="rgb(29, 140, 79)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      {/* Header */}
      <header className="bg-green-800 border-b border-green-900 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-green-700">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-white">Calendário</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Calendar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="icon" onClick={previousMonth}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-semibold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <Button variant="ghost" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Week Days */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-gray-600 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentDate).map((day, index) => (
                <div
                  key={index}
                  className={`aspect-square flex items-center justify-center relative ${
                    day === null
                      ? ""
                      : "cursor-pointer hover:bg-gray-50 rounded-lg"
                  }`}
                >
                  {day !== null && (
                    <>
                      <span
                        className={`text-sm ${
                          isToday(day)
                            ? "font-bold text-green-800"
                            : "text-gray-700"
                        }`}
                      >
                        {day}
                      </span>
                      {hasEvent(day) && (
                        <div className="absolute bottom-1 w-1 h-1 bg-green-600 rounded-full"></div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Events */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Hoje (8 Dez)</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Adicionar
            </Button>
          </div>

          <div className="space-y-3">
            {todayEvents.length > 0 ? (
              todayEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 px-3 py-2 rounded-lg text-center min-w-[60px]">
                        <div className="text-xs text-blue-600 font-medium">
                          {event.time}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{event.title}</h4>
                        {event.discipline && (
                          <p className="text-sm text-gray-600 mb-2">
                            {event.discipline}
                          </p>
                        )}
                        <Badge
                          className={`text-xs ${getEventTypeColor(event.type)}`}
                        >
                          {event.type.charAt(0).toUpperCase() +
                            event.type.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-4 text-center text-gray-500">
                  Nenhum evento para hoje
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Próximos</h3>

          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 px-3 py-2 rounded-lg text-center min-w-[60px]">
                      <div className="text-xs text-gray-600 font-medium">
                        {new Date(event.date).getDate()} Dez
                      </div>
                      <div className="text-xs text-gray-500">{event.time}</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{event.title}</h4>
                      {event.discipline && (
                        <p className="text-sm text-gray-600 mb-2">
                          {event.discipline}
                        </p>
                      )}
                      <Badge
                        className={`text-xs ${getEventTypeColor(event.type)}`}
                      >
                        {event.type.charAt(0).toUpperCase() +
                          event.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-3">
            <Link
              href="/"
              className="flex flex-col items-center gap-1 text-gray-500 hover:text-green-800"
            >
              <HomeIcon className="h-6 w-6" />
              <span className="text-xs font-medium">Início</span>
            </Link>
            <Link
              href="/tarefas"
              className="flex flex-col items-center gap-1 text-gray-500 hover:text-green-800"
            >
              <CheckSquare className="h-6 w-6" />
              <span className="text-xs font-medium">Tarefas</span>
            </Link>
            <Link
              href="/calendario"
              className="flex flex-col items-center gap-1 text-green-800"
            >
              <Calendar className="h-6 w-6" />
              <span className="text-xs font-medium">Agenda</span>
            </Link>
            <Link
              href="/perfil"
              className="flex flex-col items-center gap-1 text-gray-500 hover:text-green-800"
            >
              <Trophy className="h-6 w-6" />
              <span className="text-xs font-medium">Perfil</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
