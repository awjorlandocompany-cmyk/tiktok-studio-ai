const handleSendMessage = async (userMessage) => {
    if (!userMessage.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInputMessage('');

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const prompt = `
        Atua como um especialista em Micro SaaS e logística de transportes. 
        Com base na dor descrita pelo utilizador: "${userMessage}", gera uma resposta em formato JSON estrito (sem blocos de markdown adicionais, apenas o objeto puro) com a seguinte estrutura exata:
        {
          "nomeSaas": "Nome curto e comercial para o SaaS",
          "conceito": "Explicação simples de como a ferramenta resolve o problema",
          "ganchoViral": "Gancho chamativo para o TikTok focado nesta dor",
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
      
      // Limpa os crases de markdown caso a IA os inclua
      const cleanJsonText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const result = JSON.parse(cleanJsonText);

      // Adiciona a resposta dinâmica no chat
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: `⚡ IDEIA GERADA COM SUCESSO!\n\n💡 Conceito: ${result.conceito}\n🎯 Gancho: "${result.ganchoViral}"` }
      ]);

      // Atualiza imediatamente o cartão da direita com os dados novos
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
        { sender: 'ai', text: 'Ocorreu um erro ao processar a resposta. Tenta enviar novamente!' }
      ]);
    }
  };
