import React, { useState } from 'react';

export default function App() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: '🚀 Bom dia! Qual é a dor ou ideia de automação que queres validar hoje para o mercado automotivo ou imobiliário?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  
  const [currentIdea, setCurrentIdea] = useState({
    title: 'Aguardando Nova Ideia...',
    concept: 'Envia a tua mensagem no chat ao lado para a IA desenhar o teu SaaS de captação e automação de leads.',
    hook: 'O teu gancho viral para o TikTok vai aparecer aqui!',
    potential: 'R$ 0 / mês'
  });

  const handleSendMessage = async (userMessage) => {
    if (!userMessage.trim()) return;

    // Adiciona mensagem do utilizador
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInputMessage('');

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      // PROMPT ESPECIALISTA EM AUTOMÓVEIS E IMÓVEIS (B2B)
      const prompt = `
        Atua como um Arquiteto de Micro-SaaS B2B especialista nos mercados Automotivo e Imobiliário (OLX, Webmotors, Mercado Livre, Zap).
        O utilizador enviou a seguinte ideia/dor: "${userMessage}".

        Gera uma resposta estritamente em formato JSON puro (sem markdown, sem \`\`\`json, apenas o objeto) com a seguinte estrutura:
        {
          "nomeSaas": "Nome comercial de impacto (ex: AutoLead Capture, PropMatch AI)",
          "conceito": "Resumo executivo de como a ferramenta automatiza a captação de anúncios/leads no WhatsApp eliminando intermediários",
          "ganchoViral": "Um gancho forte de 2 linhas para o TikTok focado em donos de lojas de carros ou corretores de imóveis",
          "potencialEstimado": "R$ X.000 / mês com Y lojistas/corretores assinantes"
        }
      `;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
      );

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      // Limpa tags markdown caso a API retorne
      const cleanJsonText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const result = JSON.parse(cleanJsonText);

      // Atualiza o chat
      setMessages((prev) => [
        ...prev,
        { 
          sender: 'ai', 
          text: `⚡ IDEIA GERADA COM SUCESSO!\n\n🚘 **${result.nomeSaas}**\n\n💡 **Conceito:** ${result.conceito}\n\n💰 **Modelo:** ${result.potencialEstimado}` 
        }
      ]);

      // Atualiza o painel da direita imediatamente
      setCurrentIdea({
        title: result.nomeSaas,
        concept: result.conceito,
        hook: result.ganchoViral,
        potential: result.potencialEstimado
      });

    } catch (error) {
      console.error('Erro na chamada da API:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Ocorreu um erro ao processar. Verifica a tua VITE_GEMINI_API_KEY na Vercel!' }
      ]);
    }
  };

  return (
    <div className="flex h-screen bg-[#0d1117] text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#161b22] border-r border-gray-800 p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-6 text-red-500">AutoLead Studio AI</h1>
          <nav className="space-y-2">
            <a href="#" className="block p-2 rounded bg-red-600 text-white font-medium">Ritual Diário</a>
            <a href="#" className="block p-2 rounded text-gray-400 hover:bg-gray-800">Leads Capturados</a>
            <a href="#" className="block p-2 rounded text-gray-400 hover:bg-gray-800">Ganchos Virais</a>
          </nav>
        </div>
        <div className="bg-gray-900 p-3 rounded border border-gray-800">
          <p className="text-xs text-gray-400">Automações Ativas</p>
          <p className="text-lg font-bold text-green-400">24/7 Operando</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              Gerador de Micro-SaaS Automotivo & Imobiliário 🔥
            </h2>
            <p className="text-sm text-gray-400">Valida a tua ideia de captação automatizada para OLX, Webmotors e Mercado Livre.</p>
          </div>
          <span className="bg-green-900/40 text-green-400 border border-green-700 text-xs px-3 py-1 rounded-full font-medium">
            WhatsApp Bot Engine Ativo
          </span>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Container */}
          <div className="lg:col-span-2 bg-[#161b22] border border-gray-800 rounded-xl p-4 flex flex-col h-[520px]">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl text-sm ${msg.sender === 'user' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-200'}`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                placeholder="Descreve a tua ideia de captação de carros ou imóveis..."
                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-500"
              />
              <button
                onClick={() => handleSendMessage(inputMessage)}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
              >
                Enviar
              </button>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <span className="text-xs text-red-400 font-semibold uppercase tracking-wider">SaaS B2B AUTOMOTIVO / IMOBILIÁRIO</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-3">{currentIdea.title}</h3>
              
              <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 mb-4 text-xs text-gray-300">
                <span className="font-semibold text-gray-400 block mb-1">Conceito da Solução:</span>
                {currentIdea.concept}
              </div>

              <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 text-xs text-gray-300">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-red-400">GANCHO VIRAL TIKTOK / INSTAGRAM:</span>
                  <button onClick={() => navigator.clipboard.writeText(currentIdea.hook)} className="text-gray-400 hover:text-white">Copiar</button>
                </div>
                <p className="italic">"{currentIdea.hook}"</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800">
              <span className="text-xs text-gray-400 block">Potencial de Faturamento (MRR):</span>
              <span className="text-green-400 font-bold text-lg">{currentIdea.potential}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
