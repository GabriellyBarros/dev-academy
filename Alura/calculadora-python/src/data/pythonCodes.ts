export interface CodeSnippet {
  id: string;
  title: string;
  badge: string;
  description: string;
  filename: string;
  code: string;
  keyConcepts: {
    title: string;
    description: string;
    lineRef: string;
  }[];
}

export const pythonCalculatorCodeBasic = `"""
Calculadora Simples com Interface Gráfica (Tkinter)
Desenvolvida para iniciantes em programação Python.
Realiza as 4 operações matemáticas básicas (+, -, *, /) e cálculo de porcentagem (%)
"""

import tkinter as tk
from tkinter import messagebox

# -------------------------------------------------------------
# 1. FUNÇÕES DA CALCULADORA (LÓGICA)
# -------------------------------------------------------------

def clicar(caractere):
    """Insere o número ou operador no visor da calculadora."""
    visor.insert(tk.END, caractere)

def limpar():
    """Apaga todo o conteúdo atual do visor."""
    visor.delete(0, tk.END)

def porcentagem():
    """Calcula a porcentagem dividindo a expressão atual por 100."""
    expressao = visor.get()
    if not expressao:
        return
    try:
        # Avalia a expressão matemática e divide por 100
        resultado = eval(expressao) / 100
        limpar()
        if isinstance(resultado, float) and resultado.is_integer():
            resultado = int(resultado)
        visor.insert(tk.END, str(resultado))
    except Exception:
        limpar()
        messagebox.showerror("Erro", "Expressão inválida para porcentagem!")

def calcular():
    """Lê a expressão no visor, calcula o resultado e exibe."""
    expressao = visor.get()
    
    if not expressao:
        return

    try:
        # Avalia a expressão matemática de forma segura
        resultado = eval(expressao)
        
        # Limpa o visor e coloca o resultado
        limpar()
        visor.insert(tk.END, str(resultado))
        
    except ZeroDivisionError:
        limpar()
        messagebox.showerror("Erro Matemático", "Não é possível dividir por zero!")
    except Exception:
        limpar()
        messagebox.showerror("Erro de Sintaxe", "Expressão matemática inválida!")

# -------------------------------------------------------------
# 2. CRIAÇÃO DA JANELA PRINCIPAL
# -------------------------------------------------------------

# Cria o objeto principal da janela
janela = tk.Tk()
janela.title("Calculadora Python")
janela.geometry("320x420")
janela.configure(bg="#1E293B")
janela.resizable(False, False)  # Impede o usuário de redimensionar

# -------------------------------------------------------------
# 3. VISOR (ONDE APARECEM OS NÚMEROS)
# -------------------------------------------------------------

visor = tk.Entry(
    janela,
    font=("Segoe UI", 22, "bold"),
    bg="#0F172A",
    fg="#F8FAFC",
    bd=0,
    justify="right",
    insertbackground="#38BDF8"  # Cor do cursor piscando
)
visor.pack(fill="x", padx=16, pady=(20, 15), ipady=12)

# -------------------------------------------------------------
# 4. GRADE DE BOTÕES (LAYOUT)
# -------------------------------------------------------------

# Container para os botões ficarem alinhados em grade
grade_botoes = tk.Frame(janela, bg="#1E293B")
grade_botoes.pack(fill="both", expand=True, padx=12, pady=(0, 16))

# Matriz com o texto de cada botão na ordem desejada
layout_botoes = [
    ('C', '⌫', '%', '/'),
    ('7', '8', '9', '*'),
    ('4', '5', '6', '-'),
    ('1', '2', '3', '+'),
    ('0', '.', '(', '=')
]

# Configura o peso das colunas e linhas para preencherem o espaço
for i in range(5):
    grade_botoes.rowconfigure(i, weight=1)
for j in range(4):
    grade_botoes.columnconfigure(j, weight=1)

# Função auxiliar para acionar a ação correta de cada botão
def acao_botao(texto):
    if texto == '=':
        calcular()
    elif texto == 'C':
        limpar()
    elif texto == '%':
        porcentagem()
    elif texto == '⌫':
        atual = visor.get()
        if atual:
            visor.delete(len(atual) - 1, tk.END)
    else:
        clicar(texto)

# Cria e posiciona os botões na janela
for linha_idx, linha in enumerate(layout_botoes):
    for col_idx, texto in enumerate(linha):
        # Define cores diferenciadas para operadores e números
        if texto == '=':
            cor_bg = "#0284C7"  # Azul vibrante
            cor_fg = "#FFFFFF"
        elif texto in ('+', '-', '*', '/', 'C', '⌫', '%', '(', ')'):
            cor_bg = "#334155"  # Cinza intermediário
            cor_fg = "#38BDF8"  # Ciano suave
        else:
            cor_bg = "#1E293B"  # Fundo escuro para números
            cor_fg = "#F8FAFC"

        botao = tk.Button(
            grade_botoes,
            text=texto,
            font=("Segoe UI", 14, "bold"),
            bg=cor_bg,
            fg=cor_fg,
            activebackground="#475569",
            activeforeground="#FFFFFF",
            bd=0,
            relief="flat",
            cursor="hand2",
            command=lambda t=texto: acao_botao(t)
        )
        botao.grid(row=linha_idx, column=col_idx, padx=4, pady=4, sticky="nsew")

# -------------------------------------------------------------
# 5. INÍCIO DO LOOP DA INTERFACE
# -------------------------------------------------------------

# Mantém a janela aberta e escuta as interações do usuário
janela.mainloop()
`;

