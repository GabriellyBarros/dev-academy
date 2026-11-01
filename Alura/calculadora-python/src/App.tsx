/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { InteractiveCalculator } from './components/InteractiveCalculator';
import { PythonCodeViewer } from './components/PythonCodeViewer';
import { AnatomyExplorer } from './components/AnatomyExplorer';
import { ExecutionGuide } from './components/ExecutionGuide';
import { ChallengesSection } from './components/ChallengesSection';
import {
  Code2,
  Cpu,
  ShieldCheck,
  Zap,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function App() {
  const [activeSnippetId, setActiveSnippetId] = useState<'basic' | 'explicit' | 'console'>('basic');
  const [inspectedComponent, setInspectedComponent] = useState<string>('visor-entry');

  // Convert inspected component ID to widget target
  const getInspectedWidget = (id: string) => {
    switch (id) {
      case 'janela-principal':
      case 'import-tkinter':
      case 'mainloop':
        return 'window';
      case 'visor-entry':
        return 'visor';
      case 'layout-grade':
        return 'keypad';
      case 'funcoes-logica':
        return 'equals';
      default:
        return 'visor';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* 3-Zone Top Navigation */}
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 md:py-12 flex flex-col gap-14">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto flex flex-col items-center">
          {/* Clean unboxed metadata with typographic separators (anti-slop rule) */}
          <div className="flex items-center gap-2 text-xs text-sky-400 font-mono mb-3">
            <span>Python 3.8+</span>
            <span aria-hidden="true">·</span>
            <span>Tkinter Nativo</span>
            <span aria-hidden="true">·</span>
            <span>Operações Básicas & Porcentagem (%)</span>
            <span aria-hidden="true">·</span>
            <span>Iniciante</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight [text-wrap:balance]">
            Sua Primeira Calculadora com Interface Gráfica em Python
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed [text-wrap:balance]">
            Aprenda a construir uma calculadora visual completa com a biblioteca padrão <code className="text-sky-300 font-mono text-sm px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">tkinter</code>.
            Código limpo, estruturado, sem dependências externas e com explicações de cada linha.
          </p>

          {/* Quick 4 Highlights Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 w-full text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-sky-400 text-xs font-semibold mb-1">Visual Nativo</div>
              <div className="text-xs text-slate-400">Janela desktop real usando a biblioteca padrão do Python.</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-emerald-400 text-xs font-semibold mb-1">Operações Matemáticas</div>
              <div className="text-xs text-slate-400">Soma (+), Subtração (-), Multiplicação (*), Divisão (/) e Porcentagem (%).</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-amber-400 text-xs font-semibold mb-1">Seguro contra Erros</div>
              <div className="text-xs text-slate-400">Tratamento amigável para divisão por zero com try/except.</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-purple-400 text-xs font-semibold mb-1">Passo a Passo</div>
              <div className="text-xs text-slate-400">Cada bloco explicado em detalhes para quem está começando.</div>
            </div>
          </div>
        </section>

        {/* Interactive Two-Zone Sandbox: Visual Simulator & Python Code Viewer */}
        <section id="simulador" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono mb-1">
                Laboratório Interativo
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Simulador Visual e Código Python Lado a Lado
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Teste os botões da calculadora à esquerda e acompanhe as chamadas de função correspondentes no código à direita.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[580px]">
            {/* Left Zone: Live Interactive Calculator (5 cols) */}
            <div className="lg:col-span-5 bg-slate-900/70 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between shadow-xl">
              <InteractiveCalculator
                activeInspected={getInspectedWidget(inspectedComponent)}
                onInspectElement={(id) => setInspectedComponent(id)}
              />
            </div>

            {/* Right Zone: Python Code Viewer (7 cols) */}
            <div id="codigo" className="lg:col-span-7 flex flex-col scroll-mt-24">
              <PythonCodeViewer
                activeSnippetId={activeSnippetId}
                onSelectSnippet={setActiveSnippetId}
                activeInspected={inspectedComponent}
              />
            </div>
          </div>
        </section>

        {/* Section: Component Anatomy (Anatomia do Código) */}
        <section id="anatomia" className="scroll-mt-24 pt-4">
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono mb-1">
              Guia para Iniciantes
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Anatomia e Principais Componentes do Código
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Entenda exatamente o que cada linha faz. Clique em qualquer parte para explorar o trecho de código, sua função e dicas práticas.
            </p>
          </div>

          <AnatomyExplorer
            selectedId={inspectedComponent}
            onSelectComponent={setInspectedComponent}
          />
        </section>

        {/* Section: How to Run in Computer */}
        <section id="executar" className="scroll-mt-24">
          <ExecutionGuide />
        </section>

        {/* Section: Learning Challenges */}
        <section id="desafios" className="scroll-mt-24">
          <ChallengesSection />
        </section>
      </main>

      {/* Clean Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-semibold text-slate-200">PythonCalc Studio</span>
            <span className="mx-2">·</span>
            <span>Material didático aberto para estudantes de Python</span>
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <a href="#simulador" className="hover:text-slate-200 transition-colors">
              Simulador
            </a>
            <a href="#codigo" className="hover:text-slate-200 transition-colors">
              Código Fonte
            </a>
            <a href="#anatomia" className="hover:text-slate-200 transition-colors">
              Explicação dos Componentes
            </a>
            <a
              href="https://docs.python.org/pt-br/3/library/tkinter.html"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-400 transition-colors"
            >
              Documentação Oficial Tkinter ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
