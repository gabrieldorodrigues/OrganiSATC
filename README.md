# OrganiSATC

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat&logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-green?style=flat)

Um aplicativo web de organização acadêmica desenvolvido para ajudar estudantes a gerenciar suas tarefas, horários e compromissos de forma eficiente.

## Tecnologias

- **Next.js 15** - Framework React para aplicações web modernas
- **TypeScript** - JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn UI** - Biblioteca de componentes reutilizáveis
- **Lucide React** - Conjunto de ícones modernos

## Funcionalidades Principais

### Dashboard Inteligente

O dashboard oferece uma visão completa do seu progresso acadêmico com estatísticas em tempo real, incluindo tarefas pendentes, sequência de dias consecutivos de uso e acesso rápido a todas as funcionalidades do aplicativo.

### Gerenciamento de Tarefas

Sistema completo de gestão de tarefas com suporte a filtros por status, priorização por níveis de urgência, vinculação com disciplinas específicas e acompanhamento de prazos de entrega.

### Calendário Acadêmico

Visualização mensal integrada que permite acompanhar eventos diários, próximos compromissos e categorização automática por tipo de atividade como aulas, provas e trabalhos.

### Otimização de Tempo

Ferramenta que analisa sua grade horária e identifica automaticamente períodos livres, oferecendo sugestões inteligentes de como aproveitar melhor esses intervalos para estudos e outras atividades.

### Timer Pomodoro

Implementação da técnica Pomodoro com sessões de foco de 25 minutos, intervalos de descanso de 5 minutos e rastreamento do número de sessões completadas.

### Sistema de Gamificação

Motivação através de níveis e experiência (XP), badges desbloqueáveis por conquistas, acompanhamento de sequências de dias consecutivos e estatísticas visuais de produtividade.

## Começando

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/organistc.git

# Entrar no diretório
cd organistc

# Instalar dependências
npm install
```

### Executando o Projeto

```bash
# Modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Servidor de produção
npm start
```

O aplicativo estará disponível em `http://localhost:3000`.

## Estrutura do Projeto

```
academia-app/
├── app/
│   ├── page.tsx           # Dashboard principal
│   ├── tarefas/
│   │   └── page.tsx       # Gerenciamento de tarefas
│   ├── horarios/
│   │   └── page.tsx       # Otimização de tempo
│   ├── calendario/
│   │   └── page.tsx       # Calendário acadêmico
│   ├── pomodoro/
│   │   └── page.tsx       # Timer Pomodoro
│   ├── perfil/
│   │   └── page.tsx       # Perfil e conquistas
│   ├── layout.tsx
│   └── globals.css
├── components/
│   └── ui/                # Componentes Shadcn UI
├── lib/
│   └── utils.ts
└── package.json
```

## Roadmap

Funcionalidades planejadas para as próximas versões:

- Integração com Google Calendar para sincronização automática
- Sistema de notificações push para lembretes importantes
- Relatórios detalhados de produtividade
- Persistência de dados com backend
- Autenticação de usuários
- Sincronização em nuvem entre dispositivos
- Suporte a temas personalizáveis
- Modo escuro

Melhorias de experiência do usuário:

- Animações de transição suaves
- Feedback visual aprimorado
- Tutorial inicial para novos usuários
- Modais interativos para criação rápida
- Edição inline de tarefas e eventos
- Drag and drop para reordenação

## Equipe de Desenvolvimento

- Dauane Neves Gerônimo
- Erik Schneider Pacheco
- Gabriel De Oliveira Rodrigues
- Gabriel Willian Bernardino Duarte

## Licença

Este projeto foi desenvolvido como parte de um trabalho acadêmico na disciplina de Engenharia de Software.

---

Desenvolvido com dedicação por estudantes do SATC 2024/2025