export const pythonCalculatorCodeExplicit = `"""
Calculadora Visual em Python com Funções Matemáticas Explícitas
Ideal para entender como funcionam somar(), subtrair(), multiplicar(), dividir() e porcentagem()
"""

import tkinter as tk
from tkinter import messagebox

# Variáveis globais para armazenar o primeiro valor e a operação
primeiro_numero = None
operacao_selecionada = None

# Funções Matemáticas Puras
def somar(a, b):
    return a + b

def subtrair(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    if b == 0:
        raise ZeroDivisionError("Divisão por zero não é permitida.")
    return a / b

def calcular_porcentagem(valor):
    """Calcula a porcentagem dividindo o número por 100."""
    return valor / 100

# Funções da Interface
def digitar_numero(digito):
    atual = visor.get()
    visor.delete(0, tk.END)
    visor.insert(0, atual + str(digito))

def definir_operacao(op):
    global primeiro_numero, operacao_selecionada
    try:
        primeiro_numero = float(visor.get())
        operacao_selecionada = op
        visor.delete(0, tk.END)
    except ValueError:
        messagebox.showwarning("Aviso", "Digite um número antes da operação!")

def aplicar_porcentagem():
    """Aplica o cálculo de porcentagem imediatamente ao número no visor."""
    try:
        conteudo = visor.get()
        if not conteudo:
            return
        valor = float(conteudo)
        resultado = calcular_porcentagem(valor)
        if resultado.is_integer():
            resultado = int(resultado)
        visor.delete(0, tk.END)
        visor.insert(0, str(resultado))
    except ValueError:
        messagebox.showerror("Erro", "Digite um número válido para aplicar porcentagem!")

def executar_calculo():
    global primeiro_numero, operacao_selecionada
    if operacao_selecionada is None or primeiro_numero is None:
        return
        
    try:
        segundo_numero = float(visor.get())
        
        if operacao_selecionada == '+':
            resultado = somar(primeiro_numero, segundo_numero)
        elif operacao_selecionada == '-':
            resultado = subtrair(primeiro_numero, segundo_numero)
        elif operacao_selecionada == '*':
            resultado = multiplicar(primeiro_numero, segundo_numero)
        elif operacao_selecionada == '/':
            resultado = dividir(primeiro_numero, segundo_numero)
            
        # Formata resultado (remove .0 se for inteiro)
        if resultado.is_integer():
            resultado = int(resultado)
            
        visor.delete(0, tk.END)
        visor.insert(0, str(resultado))
        
        # Reseta o estado
        primeiro_numero = None
        operacao_selecionada = None
        
    except ZeroDivisionError:
        messagebox.showerror("Erro", "Não é possível dividir por zero!")
        visor.delete(0, tk.END)
    except ValueError:
        messagebox.showerror("Erro", "Entrada inválida!")

def limpar_tela():
    global primeiro_numero, operacao_selecionada
    primeiro_numero = None
    operacao_selecionada = None
    visor.delete(0, tk.END)

# Montagem da Janela Tkinter
janela = tk.Tk()
janela.title("Calculadora com Funções")
janela.geometry("300x420")
janela.configure(bg="#0F172A")

visor = tk.Entry(janela, font=("Arial", 20), justify="right", bd=4)
visor.pack(fill="x", padx=10, pady=10, ipady=8)

# Botões
botoes_frame = tk.Frame(janela, bg="#0F172A")
botoes_frame.pack(fill="both", expand=True, padx=8, pady=8)

# Linha 0 (Controles e Operador %)
tk.Button(botoes_frame, text="C", command=limpar_tela, width=5, height=2, bg="#FECACA").grid(row=0, column=0, padx=2, pady=2)
tk.Button(botoes_frame, text="%", command=aplicar_porcentagem, width=5, height=2, bg="#E2E8F0").grid(row=0, column=1, padx=2, pady=2)
tk.Button(botoes_frame, text=".", command=lambda: digitar_numero('.'), width=5, height=2).grid(row=0, column=2, padx=2, pady=2)
tk.Button(botoes_frame, text="/", command=lambda: definir_operacao('/'), width=5, height=2, bg="#E2E8F0").grid(row=0, column=3, padx=2, pady=2)

# Linha 1
tk.Button(botoes_frame, text="7", command=lambda: digitar_numero(7), width=5, height=2).grid(row=1, column=0, padx=2, pady=2)
tk.Button(botoes_frame, text="8", command=lambda: digitar_numero(8), width=5, height=2).grid(row=1, column=1, padx=2, pady=2)
tk.Button(botoes_frame, text="9", command=lambda: digitar_numero(9), width=5, height=2).grid(row=1, column=2, padx=2, pady=2)
tk.Button(botoes_frame, text="*", command=lambda: definir_operacao('*'), width=5, height=2, bg="#E2E8F0").grid(row=1, column=3, padx=2, pady=2)

# Linha 2
tk.Button(botoes_frame, text="4", command=lambda: digitar_numero(4), width=5, height=2).grid(row=2, column=0, padx=2, pady=2)
tk.Button(botoes_frame, text="5", command=lambda: digitar_numero(5), width=5, height=2).grid(row=2, column=1, padx=2, pady=2)
tk.Button(botoes_frame, text="6", command=lambda: digitar_numero(6), width=5, height=2).grid(row=2, column=2, padx=2, pady=2)
tk.Button(botoes_frame, text="-", command=lambda: definir_operacao('-'), width=5, height=2, bg="#E2E8F0").grid(row=2, column=3, padx=2, pady=2)

# Linha 3
tk.Button(botoes_frame, text="1", command=lambda: digitar_numero(1), width=5, height=2).grid(row=3, column=0, padx=2, pady=2)
tk.Button(botoes_frame, text="2", command=lambda: digitar_numero(2), width=5, height=2).grid(row=3, column=1, padx=2, pady=2)
tk.Button(botoes_frame, text="3", command=lambda: digitar_numero(3), width=5, height=2).grid(row=3, column=2, padx=2, pady=2)
tk.Button(botoes_frame, text="+", command=lambda: definir_operacao('+'), width=5, height=2, bg="#E2E8F0").grid(row=3, column=3, padx=2, pady=2)

# Linha 4
tk.Button(botoes_frame, text="0", command=lambda: digitar_numero(0), width=12, height=2).grid(row=4, column=0, columnspan=2, padx=2, pady=2, sticky="we")
tk.Button(botoes_frame, text="=", command=executar_calculo, width=12, height=2, bg="#BAE6FD").grid(row=4, column=2, columnspan=2, padx=2, pady=2, sticky="we")

janela.mainloop()
`;

