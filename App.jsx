import React, { useState } from 'react';
import { 
  Sparkles, MessageSquare, Flame, TrendingUp, Users, Eye, DollarSign, 
  ArrowRight, Play, Zap, CheckCircle2, Copy, BarChart2, Video
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('ritual');
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedIdea, setGeneratedIdea] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { text: "🚀 Bom dia! Qual foi o maior problema ou dor que enfrentaste hoje no teu trabalho ou rotina?", sender: "bot", time: "09:00" }
  ]);
  const [copiedHook, setCopiedHook] = useState(false);

  const handleGenerateIdea = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setLoading(true);
    setChatMessages(prev => [...prev, { text: userInput, sender: "user", time: "09:02" }]);

    setTimeout(() => {
      const newIdea = {
        title: "BotAuto Response TikTok",
        niche: "Automação & Vendas",
        pain: userInput,
        concept: "Um SaaS ultra-simples que responde automaticamente a comentários em vídeos do TikTok e envia o teu link de afiliado por Direct no piloto automático.",
        pricing: "R$ 49/mês (ou R$ 397/ano)",
        hook: `Stop a perder vendas no TikTok! Se respondes a comentários manualmente, estás a rasgar dinheiro. Esta IA faz isso por ti enquanto dormes.`,
        mrrPotential: "R$ 15.000 / mês com 300 assinantes"
      };

      setGeneratedIdea(newIdea);
      setChatMessages(prev => [
        ...prev,
        { 
          text: `⚡ IDEIA GERADA COM SUCESSO!\n\n💡 Conceito: ${newIdea.concept}\n💰 Modelo: ${newIdea.pricing}\n🔥 Gancho Viral: "${newIdea.hook}"`, 
          sender: "bot", 
          time: "09:02" 
        }
      ]);
      setLoading(false);
      setUserInput('');
    }, 1500);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedHook(true);
    setTimeout(() => setCopiedHook(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans flex flex-col md:flex-row">
      {/* Sidebar Nativa TikTok */}
      <div className="w-full md:w-64 bg-[#1e1e1e] border-r border-gray-800 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-8 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] flex items-center justify-center font-bold text-black text-lg">
              🎵
            </div>
            <span className="font-bold text-xl tracking-wide">TikTok Studio AI</span>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('ritual')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'ritual' ? 'bg-gradient-to-r from-[#25F4EE]/20 to-[#FE2C55]/20 border border-[#25F4EE]/50 text-white font-bold' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              <Sparkles className="w-5 h-5 text-[#25F4EE]" />
              <span>Ritual Diário</span>
            </button>

            <button 
              onClick={() => setActiveTab('tracker')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'tracker' ? 'bg-gradient-to-r from-[#25F4EE]/20 to-[#FE2C55]/20 border border-[#25F4EE]/50 text-white font-bold' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              <BarChart2 className="w-5 h-5 text-[#FE2C55]" />
              <span>Ugly Tracker (Perfis)</span>
            </button>

            <button 
              onClick={() => setActiveTab('hooks')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'hooks' ? 'bg-gradient-to-r from-[#25F4EE]/20 to-[#FE2C55]/20 border border-[#25F4EE]/50 text-white font-bold' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              <Video className="w-5 h-5 text-[#25F4EE]" />
              <span>Ganchos Virais</span>
            </button>
          </nav>
        </div>

        <div className="bg-gray-900/80 p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
            <Users className="w-4 h-4 text-[#25F4EE]" />
            <span>Leads Capturados</span>
          </div>
          <div className="text-xl font-bold text-white">1,482</div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        {activeTab === 'ritual' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <header className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2">
                  <span>Ritual Diário de Ideias</span>
                  <Flame className="w-7 h-7 text-[#FE2C55]" />
                </h1>
                <p className="text-gray-400 text-sm mt-1">Responde à pergunta diária e deixa a IA desenhar o teu próximo Micro-SaaS ou produto viral.</p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-full flex items-center gap-2 text-emerald-400 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>WhatsApp Bot Ativo (09:00)</span>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Simulador de Chat WhatsApp */}
              <div className="bg-[#1e1e1e] border border-gray-800 rounded-2xl p-4 flex flex-col h-[500px]">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-800">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold">
                    WA
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">TikTok Studio Bot</h3>
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online
                    </span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto py-4 space-y-3">
                  {chatMessages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-line ${
                        msg.sender === 'user' 
                          ? 'bg-[#FE2C55] text-white rounded-br-none' 
                          : 'bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-gray-500 mt-1">{msg.time}</span>
                    </div>
                  ))}
                  {loading && (
                    <div className="text-xs text-[#25F4EE] animate-pulse">A IA está a criar a ideia e o gancho...</div>
                  )}
                </div>

                <form onSubmit={handleGenerateIdea} className="pt-3 border-t border-gray-800 flex gap-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Digita a tua resposta/dor aqui..."
                    className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#25F4EE]"
                  />
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] text-black font-bold px-4 py-2 rounded-xl text-sm hover:opacity-90 transition-opacity"
                  >
                    Enviar
                  </button>
                </form>
              </div>

              {/* Resultado da Ideia Gerada */}
              <div className="bg-[#1e1e1e] border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
                {generatedIdea ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs text-[#25F4EE] font-bold uppercase tracking-wider">{generatedIdea.niche}</span>
                        <h2 className="text-xl font-bold text-white mt-1">{generatedIdea.title}</h2>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/30">
                        {generatedIdea.pricing}
                      </span>
                    </div>

                    <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
                      <h4 className="text-xs font-semibold text-gray-400 mb-1">Conceito do SaaS:</h4>
                      <p className="text-sm text-gray-200 leading-relaxed">{generatedIdea.concept}</p>
                    </div>

                    <div className="bg-gradient-to-r from-[#FE2C55]/10 to-[#25F4EE]/10 p-4 rounded-xl border border-[#FE2C55]/30">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xs font-semibold text-[#FE2C55] uppercase">Gancho Viral para o TikTok:</h4>
                        <button 
                          onClick={() => copyToClipboard(generatedIdea.hook)}
                          className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          {copiedHook ? 'Copiado!' : 'Copiar'}
                        </button>
                      </div>
                      <p className="text-sm italic text-gray-100">"{generatedIdea.hook}"</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-800">
                      <span>Potencial Estimado:</span>
                      <span className="text-emerald-400 font-bold text-sm">{generatedIdea.mrrPotential}</span>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
                    <Sparkles className="w-12 h-12 mb-3 text-gray-600 animate-pulse" />
                    <p className="text-sm">Responde ao chat do ritual no lado esquerdo para gerares a tua primeira ideia de produto e o gancho viral de TikTok!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tracker' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <header className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Ugly Tracker (Matriz TikTok)</h1>
                <p className="text-gray-400 text-sm">Acompanhamento das tuas contas automáticas de corte e conteúdo orgânico.</p>
              </div>
              <button className="bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] text-black font-bold px-4 py-2 rounded-xl text-sm">
                + Adicionar Conta
              </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#1e1e1e] p-4 rounded-xl border border-gray-800">
                <div className="text-xs text-gray-400">Total Views Acumuladas</div>
                <div className="text-2xl font-black text-[#25F4EE] mt-1">58.4M</div>
              </div>
              <div className="bg-[#1e1e1e] p-4 rounded-xl border border-gray-800">
                <div className="text-xs text-gray-400">Contas Ativas</div>
                <div className="text-2xl font-black text-[#FE2C55] mt-1">12 Perfis</div>
              </div>
              <div className="bg-[#1e1e1e] p-4 rounded-xl border border-gray-800">
                <div className="text-xs text-gray-400">Conversão Média</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">4.2%</div>
              </div>
            </div>

            <div className="bg-[#1e1e1e] border border-gray-800 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-900 text-gray-400 text-xs uppercase">
                  <tr>
                    <th className="p-4">Conta (@)</th>
                    <th className="p-4">Nicho</th>
                    <th className="p-4">Views</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  <tr>
                    <td className="p-4 font-bold text-white">@corta_viral01</td>
                    <td className="p-4 text-gray-400">Cortez & IA</td>
                    <td className="p-4 text-[#25F4EE]">12.4M</td>
                    <td className="p-4"><span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded">Ativa</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">@biz_hacks_br</td>
                    <td className="p-4 text-gray-400">Negócios</td>
                    <td className="p-4 text-[#25F4EE]">8.1M</td>
                    <td className="p-4"><span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded">Ativa</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'hooks' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Gerador de Ganchos Virais</h1>
            <p className="text-gray-400 text-sm">Modelos testados para prender a atenção nos primeiros 3 segundos.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-gray-800 space-y-3">
                <span className="text-xs font-bold text-[#FE2C55]">TENDÊNCIA #1</span>
                <p className="text-sm font-semibold">"Eu criei um app em 5 minutos que me paga R$ 50 todos os dias e ninguém está a falar disto..."</p>
                <button className="text-xs text-[#25F4EE] hover:underline">Copiar Roteiro Completo →</button>
              </div>
              <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-gray-800 space-y-3">
                <span className="text-xs font-bold text-[#25F4EE]">TENDÊNCIA #2</span>
                <p className="text-sm font-semibold">"Se usas o TikTok mais de 2 horas por dia e ainda não tens esta ferramenta ativada..."</p>
                <button className="text-xs text-[#25F4EE] hover:underline">Copiar Roteiro Completo →</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
