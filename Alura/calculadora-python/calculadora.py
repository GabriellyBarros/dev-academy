"""
Calculadora Gráfica em Python com Tkinter
Realiza as operações básicas (+, -, *, /) e cálculo de porcentagem (%)
"""

import tkinter as tk
from tkinter import messagebox

# ==============================================================================
# 1. FUNÇÕES DE LÓGICA E MATEMÁTICA
# ==============================================================================

def clicar(caractere):
    """Insere o caractere ou operador selecionado no final do visor."""
    visor.insert(tk.END, caractere)

def limpar():
    """Apaga todo o conteúdo atual do visor."""
    visor.delete(0, tk.END)

def apagar_ultimo():
    """Apaga apenas o último caractere digitado (Backspace)."""
    conteudo = visor.get()
    if conteudo:
        visor.delete(len(conteudo) - 1, tk.END)

def porcentagem():
    """
    Calcula a porcentagem.
    Pega o número ou o resultado da expressão exibida no visor e divide por 100.
    Exemplo: 50 -> 0.5 | 200 * 15 -> calcula 3000 / 100 = 30
    """
    expressao = visor.get()
    if not expressao:
        return
    try:
        resultado = eval(expressao) / 100
        limpar()
        # Se o resultado for inteiro (ex: 2.0), exibe apenas 2
        if isinstance(resultado, float) and resultado.is_integer():
            resultado = int(resultado)
        visor.insert(tk.END, str(resultado))
    except Exception:
        limpar()
        messagebox.showerror("Erro", "Expressão inválida para porcentagem!")

def calcular():
    """
    Avalia a expressão matemática digitada no visor e exibe o resultado final.
    Conta com proteção contra divisão por zero e erros de digitação.
    """
    expressao = visor.get()
    if not expressao:
        return

    try:
        resultado = eval(expressao)
        limpar()
        if isinstance(resultado, float) and resultado.is_integer():
            resultado = int(resultado)
        visor.insert(tk.END, str(resultado))
    except ZeroDivisionError:
        limpar()
        messagebox.showerror("Erro Matemático", "Não é possível dividir por zero!")
    except Exception:
        limpar()
        messagebox.showerror("Erro de Sintaxe", "Expressão matemática inválida!")

def acao_botao(texto):
    """Direciona a ação adequada dependendo do botão clicado."""
    if texto == '=':
        calcular()
    elif texto == 'C':
        limpar()
    elif texto == '⌫':
        apagar_ultimo()
    elif texto == '%':
        porcentagem()
    else:
        clicar(texto)

# ==============================================================================
# 2. CONSTRUÇÃO DA INTERFACE GRÁFICA (TKINTER)
# ==============================================================================

janela = tk.Tk()
janela.title("Calculadora Python")
janela.geometry("320x420")
janela.configure(bg="#1E293B")
janela.resizable(False, False)

# Visor numérico
visor = tk.Entry(
    janela,
    font=("Segoe UI", 22, "bold"),
    bg="#0F172A",
    fg="#F8FAFC",
    bd=0,
    justify="right",
    insertbackground="#38BDF8"
)
visor.pack(fill="x", padx=16, pady=(20, 15), ipady=12)

# Grade de botões
grade_botoes = tk.Frame(janela, bg="#1E293B")
grade_botoes.pack(fill="both", expand=True, padx=12, pady=(0, 16))

# Matriz 5x4 com os botões
layout_botoes = [
    ('C', '⌫', '%', '/'),
    ('7', '8', '9', '*'),
    ('4', '5', '6', '-'),
    ('1', '2', '3', '+'),
    ('0', '.', '(', '=')
]

# Configuração de pesos para responsividade da grade
for i in range(5):
    grade_botoes.rowconfigure(i, weight=1)
for j in range(4):
    grade_botoes.columnconfigure(j, weight=1)

# Renderização dos botões
for linha_idx, linha in enumerate(layout_botoes):
    for col_idx, texto in enumerate(linha):
        if texto == '=':
            cor_bg = "#0284C7"
            cor_fg = "#FFFFFF"
        elif texto in ('+', '-', '*', '/', 'C', '⌫', '%', '(', ')'):
            cor_bg = "#334155"
            cor_fg = "#38BDF8"
        else:
            cor_bg = "#1E293B"
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

if __name__ == "__main__":
    janela.mainloop()
