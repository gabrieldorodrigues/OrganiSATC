"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  CheckSquare,
  Timer,
  Trophy,
  BookOpen,
  Home as HomeIcon,
  Flame,
} from "lucide-react";

export default function Home() {
  // Dados mockados para demonstração
  const streak = 7;
  const tasksToday = 5;
  const tasksCompleted = 2;
  const todayProgress = (tasksCompleted / tasksToday) * 100;

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
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">AcademiCo </h1>

            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-white" />
              <span className="text-sm font-semibold text-white">
                {streak} dias
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Welcome Section */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1 text-green-800">
              Olá, Estudante! 👋
            </h2>
            <p className="text-gray-600">Vamos organizar seu dia acadêmico</p>
          </div>
          <Link href="/perfil">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-green-50 relative"
            >
              <Trophy className="h-6 w-6 text-yellow-600" />
              <span className="absolute top-1 right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
              </span>
            </Button>
          </Link>
        </div>

        {/* Progress Today */}
        <Card className="mb-6 bg-green-800 border-green-900">
          <CardHeader>
            <CardTitle className="text-lg text-white">
              Progresso de Hoje
            </CardTitle>
            <CardDescription className="text-green-100">
              {tasksCompleted} de {tasksToday} tarefas concluídas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress
              value={todayProgress}
              className="h-3 bg-gray-300 [&>div]:bg-white"
            />
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-800">
                  {tasksToday}
                </div>
                <div className="text-sm text-gray-600">Tarefas Hoje</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-800">
                  {streak}
                </div>
                <div className="text-sm text-gray-600">Dias de Streak</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Acesso Rápido</h3>

          {/* First Row - 3 columns */}
          <div className="grid grid-cols-3 gap-3">
            <Link href="/tarefas">
              <Card className="hover:bg-gray-50 transition-colors cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-4 text-center gap-2">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckSquare className="h-6 w-6 text-green-800" />
                  </div>
                  <h4 className="font-semibold text-sm">Tarefas</h4>
                  <p className="text-xs text-gray-600">
                    {tasksToday - tasksCompleted} pendentes
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/calendario">
              <Card className="hover:bg-gray-50 transition-colors cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-4 text-center gap-2">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-sm">Calendário</h4>
                  <p className="text-xs text-gray-600">Ver eventos</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/pomodoro">
              <Card className="hover:bg-gray-50 transition-colors cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-4 text-center gap-2">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Timer className="h-6 w-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-sm">Pomodoro</h4>
                  <p className="text-xs text-gray-600">Foco nos estudos</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Second Row - Full width cards */}
          <Link href="/horarios">
            <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <svg
                    className="h-6 w-6 text-green-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Meus Horários</h4>
                  <p className="text-sm text-gray-600">
                    Períodos livres identificados
                  </p>
                </div>
                <Badge variant="secondary" className="bg-green-100">
                  Auto
                </Badge>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-3">
            <Link
              href="/"
              className="flex flex-col items-center gap-1 text-green-800"
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
