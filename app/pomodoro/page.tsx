"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Pause, RotateCcw, Coffee, Brain, Home as HomeIcon, CheckSquare, Calendar, Trophy } from "lucide-react";

export default function PomodoroPage() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const totalSeconds = isBreak ? 5 * 60 : 25 * 60;
  const currentSeconds = minutes * 60 + seconds;
  const progress = ((totalSeconds - currentSeconds) / totalSeconds) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer concluído
            setIsActive(false);
            if (!isBreak) {
              setSessionsCompleted((prev) => prev + 1);
              // Trocar para intervalo
              setIsBreak(true);
              setMinutes(5);
            } else {
              // Trocar para sessão de trabalho
              setIsBreak(false);
              setMinutes(25);
            }
            setSeconds(0);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds, isBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (isBreak) {
      setMinutes(5);
    } else {
      setMinutes(25);
    }
    setSeconds(0);
  };

  const switchMode = () => {
    setIsActive(false);
    setIsBreak(!isBreak);
    if (!isBreak) {
      setMinutes(5);
    } else {
      setMinutes(25);
    }
    setSeconds(0);
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
            <h1 className="text-xl font-bold text-white">Timer Pomodoro</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Mode Selector */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={!isBreak ? "default" : "outline"}
            className="flex-1"
            onClick={() => !isActive && switchMode()}
            disabled={isActive}
          >
            <Brain className="h-4 w-4 mr-2" />
            Foco
          </Button>
          <Button
            variant={isBreak ? "default" : "outline"}
            className="flex-1"
            onClick={() => !isActive && switchMode()}
            disabled={isActive}
          >
            <Coffee className="h-4 w-4 mr-2" />
            Intervalo
          </Button>
        </div>

        {/* Timer Display */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="text-7xl font-bold mb-2 text-gray-900 font-mono">
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
              </div>
              <p className="text-gray-600">
                {isBreak
                  ? "☕ Intervalo - Descanse um pouco"
                  : "🎯 Modo Foco - Concentre-se!"}
              </p>
            </div>

            <Progress value={progress} className="h-2 mb-6" />

            <div className="flex gap-3 justify-center">
              <Button size="lg" onClick={toggleTimer} className="w-32">
                {isActive ? (
                  <>
                    <Pause className="h-5 w-5 mr-2" />
                    Pausar
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 mr-2" />
                    Iniciar
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={resetTimer}
                className="w-32"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Reiniciar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">
                Sessões Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {sessionsCompleted}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">
                Tempo Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {sessionsCompleted * 25}min
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Como funciona?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-600">
            <p>
              🍅 <strong>Técnica Pomodoro:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>25 minutos de foco intenso</li>
              <li>5 minutos de intervalo</li>
              <li>Após 4 sessões, faça uma pausa maior (15-30 min)</li>
            </ul>
            <p className="mt-4">
              💡 <strong>Dica:</strong> Durante o intervalo, levante-se,
              estique-se e hidrate-se!
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