export const pythonCalculatorCodeConsole = `"""
Calculadora de Terminal com Menu Interativo em Python
Ideal para treinar lógica básica (while, if, input, float)
"""

def somar(a, b):
    return a + b

def subtrair(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b

def porcentagem(valor, percentual=None):
    """Calcula a porcentagem. Se percentual for informado, calcula percentual % de valor."""
    if percentual is None:
        return valor / 100
    return (valor * percentual) / 100

def calculadora():
    print("=" * 40)
    print("      CALCULADORA COMPLETA EM PYTHON      ")
    print("=" * 40)
    
    while True:
        print("\\nEscolha a operação:")
        print("1. Soma (+)")
        print("2. Subtração (-)")
        print("3. Multiplicação (*)")
        print("4. Divisão (/)")
        print("5. Porcentagem (%)")
        print("0. Sair")
        
        opcao = input("\\nDigite sua opção (0-5): ").strip()
        
        if opcao == '0':
            print("\\nEncerrando a calculadora. Até mais!")
            break
            
        if opcao not in ('1', '2', '3', '4', '5'):
            print("Opção inválida! Escolha um número entre 0 e 5.")
            continue
            
        if opcao == '5':
            try:
                base = float(input("Digite o valor total (ex: 200): "))
                taxa = float(input("Digite a porcentagem a calcular (ex: 15 para 15%): "))
            except ValueError:
                print("Entrada inválida! Digite apenas números reais.")
                continue
            resultado = porcentagem(base, taxa)
            print(f"Resultado: {taxa}% de {base} = {resultado}")
            continue

        try:
            num1 = float(input("Digite o primeiro número: "))
            num2 = float(input("Digite o segundo número: "))
        except ValueError:
            print("Entrada inválida! Digite apenas números reais.")
            continue
            
        if opcao == '1':
            print(f"Resultado: {num1} + {num2} = {somar(num1, num2)}")
        elif opcao == '2':
            print(f"Resultado: {num1} - {num2} = {subtrair(num1, num2)}")
        elif opcao == '3':
            print(f"Resultado: {num1} * {num2} = {multiplicar(num1, num2)}")
        elif opcao == '4':
            print(f"Resultado: {num1} / {num2} = {dividir(num1, num2)}")

if __name__ == "__main__":
    calculadora()
`;

