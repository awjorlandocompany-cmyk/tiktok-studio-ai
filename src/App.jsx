import React, { useState } from 'react';

export default function App() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: '🚀 Bom dia! Qual foi o maior problema ou dor que enfrentaste hoje no teu trabalho ou rotina?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentIdea, setCurrentIdea] = useState({
    title: 'BotAuto Response TikTok',
    concept: 'Um SaaS ultra-simples que responde automaticamente a comentários em vídeos do TikTok e envia o teu link de afiliado no piloto automático.',
    hook: 'Stop a perder vendas no TikTok! Se respondes a comentários manualmente, estás a rasgar dinheiro. Esta IA faz isto por ti enquanto dormes.',
    potential: 'R$ 15.000 / mês com 300 assinantes'
  });

  const handleSendMessage = async (userMessage) => {
    if (!userMessage.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInputMessage('');

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const prompt = `
        Atua como um especialista em Micro SaaS e TikTok Marketing. 
        Com base na dor descrita: "${userMessage}", gera uma resposta em formato JSON estrito com a seguinte estrutura:
        {
          "nomeSaas": "Nome do SaaS",
          "conceito": "Breve explicação da solução simples",
          "ganchoViral": "Gancho chamativo de 2 linhas para o TikTok",
          "potencialEstimado": "R$ X.000 / mês com Y assinantes"
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
      const cleanJsonText = rawText.replace(/```json|```/g, '').trim();
      const result = JSON.parse(cleanJsonText);

      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: `⚡ IDEIA GERADA COM SUCESSO!\n\n💡 Conceito: ${result.conceito}` }
      ]);

      setCurrentIdea({
        title: result.nomeSaas,
        concept: result.conceito,
        hook: result.ganchoViral,
        potential: result.potencialEstimado
      });

    } catch (error) {
      console.error('Erro ao chamar a API:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Ocorreu um erro ao gerar a ideia. Tenta novamente!' }
      ]);
    }
  };

  return (
    <div className="flex h-screen bg-[#0d1117] text-white font-sans">
      <aside className="w-64 bg-[#161b22] border-r border-gray-800 p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-6 text-red-500">TikTok Studio AI</h1>
          <nav className="space-y-2">
            <a href="#" className="block p-2 rounded bg-red-600 text-white font-medium">Ritual Diário</a>
            <a href="#" className="block p-2 rounded text-gray-400 hover:bg-gray-800">Ugly Tracker (Perfis)</a>
            <a href="#" className="block p-2 rounded text-gray-400 hover:bg-gray-800">Ganchos Virais</a>
          </nav>
        </div>
        <div className="bg-gray-900 p-3 rounded border border-gray-800">
          <p className="text-xs text-gray-400">Leads Capturados</p>
          <p className="text-lg font-bold text-white">1,482</p>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              Ritual Diário de Ideias 🔥
            </h2>
            <p className="text-sm text-gray-400">Responde à pergunta diária e deixa a IA desenhar o teu próximo Micro-SaaS.</p>
          </div>
          <span className="bg-green-900/40 text-green-400 border border-green-700 text-xs px-3 py-1 rounded-full font-medium">
            WhatsApp Bot Ativo (09:00)
          </span>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#161b22] border border-gray-800 rounded-xl p-4 flex flex-col h-[500px]">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.sender === 'user' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-200'}`}>
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
                placeholder="Digita a tua resposta/dor aqui..."
                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-500"
              />
              <button
                onClick={() => handleSendMessage(inputMessage)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Enviar
              </button>
            </div>
          </div>

          <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <span className="text-xs text-gray-400 uppercase tracking-wider">AUTOMAÇÃO & VENDAS</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">{currentIdea.title}</h3>
              
              <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 mb-4 text-xs text-gray-300">
                <span className="font-semibold text-gray-400 block mb-1">Conceito do SaaS:</span>
                {currentIdea.concept}
              </div>

              <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 text-xs text-gray-300">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-red-400">GANCHO VIRAL PARA O TIKTOK:</span>
                  <button onClick={() => navigator.clipboard.writeText(currentIdea.hook)} className="text-gray-400 hover:text-white">Copiar</button>
                </div>
                <p className="italic">"{currentIdea.hook}"</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800">
              <span className="text-xs text-gray-400 block">Potencial Estimado:</span>
              <span className="text-green-400 font-bold text-base">{currentIdea.potential}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
