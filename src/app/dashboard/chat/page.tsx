'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Loader2, Sparkles, Trash2, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your IELTS AI tutor. How can I help you today? You can ask me to check your essays, explain grammar, or practice speaking topics.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();

      if (data.error) {
        if (data.error.includes('configured')) {
          toast.error('AI is not configured. Please add GEMINI_API_KEY to .env');
        } else {
          toast.error(data.error);
        }
        return;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      toast.error('Failed to connect to AI server.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: 'Chat cleared. How can I help you now?' }]);
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black gradient-text">IELTS AI Tutor</h1>
          <p className="text-sm text-secondary">Powered by Gemini AI • Your personal language assistant</p>
        </div>
        <button 
          onClick={clearChat}
          className="p-3 rounded-2xl bg-secondary text-tertiary hover:text-red-500 transition-colors border border-default hover:border-red-500/20"
          title="Clear Chat"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 glass-card p-6 mb-6 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-4 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border border-default shadow-sm
                    ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-emerald-400'}`}>
                    {m.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                  </div>
                  <div className={`p-4 rounded-3xl text-sm leading-relaxed shadow-sm
                    ${m.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-white/5 text-secondary rounded-tl-none border border-white/10'}`}>
                    {m.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="flex gap-4 max-w-[80%]">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-slate-800 text-emerald-400 border border-default">
                  <Loader2 size={20} className="animate-spin" />
                </div>
                <div className="p-4 rounded-3xl rounded-tl-none bg-white/5 text-tertiary border border-white/10">
                  Thinking...
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="mt-6 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="w-full bg-secondary border border-default focus:border-indigo-500/30 rounded-2xl py-4 pl-6 pr-16 outline-none text-primary transition-all shadow-inner"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/20"
          >
            <Send size={18} />
          </button>
        </form>
      </div>

      {/* Suggested Topics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Sparkles, title: 'Check my Essay', desc: 'Paste your writing task here' },
          { icon: Sparkles, title: 'Speaking Topics', desc: 'Give me cue card ideas' },
          { icon: Sparkles, title: 'Grammar Fix', desc: 'Explain this sentence to me' },
        ].map((s, i) => (
          <button 
            key={i}
            onClick={() => setInput(s.title + ": ")}
            className="p-4 glass-card text-left hover:bg-white/5 transition-all group border border-white/5 hover:border-white/10"
          >
            <s.icon size={18} className="text-emerald-500 mb-2" />
            <div className="font-bold text-sm text-primary flex items-center justify-between">
              {s.title}
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </div>
            <p className="text-xs text-tertiary mt-1">{s.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