export interface ComponentExplanation {
  id: string;
  number: string;
  title: string;
  codeSnippet: string;
  summary: string;
  whyItMatters: string;
  beginnerTip: string;
  targetWidget?: 'window' | 'visor' | 'keypad' | 'operator' | 'equals' | 'clear';
}

export const componentExplanations: ComponentExplanation[] = [
  {
    id: "import-tkinter",
    number: "01",
    title: "Importação da Biblioteca Tkinter",
    codeSnippet: "import tkinter as tk\nfrom tkinter import messagebox",
    summary: "O Tkinter é o pacote padrão do Python para criar Interfaces Gráficas (GUI). Ele já vem instalado com o Python no Windows, Mac e Linux.",
    whyItMatters: "Usamos 'as tk' como um apelido conveniente para economizar digitação: em vez de escrever 'tkinter.Button', escrevemos 'tk.Button'. O 'messagebox' serve para exibir alertas pop-up em caso de erros.",
    beginnerTip: "Você não precisa instalar nada via pip! O Tkinter faz parte da Biblioteca Padrão do Python (Standard Library).",
    targetWidget: "window"
  },
  {
    id: "janela-principal",
    number: "02",
    title: "A Janela Principal (tk.Tk)",
    codeSnippet: "janela = tk.Tk()\njanela.title('Calculadora Python')\njanela.geometry('320x420')\njanela.resizable(False, False)",
    summary: "Inicializa a janela do sistema operacional e define suas dimensões e propriedades.",
    whyItMatters: "tk.Tk() é a 'raiz' (root) da sua aplicação gráfica. Sem ela, nenhum botão ou campo de texto pode existir na tela.",
    beginnerTip: "A função '.resizable(False, False)' trava a largura e a altura, garantindo que o layout da sua calculadora fique sempre perfeitamente alinhado sem quebrar se o usuário tentar esticar a janela.",
    targetWidget: "window"
  },
  {
    id: "visor-entry",
    number: "03",
    title: "O Visor com tk.Entry",
    codeSnippet: "visor = tk.Entry(\n    janela,\n    font=('Segoe UI', 22, 'bold'),\n    justify='right'\n)\nvisor.pack(fill='x', padx=16, pady=20)",
    summary: "Cria uma caixa de texto de linha única onde aparecem os dígitos digitados e o resultado das contas.",
    whyItMatters: "A propriedade justify='right' faz os números alinharem à direita, exatamente como em uma calculadora física ou do celular.",
    beginnerTip: "O método .get() lê o texto que está no visor, .insert() escreve novo conteúdo, e .delete(0, tk.END) apaga tudo.",
    targetWidget: "visor"
  },
  {
    id: "funcoes-logica",
    number: "04",
    title: "Lógica de Ação (clicar, limpar e calcular)",
    codeSnippet: "def calcular():\n    try:\n        resultado = eval(visor.get())\n        limpar()\n        visor.insert(tk.END, str(resultado))\n    except ZeroDivisionError:\n        messagebox.showerror('Erro', 'Divisão por zero!')",
    summary: "Contém as ações que rodam quando o usuário clica nos botões.",
    whyItMatters: "O bloco 'try ... except' previne que o programa trave silenciosamente. Se o usuário tentar dividir 10 por 0, o Python gera um ZeroDivisionError que tratamos amigavelmente.",
    beginnerTip: "No Python para iniciantes, eval() calcula expressões completas como '12 + 5 * 2'. Em projetos maiores com dados externos não confiáveis, recomendamos criar funções matemáticas próprias.",
    targetWidget: "equals"
  },
  {
    id: "layout-grade",
    number: "05",
    title: "Posicionamento em Grade (.grid)",
    codeSnippet: "for linha_idx, linha in enumerate(layout_botoes):\n    for col_idx, texto in enumerate(linha):\n        botao.grid(row=linha_idx, column=col_idx, sticky='nsew')",
    summary: "Organiza os botões em linhas (row) e colunas (column), criando uma matriz limpa e matemática.",
    whyItMatters: "Em vez de posicionar botão por botão com coordenadas em pixels manuais, a matriz do Tkinter calcula o espaço e mantém o espaçamento uniforme automaticamente.",
    beginnerTip: "O parâmetro sticky='nsew' significa 'North, South, East, West' (Norte, Sul, Leste, Oeste). Ele estica o botão para preencher toda a sua célula na grade.",
    targetWidget: "keypad"
  },
  {
    id: "mainloop",
    number: "06",
    title: "O Loop Principal (janela.mainloop())",
    codeSnippet: "janela.mainloop()",
    summary: "Coloca a aplicação em um loop infinito esperando por eventos: cliques de mouse, teclas digitadas ou fechar a janela.",
    whyItMatters: "Se você esquecer essa linha, o Python executará o arquivo em milissegundos e fechará o programa imediatamente antes de você ver a janela!",
    beginnerTip: "Essa deve ser sempre a ÚLTIMA linha do seu script com interface gráfica no Tkinter.",
    targetWidget: "window"
  }
];

