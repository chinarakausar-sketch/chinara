import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertTriangle, User, Bot, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { createChatSession } from '../services/gemini';
import { Message, Role } from '../types';
import { GenerateContentResponse } from '@google/genai';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: Role.MODEL,
      text: 'Здравствуйте! Я ваш консультант по кибербезопасности. Расскажите мне о подозрительном звонке, сообщении или сайте, и я помогу разобраться, не мошенники ли это.',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<any>(null); // To store the Chat session instance
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat session once on mount
  useEffect(() => {
    chatRef.current = createChatSession();
  }, []);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chatRef.current.sendMessageStream({ message: userMsg.text });
      
      const botMsgId = (Date.now() + 1).toString();
      let fullText = '';
      
      // Add empty bot message first
      setMessages(prev => [...prev, {
        id: botMsgId,
        role: Role.MODEL,
        text: '',
        timestamp: Date.now()
      }]);

      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        const textChunk = c.text || '';
        fullText += textChunk;
        
        setMessages(prev => prev.map(msg => 
          msg.id === botMsgId ? { ...msg, text: fullText } : msg
        ));
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: Role.MODEL,
        text: 'Извините, произошла ошибка соединения. Попробуйте еще раз.',
        timestamp: Date.now(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px] md:h-[700px] bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === Role.USER ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                msg.role === Role.USER ? 'bg-blue-600' : 'bg-emerald-600'
              }`}
            >
              {msg.role === Role.USER ? <User className="text-white" size={20} /> : <Bot className="text-white" size={20} />}
            </div>
            
            <div
              className={`max-w-[85%] md:max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === Role.USER
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
              } ${msg.isError ? 'bg-red-50 border-red-200 text-red-800' : ''}`}
            >
              {msg.role === Role.MODEL ? (
                <div className="prose prose-sm max-w-none prose-slate">
                   <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{msg.text}</p>
              )}
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role === Role.USER && (
           <div className="flex items-center gap-3">
             <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
               <Bot className="text-white" size={20} />
             </div>
             <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
               <Loader2 className="animate-spin text-slate-400" size={20} />
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="relative flex items-center gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Опишите ситуацию или вставьте текст сообщения..."
            className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50 py-3 pl-4 pr-12 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 h-[60px] max-h-[120px]"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 justify-center">
          <AlertTriangle size={12} className="text-amber-500" />
          <span>Никогда не сообщайте коды из СМС и полные данные карт.</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;