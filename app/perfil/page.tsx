"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Trophy,
  Award,
  Target,
  Flame,
  Star,
  CheckCircle2,
  Calendar,
  Home as HomeIcon,
  CheckSquare,
  Users,
} from "lucide-react";

interface BadgeItem {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  target?: number;
}

export default function PerfilPage() {
  const userLevel = 5;
  const currentXP = 750;
  const nextLevelXP = 1000;
  const levelProgress = (currentXP / nextLevelXP) * 100;
  const streak = 7;
  const tasksCompleted = 42;
  const studyHours = 15.5;

  const badges: BadgeItem[] = [
    {
      id: 1,
      name: "Primeira Tarefa",
      description: "Complete sua primeira tarefa",
      icon: <CheckCircle2 className="h-6 w-6" />,
      unlocked: true,
    },
    {
      id: 2,
      name: "Sequência de 7 Dias",
      description: "Mantenha uma sequência de 7 dias",
      icon: <Flame className="h-6 w-6" />,
      unlocked: true,
    },
    {
      id: 3,
      name: "Pomodoro Master",
      description: "Complete 10 sessões Pomodoro",
      icon: <Target className="h-6 w-6" />,
      unlocked: true,
      progress: 10,
      target: 10,
    },
    {
      id: 4,
      name: "Maratonista",
      description: "Estude 20 horas em uma semana",
      icon: <Star className="h-6 w-6" />,
      unlocked: false,
      progress: 15.5,
      target: 20,
    },
    {
      id: 5,
      name: "Organizador Pro",
      description: "Complete 50 tarefas",
      icon: <Award className="h-6 w-6" />,
      unlocked: false,
      progress: 42,
      target: 50,
    },
    {
      id: 6,
      name: "Consistência",
      description: "Mantenha uma sequência de 30 dias",
      icon: <Calendar className="h-6 w-6" />,
      unlocked: false,
      progress: 7,
      target: 30,
    },
  ];

  const unlockedBadges = badges.filter((b) => b.unlocked);
  const lockedBadges = badges.filter((b) => !b.unlocked);

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
            <h1 className="text-xl font-bold text-white">Meu Perfil</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-20">
        {/* User Profile */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 mb-3">
                <AvatarFallback className="bg-green-800 text-white text-2xl">
                  ES
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-1 text-green-800">Estudante</h2>
              <Badge variant="secondary" className="mb-4">
                Nível {userLevel}
              </Badge>

              <div className="w-full">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Experiência</span>
                  <span className="font-semibold">
                    {currentXP} / {nextLevelXP} XP
                  </span>
                </div>
                <Progress value={levelProgress} className="h-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="bg-green-800">
            <CardContent className="pt-6 pb-4">
              <div className="text-center">
                <Flame className="h-8 w-8 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{streak}</div>
                <div className="text-xs text-green-100">Dias</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-800">
            <CardContent className="pt-6 pb-4">
              <div className="text-center">
                <CheckCircle2 className="h-8 w-8 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{tasksCompleted}</div>
                <div className="text-xs text-green-100">Tarefas</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-800">
            <CardContent className="pt-6 pb-4">
              <div className="text-center">
                <Target className="h-8 w-8 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{studyHours}h</div>
                <div className="text-xs text-green-100">Estudo</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Friends List */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Users className="h-5 w-5 text-green-800" />
            Amigos (5)
          </h3>
          <div className="grid grid-cols-5 gap-3">
            <div className="flex flex-col items-center gap-1">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-blue-600 text-white text-sm">
                  MA
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium text-gray-700">Maria</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-purple-600 text-white text-sm">
                  JO
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium text-gray-700">João</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-pink-600 text-white text-sm">
                  AN
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium text-gray-700">Ana</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-orange-600 text-white text-sm">
                  PE
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium text-gray-700">Pedro</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-teal-600 text-white text-sm">
                  LU
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium text-gray-700">Lucas</span>
            </div>
          </div>
        </div>

        {/* Unlocked Badges */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Conquistas Desbloqueadas ({unlockedBadges.length})
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {unlockedBadges.map((badge) => (
              <Card
                key={badge.id}
                className="bg-gradient-to-br from-yellow-50 to-white border-yellow-200"
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-yellow-100 p-3 rounded-full mb-2 text-yellow-600">
                      {badge.icon}
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                    <p className="text-xs text-gray-600">{badge.description}</p>
                    {badge.progress && badge.target && (
                      <Badge
                        variant="secondary"
                        className="mt-2 bg-yellow-100 text-yellow-800"
                      >
                        {badge.progress}/{badge.target}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Locked Badges */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Award className="h-5 w-5 text-gray-400" />
            Em Progresso ({lockedBadges.length})
          </h3>
          <div className="space-y-3">
            {lockedBadges.map((badge) => (
              <Card key={badge.id} className="opacity-75">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-3 rounded-full text-gray-400">
                      {badge.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{badge.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {badge.description}
                      </p>
                      {badge.progress !== undefined && badge.target && (
                        <>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">Progresso</span>
                            <span className="font-semibold">
                              {badge.progress} / {badge.target}
                            </span>
                          </div>
                          <Progress
                            value={(badge.progress / badge.target) * 100}
                            className="h-2"
                          />
                        </>
                      )}
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
              className="flex flex-col items-center gap-1 text-gray-500 hover:text-green-800"
            >
              <Calendar className="h-6 w-6" />
              <span className="text-xs font-medium">Agenda</span>
            </Link>
            <Link
              href="/perfil"
              className="flex flex-col items-center gap-1 text-green-800"
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