export const learningChallenges = [
  {
    title: "Desafio 1: Adicionar Tecla Backspace (⌫)",
    difficulty: "Fácil",
    description: "Permita que o usuário apague apenas o último caractere digitado sem ter que limpar o visor inteiro.",
    hint: "Use fatiamento de string em Python: texto_atual[:-1] ou visor.delete(len(visor.get()) - 1, tk.END)."
  },
  {
    title: "Desafio 2: Personalizar Cores e Fontes",
    difficulty: "Fácil",
    description: "Mude a paleta de cores para o seu estilo favorito: modo claro, tema pastel ou tons de roxo/azul.",
    hint: "Altere os parâmetros bg='...' (background) e fg='...' (foreground/texto) na criação dos botões e da janela."
  },
  {
    title: "Desafio 3: Impedir Dois Operadores Seguidos",
    difficulty: "Médio",
    description: "Evite que o usuário digite expressões inválidas como '5++2' ou '8*/3'.",
    hint: "Antes de inserir um operador, verifique se o último caractere do visor já é um operador (+, -, *, /)."
  },
  {
    title: "Desafio 4: Atalhos do Teclado Físico",
    difficulty: "Avançado",
    description: "Faça a calculadora responder quando você digita os números no teclado físico do computador.",
    hint: "Use janela.bind('<Key>', funcao_tecla) para capturar as teclas pressionadas pelo usuário."
  }
];
