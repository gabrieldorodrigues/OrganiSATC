"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Calendar, Clock, Home as HomeIcon, CheckSquare, Trophy } from "lucide-react";

interface Task {
  id: number;
  title: string;
  discipline: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

export default function TarefasPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Entregar trabalho de Cálculo II",
      discipline: "Cálculo II",
      dueDate: "2025-12-10",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "Estudar para prova de Física",
      discipline: "Física I",
      dueDate: "2025-12-12",
      priority: "high",
      completed: false,
    },
    {
      id: 3,
      title: "Ler capítulo 5 - Algoritmos",
      discipline: "Algoritmos",
      dueDate: "2025-12-09",
      priority: "medium",
      completed: true,
    },
    {
      id: 4,
      title: "Fazer exercícios de Programação",
      discipline: "Programação I",
      dueDate: "2025-12-11",
      priority: "medium",
      completed: false,
    },
    {
      id: 5,
      title: "Revisar anotações de BD",
      discipline: "Banco de Dados",
      dueDate: "2025-12-15",
      priority: "low",
      completed: false,
    },
  ]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "Alta";
      case "medium":
        return "Média";
      case "low":
        return "Baixa";
      default:
        return priority;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

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
            <h1 className="text-xl font-bold text-white">Minhas Tarefas</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Add Task Button */}
        <Button className="w-full mb-6" size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Nova Tarefa
        </Button>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">Todas ({tasks.length})</TabsTrigger>
            <TabsTrigger value="active">
              Ativas ({activeTasks.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Concluídas ({completedTasks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {tasks.map((task) => (
              <Card
                key={task.id}
                className={task.completed ? "opacity-60" : ""}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-semibold mb-1 ${
                          task.completed ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <span>{task.discipline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(task.dueDate)}
                        </Badge>
                        <Badge
                          className={`text-xs ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {getPriorityLabel(task.priority)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="active" className="space-y-3">
            {activeTasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1">{task.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <span>{task.discipline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(task.dueDate)}
                        </Badge>
                        <Badge
                          className={`text-xs ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {getPriorityLabel(task.priority)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-3">
            {completedTasks.map((task) => (
              <Card key={task.id} className="opacity-60">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1 line-through text-gray-500">
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <span>{task.discipline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(task.dueDate)}
                        </Badge>
                        <Badge
                          className={`text-xs ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {getPriorityLabel(task.priority)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
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
              className="flex flex-col items-center gap-1 text-green-800"
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
