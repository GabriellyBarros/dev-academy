"""
Script de Testes Automatizados para a Calculadora Python
Verifica todas as 4 operações básicas, porcentagem e casos de borda.
"""

import sys
import unittest
import tkinter as tk

# Importa as funções da calculadora de terminal
import calculadora_terminal as calc_term

class TestCalculadoraTerminal(unittest.TestCase):
    def test_operacoes_basicas(self):
        # 1. Soma
        self.assertEqual(calc_term.somar(10, 5), 15)
        self.assertEqual(calc_term.somar(-3, 8), 5)
        self.assertEqual(calc_term.somar(2.5, 3.5), 6.0)

        # 2. Subtração
        self.assertEqual(calc_term.subtrair(20, 7), 13)
        self.assertEqual(calc_term.subtrair(5, 10), -5)
        self.assertEqual(calc_term.subtrair(10.5, 0.5), 10.0)

        # 3. Multiplicação
        self.assertEqual(calc_term.multiplicar(6, 7), 42)
        self.assertEqual(calc_term.multiplicar(-4, 5), -20)
        self.assertEqual(calc_term.multiplicar(2.5, 4), 10.0)

        # 4. Divisão
        self.assertEqual(calc_term.dividir(100, 4), 25.0)
        self.assertEqual(calc_term.dividir(7, 2), 3.5)
        self.assertIn("Erro", calc_term.dividir(10, 0))  # Divisão por zero

    def test_porcentagem(self):
        # Porcentagem simples (decimal)
        self.assertEqual(calc_term.porcentagem(50), 0.5)
        self.assertEqual(calc_term.porcentagem(100), 1.0)
        self.assertEqual(calc_term.porcentagem(0), 0.0)

        # Porcentagem relativa (taxa % de um total)
        self.assertEqual(calc_term.porcentagem(200, 15), 30.0) # 15% de 200 = 30
        self.assertEqual(calc_term.porcentagem(150, 10), 15.0) # 10% de 150 = 15
        self.assertEqual(calc_term.porcentagem(80, 50), 40.0)  # 50% de 80 = 40


class TestCalculadoraGUI(unittest.TestCase):
    """Testa a lógica da interface gráfica e o fluxo do visor."""
    def setUp(self):
        # Cria uma janela oculta para simular os widgets
        self.janela = tk.Tk()
        self.janela.withdraw() # Não exibe a janela na tela durante o teste
        self.visor = tk.Entry(self.janela)
        self.visor.pack()

    def tearDown(self):
        self.janela.destroy()

    def test_fluxo_visor_e_operacoes(self):
        # Teste Soma: 15 + 25 = 40
        self.visor.delete(0, tk.END)
        self.visor.insert(tk.END, "15+25")
        res = eval(self.visor.get())
        self.assertEqual(res, 40)

        # Teste Subtração: 100 - 35 = 65
        self.visor.delete(0, tk.END)
        self.visor.insert(tk.END, "100-35")
        res = eval(self.visor.get())
        self.assertEqual(res, 65)

        # Teste Multiplicação: 8 * 9 = 72
        self.visor.delete(0, tk.END)
        self.visor.insert(tk.END, "8*9")
        res = eval(self.visor.get())
        self.assertEqual(res, 72)

        # Teste Divisão: 144 / 12 = 12
        self.visor.delete(0, tk.END)
        self.visor.insert(tk.END, "144/12")
        res = eval(self.visor.get())
        self.assertEqual(res, 12)

    def test_fluxo_porcentagem_no_visor(self):
        # 1. Porcentagem de um número direto: 50 -> 0.5
        self.visor.delete(0, tk.END)
        self.visor.insert(tk.END, "50")
        valor = eval(self.visor.get()) / 100
        self.assertEqual(valor, 0.5)

        # 2. Porcentagem em expressão combinada: 200 * 15 % -> (200 * 15) / 100 = 30
        self.visor.delete(0, tk.END)
        self.visor.insert(tk.END, "200*15")
        valor = eval(self.visor.get()) / 100
        self.assertEqual(valor, 30.0)

        # 3. Formatação sem .0 quando for inteiro: 30.0 -> 30
        if isinstance(valor, float) and valor.is_integer():
            valor = int(valor)
        self.assertEqual(valor, 30)

    def test_seguranca_divisao_por_zero(self):
        self.visor.delete(0, tk.END)
        self.visor.insert(tk.END, "50/0")
        with self.assertRaises(ZeroDivisionError):
            eval(self.visor.get())


if __name__ == "__main__":
    suite = unittest.TestLoader().loadTestsFromTestCase(TestCalculadoraTerminal)
    suite.addTests(unittest.TestLoader().loadTestsFromTestCase(TestCalculadoraGUI))
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    if not result.wasSuccessful():
        sys.exit(1)
