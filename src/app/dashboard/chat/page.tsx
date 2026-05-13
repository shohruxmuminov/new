'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Loader2, Sparkles, Trash2, ArrowRight, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
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
  const [isListening, setIsListening] = useState(false);
  const [isAutoVoice, setIsAutoVoice] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast.error('Voice recognition failed.');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.error('Voice recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      toast.error('Text-to-speech is not supported.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (e?: React.FormEvent, customInput?: string) => {
    e?.preventDefault();
    const messageContent = customInput || input;
    if (!messageContent.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: messageContent };
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
      if (isAutoVoice) speak(data.content);
    } catch (error) {
      toast.error('Failed to connect to AI server.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    window.speechSynthesis.cancel();
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
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsAutoVoice(!isAutoVoice)}
            className={`p-3 rounded-2xl transition-all border ${isAutoVoice ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-secondary border-default text-tertiary'}`}
            title={isAutoVoice ? "Auto-voice ON" : "Auto-voice OFF"}
          >
            {isAutoVoice ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <button 
            onClick={clearChat}
            className="p-3 rounded-2xl bg-secondary text-tertiary hover:text-red-500 transition-colors border border-default hover:border-red-500/20"
            title="Clear Chat"
          >
            <Trash2 size={20} />
          </button>
        </div>
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
                  <div className="space-y-2">
                    <div className={`p-4 rounded-3xl text-sm leading-relaxed shadow-sm relative group
                      ${m.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-white/5 text-secondary rounded-tl-none border border-white/10'}`}>
                      {m.content}
                      {m.role === 'assistant' && (
                        <button 
                          onClick={() => speak(m.content)}
                          className="absolute -right-10 top-0 p-2 text-tertiary hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Volume2 size={16} />
                        </button>
                      )}
                    </div>
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
        <form onSubmit={handleSend} className="mt-6 flex gap-3 relative">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? "Listening..." : "Type or speak your message..."}
              className={`w-full bg-secondary border border-default focus:border-indigo-500/30 rounded-2xl py-4 pl-6 pr-12 outline-none text-primary transition-all shadow-inner
                ${isListening ? 'border-emerald-500/50 bg-emerald-500/5' : ''}`}
            />
            <button
              type="button"
              onClick={toggleListening}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all
                ${isListening ? 'bg-emerald-500 text-white animate-pulse' : 'text-tertiary hover:text-primary'}`}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
          </div>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/20 shrink-0"
          >
            <Send size={22} />
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
            onClick={() => handleSend(undefined, s.title)}
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
