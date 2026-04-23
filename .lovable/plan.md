
# KF Empréstimos — Redesign moderno e profissional

Recriação do site **kfemprestimos.com.br** com identidade visual **clean & corporativo claro** (estilo bancos digitais como Nubank/Inter/C6), preservando todo o conteúdo original e adicionando um simulador interativo.

## Identidade visual
- **Paleta**: branco como base, azul profundo (confiança/financeiro) como cor primária, laranja sutil da marca KF como acento para CTAs e destaques
- **Tipografia**: sans-serif moderna (Inter/Manrope), títulos grandes e arejados, hierarquia clara
- **Layout**: muito espaço em branco, cards com bordas suaves e sombras leves, divisores discretos
- **Microinterações**: hover states elegantes, fade-ins ao rolar, transições suaves
- **Logo KF**: mantido no header

## Estrutura da página (single page, scroll suave)

**1. Header fixo translúcido**
Logo KF · Links: Início · Sobre · Serviços · Simulador · Contato · botão CTA "Simular Agora"

**2. Hero**
- Título: "Empréstimo Consignado com as Melhores Taxas do Mercado"
- Subtítulo original mantido (aposentados, pensionistas, servidores, São Luís/MA)
- Dois CTAs: "Simular Agora" (primário) e "Falar no WhatsApp" (secundário)
- Selos de confiança: "Atendimento humano", "Taxas competitivas", "Sem burocracia"

**3. Faixa de números/credibilidade**
Anos de mercado · Clientes atendidos · Taxa a partir de X% · Liberação em até 24h

**4. Nossos Serviços** (grid de cards modernos com ícones)
- Aposentados e Pensionistas do INSS (bullets originais)
- Servidores Públicos (bullets originais)
- Portabilidade Bancária (badge "Novo", 3 sub-benefícios originais)
- FGTS — Antecipação (até 5 parcelas, mesmo negativado)

**5. Simulador interativo** ⭐ novo
- Sliders para **valor desejado** (R$ 1.000 – R$ 200.000) e **prazo** (12 – 120 meses)
- Seletor de modalidade (INSS / Servidor / FGTS / Portabilidade)
- Cálculo em tempo real de parcela estimada (taxa indicativa por modalidade)
- Aviso "valores estimados, sujeitos a análise"
- Botão "Solicitar essa simulação" → leva ao formulário pré-preenchido

**6. Como funciona** (4 passos)
Simule → Envie seus dados → Análise rápida → Dinheiro na conta

**7. Por que escolher a KF** (grid de diferenciais)
Atendimento personalizado, taxas competitivas, processo digital, suporte humano local em São Luís

**8. Formulário de simulação/contato**
- Campos: Nome, Telefone, E-mail, Modalidade, Valor desejado, Mensagem (opcional)
- Validação em tempo real
- **Ação ao enviar**: abre o WhatsApp da KF com mensagem formatada contendo todos os dados (`https://wa.me/...?text=...`)
- Toast de confirmação

**9. Localização / Sobre**
Bloco com endereço em São Luís - MA, mapa embed do Google Maps, horário de atendimento, telefone, e-mail

**10. Footer**
Logo, links rápidos, contato, redes sociais, aviso regulatório ("KF Empréstimos atua como correspondente bancário..."), copyright

## Responsividade & acessibilidade
- Mobile-first, menu hambúrguer no header
- Botão flutuante de WhatsApp em todas as páginas (canto inferior direito)
- Contraste AA, navegação por teclado, alt texts
