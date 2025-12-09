"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Clock, Coffee, Lightbulb, Home as HomeIcon, CheckSquare, Calendar, Trophy } from "lucide-react";

interface TimeBlock {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  type: "aula" | "trabalho" | "transporte" | "outros";
  title: string;
}

interface FreeTime {
  day: string;
  startTime: string;
  endTime: string;
  duration: number; // em minutos
}

export default function HorariosPage() {
  // Compromissos fixos do usuário
  const [fixedSchedule] = useState<TimeBlock[]>([
    {
      id: 1,
      day: "Segunda",
      startTime: "08:00",
      endTime: "10:00",
      type: "aula",
      title: "Cálculo II",
    },
    {
      id: 2,
      day: "Segunda",
      startTime: "10:00",
      endTime: "12:00",
      type: "aula",
      title: "Física I",
    },
    {
      id: 3,
      day: "Segunda",
      startTime: "14:00",
      endTime: "16:00",
      type: "aula",
      title: "Algoritmos",
    },
    {
      id: 4,
      day: "Segunda",
      startTime: "18:00",
      endTime: "22:00",
      type: "trabalho",
      title: "Trabalho Part-time",
    },

    {
      id: 5,
      day: "Terça",
      startTime: "07:00",
      endTime: "08:00",
      type: "transporte",
      title: "Deslocamento",
    },
    {
      id: 6,
      day: "Terça",
      startTime: "08:00",
      endTime: "12:00",
      type: "aula",
      title: "Programação I",
    },
    {
      id: 7,
      day: "Terça",
      startTime: "14:00",
      endTime: "18:00",
      type: "aula",
      title: "Banco de Dados",
    },

    {
      id: 8,
      day: "Quarta",
      startTime: "08:00",
      endTime: "10:00",
      type: "aula",
      title: "Cálculo II",
    },
    {
      id: 9,
      day: "Quarta",
      startTime: "10:00",
      endTime: "12:00",
      type: "aula",
      title: "Física I",
    },
    {
      id: 10,
      day: "Quarta",
      startTime: "14:00",
      endTime: "16:00",
      type: "aula",
      title: "Algoritmos",
    },

    {
      id: 11,
      day: "Quinta",
      startTime: "08:00",
      endTime: "12:00",
      type: "aula",
      title: "Programação I",
    },
    {
      id: 12,
      day: "Quinta",
      startTime: "14:00",
      endTime: "18:00",
      type: "aula",
      title: "Banco de Dados",
    },
    {
      id: 13,
      day: "Quinta",
      startTime: "18:00",
      endTime: "22:00",
      type: "trabalho",
      title: "Trabalho Part-time",
    },

    {
      id: 14,
      day: "Sexta",
      startTime: "08:00",
      endTime: "10:00",
      type: "aula",
      title: "Cálculo II",
    },
    {
      id: 15,
      day: "Sexta",
      startTime: "10:00",
      endTime: "12:00",
      type: "aula",
      title: "Física I",
    },
  ]);

  // Função para calcular períodos livres
  const calculateFreeTime = (): FreeTime[] => {
    const freeSlots: FreeTime[] = [];
    const workingHours = { start: 7, end: 22 }; // Considera dia útil de 7h às 22h
    const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

    days.forEach((day) => {
      const daySchedule = fixedSchedule
        .filter((block) => block.day === day)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));

      let currentTime = workingHours.start;

      daySchedule.forEach((block) => {
        const blockStart =
          parseInt(block.startTime.split(":")[0]) +
          parseInt(block.startTime.split(":")[1]) / 60;
        const blockEnd =
          parseInt(block.endTime.split(":")[0]) +
          parseInt(block.endTime.split(":")[1]) / 60;

        // Se há tempo livre antes deste bloco
        if (currentTime < blockStart) {
          const duration = Math.round((blockStart - currentTime) * 60);
          if (duration >= 30) {
            // Apenas períodos de 30min ou mais
            freeSlots.push({
              day,
              startTime: `${String(Math.floor(currentTime)).padStart(
                2,
                "0"
              )}:${String(Math.round((currentTime % 1) * 60)).padStart(
                2,
                "0"
              )}`,
              endTime: block.startTime,
              duration,
            });
          }
        }

        currentTime = blockEnd;
      });

      // Tempo livre após o último compromisso do dia
      if (currentTime < workingHours.end) {
        const duration = Math.round((workingHours.end - currentTime) * 60);
        if (duration >= 30) {
          freeSlots.push({
            day,
            startTime: `${String(Math.floor(currentTime)).padStart(
              2,
              "0"
            )}:${String(Math.round((currentTime % 1) * 60)).padStart(2, "0")}`,
            endTime: `${workingHours.end}:00`,
            duration,
          });
        }
      }
    });

    return freeSlots;
  };

  const freeTime = calculateFreeTime();

  const getTypeColor = (type: string) => {
    switch (type) {
      case "aula":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "trabalho":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "transporte":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "aula":
        return "Aula";
      case "trabalho":
        return "Trabalho";
      case "transporte":
        return "Transporte";
      default:
        return "Outros";
    }
  };

  const getSuggestion = (duration: number) => {
    if (duration >= 180) return "💡 Ideal para estudar e fazer trabalhos";
    if (duration >= 120) return "📚 Bom para revisão de conteúdo";
    if (duration >= 60) return "⏱️ Use técnica Pomodoro";
    return "☕ Momento para pausas e organização";
  };

  const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

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
            <div>
              <h1 className="text-xl font-bold text-white">Meus Horários</h1>
              <p className="text-xs text-green-100">
                Gestão inteligente de tempo
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{fixedSchedule.length}</div>
                <div className="text-xs text-gray-600">Compromissos Fixos</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Lightbulb className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{freeTime.length}</div>
                <div className="text-xs text-gray-600">Períodos Livres</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Free Time Identification */}
        <Card className="mb-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Lightbulb className="h-5 w-5" />
              Períodos Livres Identificados
            </CardTitle>
            <CardDescription className="text-green-700">
              Baseado nos seus compromissos fixos, identificamos{" "}
              {freeTime.length} períodos disponíveis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {freeTime.map((slot, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 border border-green-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-semibold text-gray-900">
                      {slot.day}
                    </div>
                    <div className="text-sm text-gray-600">
                      {slot.startTime} - {slot.endTime}
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {slot.duration} min
                  </Badge>
                </div>
                <div className="text-xs text-gray-600 flex items-center gap-1">
                  {getSuggestion(slot.duration)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weekly Schedule */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Agenda Semanal</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Adicionar
            </Button>
          </div>

          {days.map((day) => {
            const daySchedule = fixedSchedule
              .filter((block) => block.day === day)
              .sort((a, b) => a.startTime.localeCompare(b.startTime));

            return (
              <Card key={day}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{day}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {daySchedule.length > 0 ? (
                    daySchedule.map((block) => (
                      <div
                        key={block.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="bg-blue-100 px-3 py-2 rounded text-center min-w-[80px]">
                          <div className="text-xs font-medium text-blue-600">
                            {block.startTime}
                          </div>
                          <div className="text-[10px] text-blue-500">
                            {block.endTime}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm">
                            {block.title}
                          </div>
                          <Badge
                            className={`text-xs mt-1 ${getTypeColor(
                              block.type
                            )}`}
                          >
                            {getTypeLabel(block.type)}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500 text-sm">
                      <Coffee className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      Nenhum compromisso fixo
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-base text-blue-900">
              💡 Como funciona?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-800 space-y-2">
            <p>
              <strong>Identificação Automática:</strong> O sistema analisa seus
              compromissos fixos (aulas, trabalho, transporte) e identifica
              automaticamente os períodos livres da semana.
            </p>
            <p>
              <strong>Sugestões Inteligentes:</strong> Para cada período livre,
              você recebe sugestões de como aproveitá-lo melhor, seja para
              estudar, fazer trabalhos ou descansar.
            </p>
            <p className="text-xs">
              ✨ Adicione seus compromissos fixos para obter uma análise
              completa da sua disponibilidade!
            </p>
          </CardContent>
        </Card>
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
              className="flex flex-col items-center gap-1 text-gray-500 hover:text-green-800"
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
