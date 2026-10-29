"""
Calculadora de Terminal com Menu Interativo em Python
Ideal para treinar lógica básica (while, if, input, float, funções)
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
    """
    Se percentual for fornecido, calcula a porcentagem relativa (ex: 15% de 200 = 30).
    Se apenas o valor for fornecido, converte para valor decimal (ex: 50 -> 0.5).
    """
    if percentual is None:
        return valor / 100
    return (valor * percentual) / 100

def calculadora():
    print("=" * 45)
    print("      CALCULADORA COMPLETA EM PYTHON      ")
    print("=" * 45)
    
    while True:
        print("\nEscolha a operação desejada:")
        print("1. Soma (+)")
        print("2. Subtração (-)")
        print("3. Multiplicação (*)")
        print("4. Divisão (/)")
        print("5. Porcentagem (%)")
        print("0. Sair")
        
        opcao = input("\nDigite sua opção (0-5): ").strip()
        
        if opcao == '0':
            print("\nEncerrando a calculadora. Bons estudos!")
            break
            
        if opcao not in ('1', '2', '3', '4', '5'):
            print("Opção inválida! Escolha um número entre 0 e 5.")
            continue
            
        if opcao == '5':
            try:
                base = float(input("Digite o valor total (ex: 200): "))
                taxa = float(input("Digite a porcentagem a calcular (ex: 15 para 15%): "))
            except ValueError:
                print("Entrada inválida! Digite apenas números.")
                continue
            resultado = porcentagem(base, taxa)
            print(f"-> Resultado: {taxa}% de {base} = {resultado}")
            continue

        try:
            num1 = float(input("Digite o primeiro número: "))
            num2 = float(input("Digite o segundo número: "))
        except ValueError:
            print("Entrada inválida! Digite apenas números.")
            continue
            
        if opcao == '1':
            print(f"-> Resultado: {num1} + {num2} = {somar(num1, num2)}")
        elif opcao == '2':
            print(f"-> Resultado: {num1} - {num2} = {subtrair(num1, num2)}")
        elif opcao == '3':
            print(f"-> Resultado: {num1} * {num2} = {multiplicar(num1, num2)}")
        elif opcao == '4':
            print(f"-> Resultado: {num1} / {num2} = {dividir(num1, num2)}")

if __name__ == "__main__":
    calculadora()
