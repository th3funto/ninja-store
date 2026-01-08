# 🥷 Ninja Store Calculator

> **Uma ferramenta poderosa de precificação e simulação de vendas para importadores e lojistas.**

![Project Status](https://img.shields.io/badge/status-active-emerald)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-v19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-v5-3178C6)

## 📖 Sobre o Projeto

O **Ninja Store Calculator** é uma aplicação web desenvolvida para automatizar o processo de precificação de produtos importados (como iPhones, MacBooks, etc).

O sistema resolve a dor de cabeça de calcular preços finais considerando múltiplas variáveis: conversão do dólar, taxas de importadores (cegonha/freteiro), margem de lucro desejada e, principalmente, o **cálculo reverso de taxas de cartão de crédito**, onde o juros é repassado integralmente ao cliente final na simulação de parcelamento.

## ✨ Funcionalidades Principais

*   **💲 Conversão Instantânea:** Cotação Dólar x Real em tempo real.
*   **🧮 Precificação Inteligente:** Insira a porcentagem do importador e sua margem de lucro separadamente.
*   **📊 Visualização Gráfica:** Gráfico (Pie Chart) que mostra exatamente para onde vai o dinheiro (Custo Base vs. Taxas vs. Lucro).
*   **💳 Tabela de Parcelamento (Repasse de Juros):** 
    *   Cálculo automático de 1x a 12x.
    *   O valor da parcela já inclui a taxa da maquininha (o vendedor recebe o valor cheio à vista).
    *   Alternância rápida entre perfis de taxas (**Visa/Master** vs **Elo/Amex**).
*   **📱 Modo Vendedor (Copy & Paste):** Botão "Copiar Oferta" que gera um texto formatado profissionalmente para WhatsApp/Instagram.
*   **🎨 UI/UX:** Interface moderna em Dark Mode, responsiva e focada em produtividade.

## 🚀 Tecnologias Utilizadas

*   **[React](https://react.dev/)** - Biblioteca de interface.
*   **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática.
*   **[Vite](https://vitejs.dev/)** - Build tool e servidor de desenvolvimento.
*   **[Tailwind CSS](https://tailwindcss.com/)** - Estilização.
*   **[Recharts](https://recharts.org/)** - Gráficos de dados.
*   **[Lucide React](https://lucide.dev/)** - Ícones.

## 📂 Como Usar

1. Insira o nome do produto.
2. Coloque o valor em Dólar (USD) e a cotação atual.
3. Ajuste a taxa do importador (custo) e sua margem de lucro.
4. O sistema gera automaticamente o preço à vista e a tabela de parcelamento.
5. Clique em **"Copiar Oferta"** para compartilhar com o cliente.

## 👨‍💻 Autor

Desenvolvido por **Marcelo Tarouquela**.

---

*Projeto desenvolvido para fins de produtividade e automação comercial.*