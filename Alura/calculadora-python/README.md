# 🧮 Calculadora Python com Interface Gráfica (Tkinter)

<div align="center">

![Python Version](https://img.shields.io/badge/Python-3.8%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Tkinter](https://img.shields.io/badge/GUI-Tkinter%20Nativo-0284C7?style=for-the-badge&logo=python&logoColor=white)
![Unittest Status](https://img.shields.io/badge/Testes-5%2F5%20Aprovados-10B981?style=for-the-badge&logo=pytest&logoColor=white)
![Plataforma](https://img.shields.io/badge/Plataforma-Windows%20%7C%20macOS%20%7C%20Linux-64748B?style=for-the-badge)
![Propósito](https://img.shields.io/badge/Uso-Educacional%20%26%20Estudos-F59E0B?style=for-the-badge)

<p align="center">
  <strong>Uma aplicação desktop moderna, responsiva e intuitiva desenvolvida em Python puro com biblioteca nativa Tkinter.</strong><br>
  Conta com as quatro operações aritméticas fundamentais, cálculo inteligente de porcentagem, tratamento avançado de exceções e uma suíte completa de testes de integração automatizados.
</p>

</div>

---

## 📌 Visão Geral do Projeto

Este projeto foi projetado com foco em boas práticas de programação, clareza arquitetural e facilidade de aprendizado para desenvolvedores em início de carreira. A calculadora combina:

1. **Camada de Lógica Pura:** Funções matemáticas independentes que realizam cálculos exatos sem acoplamento à interface gráfica.
2. **Camada de Apresentação (GUI):** Interface desktop construída com a biblioteca padrão `tkinter`, sem necessidade de bibliotecas externas via `pip`.
3. **Simulador Educacional Web:** Acompanha um laboratório interativo desenvolvido em React/Vite com explicações linha por linha do funcionamento do código Python.

---

## ✨ Funcionalidades

### 🔢 Operações Matemáticas Suportadas

| Operação | Símbolo | Exemplo de Expressão | Resultado | Descrição |
| :--- | :---: | :---: | :---: | :--- |
| **Soma** | `+` | `15 + 25` | `40` | Adição entre dois ou mais valores reais ou inteiros. |
| **Subtração** | `-` | `50 - 18` | `32` | Diferença entre números positivos ou negativos. |
| **Multiplicação** | `*` | `7 * 8` | `56` | Produto com alta precisão decimal. |
| **Divisão** | `/` | `84 / 4` | `21` | Quociente exato com proteção contra divisão por zero. |
| **Porcentagem** | `%` | `50 %` ou `200 * 15 %` | `0.5` ou `30` | Conversão decimal direta ou cálculo de percentual relativo sobre totais. |

### 🎛️ Recursos de Usabilidade & UX

- **Limpeza Total (`C`):** Reseta o visor e o estado do cálculo em um clique.
- **Backspace (`⌫`):** Remove somente o último caractere digitado, permitindo correções rápidas sem reiniciar o cálculo.
- **Parênteses `(` e `)`:** Suporte para priorização de cálculos matemáticos encadeados.
- **Formatação Numérica Limpa:** Resultados inteiros são formatados sem casas decimais redundantes (ex: `40` em vez de `40.0`), enquanto números decimais mantêm a precisão flutuante.

---

## 🖥️ Interface Gráfica & Experiência do Usuário (UX)

A interface gráfica foi desenhada seguindo princípios de **Human Interface Guidelines** e ergonomia visual:

```text
 ┌───────────────────────────────┐
 │       Calculadora Python      │
 ├───────────────────────────────┤
 │ [                       30 ]  │  <- Visor Numérico (tk.Entry)
 ├───────┬───────┬───────┬───────┤
 │   C   │   ⌫  │   %   │   /   │  <- Barra de Ações & Operador
 ├───────┼───────┼───────┼───────┤
 │   7   │   8   │   9   │   *   │
 ├───────┼───────┼───────┼───────┤
 │   4   │   5   │   6   │   -   │  <- Teclado Numérico & Operações
 ├───────┼───────┼───────┼───────┤
 │   1   │   2   │   3   │   +   │
 ├───────┼───────┼───────┼───────┤
 │   0   │   .   │   (   │   =   │  <- Base & Igual em Destaque
 └───────┴───────┴───────┴───────┘
```

### 🛡️ Tratamento de Erros e Proteção de Execução
O sistema utiliza blocos `try ... except` em todas as interações do usuário, impedindo que a aplicação trave:

- **Divisão por Zero (`ZeroDivisionError`):** Identificada antes que o interpretador pare. O visor exibe um pop-up amigável alertando sobre a impossibilidade matemática.
- **Sintaxe Inválida (`SyntaxError`):** Previne erros decorrentes de operadores digitados de maneira incorreta ou expressões incompletas.
- **Janela com Dimensões Travadas (`resizable(False, False)`):** Garante estabilidade visual contínua, mantendo o alinhamento de grade sem distorções.

---

## 🛠️ Tecnologias Utilizadas

- **[Python 3.8+](https://www.python.org/):** Linguagem principal, moderna e tipada dinamicamente.
- **[Tkinter](https://docs.python.org/3/library/tkinter.html):** Toolkit gráfico oficial integrado à Biblioteca Padrão do Python (sem necessidade de instalar pacotes de terceiros).
- **[unittest](https://docs.python.org/3/library/unittest.html):** Framework nativo para testes unitários e de integração.
- **[React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/):** Ambiente web interativo e pedagógico que complementa a experiência de aprendizado.

---

## 📂 Estrutura de Arquivos

```text
calculadora-python/
│
├── 📜 calculadora.py            # ⭐ Aplicação principal com Interface Gráfica Tkinter
├── 📜 calculadora_terminal.py   # Versão interativa de linha de comando (Console/Terminal)
├── 🧪 test_calculadora.py       # Suíte de testes automatizados com unittest
├── 📄 README.md                 # Documentação completa do projeto
│
├── 🌐 index.html                # Ponto de entrada do simulador web
├── ⚙️ package.json              # Metadados e scripts da aplicação web educacional
├── ⚙️ tsconfig.json             # Configurações do compilador TypeScript
├── ⚙️ vite.config.ts            # Configurações do empacotador Vite
│
└── 📁 src/
    ├── App.tsx                  # Dashboard principal do laboratório de estudos
    ├── data/
    │   └── pythonCodes.ts       # Base de código Python com comentários didáticos
    └── components/
        ├── InteractiveCalculator.tsx # Simulador funcional da calculadora no navegador
        ├── PythonCodeViewer.tsx      # Visualizador de código com abas e botão de cópia
        ├── AnatomyExplorer.tsx       # Guia interativo da anatomia de uma janela Tkinter
        ├── ExecutionGuide.tsx        # Instruções de terminal para Windows, Mac e Linux
        └── ChallengesSection.tsx     # Desafios práticos de programação para o aluno
```

---

## 🚀 Pré-requisitos & Como Executar

### 1. Pré-requisito
Certifique-se de possuir o **Python 3.8 ou superior** instalado em sua máquina. Para verificar:

```bash
python --version
```

### 2. Como Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/calculadora-python.git
cd calculadora-python
```

### 3. Executando a Calculadora Gráfica Desktop (Tkinter)
Basta rodar o arquivo principal pelo terminal:

```bash
python calculadora.py
```
> Uma janela moderna com tema escuro e botões táteis será iniciada imediatamente.

### 4. Executando a Versão Terminal / Linha de Comando
Caso prefira praticar lógica básica sem janela gráfica:

```bash
python calculadora_terminal.py
```

---

## 🧪 Testes Automatizados & Qualidade de Código

A integridade do software é garantida por uma suíte de testes com **100% de aprovação**, cobrindo tanto a lógica aritmética quanto a emulação de eventos da interface gráfica Tkinter.

### Executando os Testes:
```bash
python test_calculadora.py
```

### Resultado da Execução:
```text
test_operacoes_basicas (__main__.TestCalculadoraTerminal.test_operacoes_basicas) ... ok
test_porcentagem (__main__.TestCalculadoraTerminal.test_porcentagem) ... ok
test_fluxo_porcentagem_no_visor (__main__.TestCalculadoraGUI.test_fluxo_porcentagem_no_visor) ... ok
test_fluxo_visor_e_operacoes (__main__.TestCalculadoraGUI.test_fluxo_visor_e_operacoes) ... ok
test_seguranca_divisao_por_zero (__main__.TestCalculadoraGUI.test_seguranca_divisao_por_zero) ... ok

----------------------------------------------------------------------
Ran 5 tests in 0.285s

OK
```

### 📊 Cobertura dos Testes:
- **`test_operacoes_basicas`:** Valida soma, subtração, multiplicação e divisão com números inteiros, negativos e flutuantes.
- **`test_porcentagem`:** Confirma cálculos decimais diretos ($50\% = 0.5$) e percentuais compostos ($15\%$ de $200 = 30$).
- **`test_fluxo_porcentagem_no_visor`:** Garante a formatação e atualização correta de strings no widget `tk.Entry`.
- **`test_fluxo_visor_e_operacoes`:** Testa cadeias consecutivas de cliques e processamento de expressões.
- **`test_seguranca_divisao_por_zero`:** Valida o isolamento de exceções e respostas amigáveis ao usuário.

---

## 💻 Rodando o Simulador Web Educacional (Opcional)

Se desejar visualizar a plataforma interativa no navegador:

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev
```

Abra o endereço indicado (ex: `http://localhost:5173`) no seu navegador para explorar o laboratório interativo.

---

## 🤝 Como Contribuir

Contribuições são sempre bem-vindas! Se você deseja sugerir uma melhoria ou reportar um problema:

1. Faça um **Fork** deste repositório.
2. Crie uma Branch para sua feature (`git checkout -b feature/MinhaNovaFeature`).
3. Faça o commit de suas alterações (`git commit -m 'feat: adiciona nova funcionalidade'`).
4. Envie para o branch remoto (`git push origin feature/MinhaNovaFeature`).
5. Abra um **Pull Request**.

---

## 🎓 Uso e Estudos

Este projeto foi desenvolvido estritamente para fins educacionais e de estudo. Sinta-se totalmente à vontade para consultar, copiar ou utilizar o código para aprender e praticar programação!
