'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Language } from '@/lib/i18n';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  source?: 'openai' | 'fallback';
  timestamp: string;
}

interface ChatWidgetProps {
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
}

const QUICK_PROMPTS = {
  vi: [
    { label: '⚡ iLEAD 2026 là gì?', query: 'iLEAD 2026: THE MAGIC AWAKENS là gì?' },
    { label: '🏰 4 Nhà & 4 Ban chuyên môn?', query: '4 Nhà Hogwarts tương ứng với những ban nào?' },
    { label: '🚂 Cách đăng ký tham gia?', query: 'Cách đăng ký tham gia và nhận Vé Lên Tàu tại Nhà ga 9¾?' },
    { label: '👑 Ban Chủ Nhiệm iSupport là ai?', query: 'Ban Chủ Nhiệm (The Wizarding Council) iSupport gồm những ai?' },
    { label: '🎩 Trắc nghiệm Mũ Phân Loại?', query: 'Mũ Phân Loại (Sorting Hat Quiz) hoạt động như thế nào?' },
  ],
  en: [
    { label: '⚡ What is iLEAD 2026?', query: 'What is iLEAD 2026: THE MAGIC AWAKENS?' },
    { label: '🏰 4 Houses & Departments?', query: 'Which iSupport departments correspond to the 4 Hogwarts houses?' },
    { label: '🚂 How to register?', query: 'How do I register and get my Boarding Pass at Platform 9¾?' },
    { label: '👑 Who is The Wizarding Council?', query: 'Who are the members of the iSupport Executive Board?' },
    { label: '🎩 Sorting Hat Quiz?', query: 'How does the Sorting Hat Quiz work?' },
  ],
};

export default function ChatWidget({ currentLang = 'vi', onLanguageChange }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<Language>(currentLang);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);

  // Sync lang with parent prop when parent changes
  useEffect(() => {
    if (currentLang && currentLang !== lang) {
      setLang(currentLang);
    }
  }, [currentLang]);

  const initialGreeting: Message = {
    id: 'welcome-msg',
    role: 'assistant',
    content:
      lang === 'en'
        ? `🦉 **Hoo-hoo! Greetings from Hogwarts!**\n\nI am your **Hogwarts Owl Assistant** for **iSupport Club**.\nI am here to guide you through **iLEAD 2026: THE MAGIC AWAKENS**, our 4 magical houses, the Wizarding Council, and how to board Platform 9¾!\n\n✨ *What would you like to ask today?*`
        : `🦉 **Hoo-hoo! Kính chào phù thủy trẻ!**\n\nTôi là **Trợ Lý Cú Hogwarts** của **CLB iSupport - VNU-IS**.\nTôi mang sứ mệnh giải đáp mọi thông tin về **iLEAD 2026: THE MAGIC AWAKENS**, 4 Nhà Hogwarts (4 Ban chuyên môn), Hội đồng Phù thủy Lãnh đạo và cách nhận Vé Tàu Ga 9¾!\n\n✨ *Bạn muốn khám phá điều kỳ diệu nào hôm nay?*`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  const [messages, setMessages] = useState<Message[]>([initialGreeting]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update initial greeting when language changes if only welcome message exists
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id.startsWith('welcome-')) {
        return [
          {
            ...prev[0],
            content:
              lang === 'en'
                ? `🦉 **Hoo-hoo! Greetings from Hogwarts!**\n\nI am your **Hogwarts Owl Assistant** for **iSupport Club**.\nI am here to guide you through **iLEAD 2026: THE MAGIC AWAKENS**, our 4 magical houses, the Wizarding Council, and how to board Platform 9¾!\n\n✨ *What would you like to ask today?*`
                : `🦉 **Hoo-hoo! Kính chào phù thủy trẻ!**\n\nTôi là **Trợ Lý Cú Hogwarts** của **CLB iSupport - VNU-IS**.\nTôi mang sứ mệnh giải đáp mọi thông tin về **iLEAD 2026: THE MAGIC AWAKENS**, 4 Nhà Hogwarts (4 Ban chuyên môn), Hội đồng Phù thủy Lãnh đạo và cách nhận Vé Tàu Ga 9¾!\n\n✨ *Bạn muốn khám phá điều kỳ diệu nào hôm nay?*`,
          },
        ];
      }
      return prev;
    });
  }, [lang]);

  // Handle ESC key to close chat window
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock mobile body scroll when chat modal is open
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    if (window.innerWidth <= 640) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setHasUnreadNotification(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setHasUnreadNotification(false);
    }
  };

  const handleLanguageToggle = () => {
    const nextLang: Language = lang === 'vi' ? 'en' : 'vi';
    setLang(nextLang);
    if (onLanguageChange) {
      onLanguageChange(nextLang);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-cleared-${Date.now()}`,
        role: 'assistant',
        content:
          lang === 'en'
            ? `🦉 *Hoo-hoo!* Mail archives cleared. How can this owl assist you now?`
            : `🦉 *Hoo-hoo!* Thư viện bưu cú đã được làm mới. Cú có thể giúp gì cho bạn tiếp theo?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || inputValue).trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Prepare payload for API
      const apiMessages = newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          lang,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content:
          data.reply ||
          (lang === 'en'
            ? '🦉 *Hoo-hoo!* The owl lost connection momentarily. Please try again!'
            : '🦉 *Hoo-hoo!* Đã có chút nhiễu động ma thuật, xin bạn thử lại nhé!'),
        source: data.source,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('[ChatWidget Error]', err);
      const fallbackMessage: Message = {
        id: `fallback-${Date.now()}`,
        role: 'assistant',
        content:
          lang === 'en'
            ? `🦉 *Hoo-hoo!* Mail network is experiencing heavy magical interference. Please try asking again or check our Platform 9¾ section below!`
            : `🦉 *Hoo-hoo!* Mạng lưới bưu cú đang bị gián đoạn ma thuật. Bạn hãy thử lại hoặc kéo xuống Nhà ga 9¾ bên dưới nhé!`,
        source: 'fallback',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Helper to render formatted text with bold, italics, links, headers, lists, and line breaks
  const renderFormattedLine = (line: string, keyPrefix: string) => {
    // Regex matches: [text](url), **bold**, *italic*
    const pattern = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|\*.*?\*)/g;
    const parts: React.ReactNode[] = [];
    let lastIdx = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(line)) !== null) {
      if (match.index > lastIdx) {
        parts.push(line.substring(lastIdx, match.index));
      }
      const token = match[0];
      if (token.startsWith('[') && token.includes('](') && token.endsWith(')')) {
        const closeBracket = token.indexOf('](');
        const linkText = token.slice(1, closeBracket);
        const linkUrl = token.slice(closeBracket + 2, -1);
        parts.push(
          <a
            key={`${keyPrefix}-link-${match.index}`}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--hp-gold-glow, #f0c040)',
              textDecoration: 'underline',
              wordBreak: 'break-all',
            }}
          >
            {linkText}
          </a>
        );
      } else if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(
          <strong key={`${keyPrefix}-b-${match.index}`} style={{ color: 'var(--hp-gold-glow, #f0c040)' }}>
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith('*') && token.endsWith('*')) {
        parts.push(
          <em key={`${keyPrefix}-i-${match.index}`} style={{ color: 'var(--hp-text-muted, #d1c4e9)' }}>
            {token.slice(1, -1)}
          </em>
        );
      }
      lastIdx = pattern.lastIndex;
    }

    if (lastIdx < line.length) {
      parts.push(line.substring(lastIdx));
    }

    return parts.length > 0 ? parts : line;
  };

  const renderMessageContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((rawLine, lineIndex) => {
      let line = rawLine;
      let isH2 = false;
      let isH3 = false;
      let isBullet = false;

      if (line.trim().startsWith('### ')) {
        isH3 = true;
        line = line.replace(/^\s*###\s+/, '');
      } else if (line.trim().startsWith('## ')) {
        isH2 = true;
        line = line.replace(/^\s*##\s+/, '');
      } else if (line.trim().startsWith('•') || line.trim().startsWith('- ')) {
        isBullet = true;
      }

      if (line.trim() === '') {
        return <span key={`empty-${lineIndex}`} style={{ display: 'block', height: '6px' }} />;
      }

      const formattedContent = renderFormattedLine(line, `l-${lineIndex}`);

      return (
        <span
          key={`line-${lineIndex}`}
          style={{
            display: 'block',
            marginBottom: '3px',
            paddingLeft: isBullet ? '12px' : '0',
            fontWeight: isH2 || isH3 ? 600 : 'normal',
            fontSize: isH2 ? '0.96rem' : isH3 ? '0.90rem' : undefined,
            color: isH2 || isH3 ? 'var(--hp-gold-glow, #f0c040)' : undefined,
          }}
        >
          {formattedContent}
        </span>
      );
    });
  };

  const quickPrompts = QUICK_PROMPTS[lang] || QUICK_PROMPTS.vi;

  return (
    <>
      {/* FLOATING OWL BUTTON (BOTTOM-RIGHT) */}
      <div className={`hp-chat-fab-container ${isOpen ? 'hp-chat-open' : ''}`}>
        {!isOpen && (
          <div
            className="hp-chat-bubble-hint"
            role="button"
            tabIndex={0}
            onClick={handleToggleOpen}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggleOpen();
              }
            }}
            aria-label={lang === 'en' ? 'Ask Hogwarts Owl Assistant' : 'Hỏi Cú iSupport'}
          >
            <span className="hp-chat-hint-sparkle">✨</span>
            <span>{lang === 'en' ? 'Ask Hogwarts Owl' : 'Hỏi Cú iSupport'}</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleToggleOpen}
          aria-label={isOpen ? 'Close Chat Assistant' : 'Open Hogwarts Owl Assistant'}
          aria-expanded={isOpen}
          className={`hp-chat-fab ${isOpen ? 'hp-chat-fab-active' : ''}`}
        >
          {isOpen ? (
            <span className="hp-fab-close-icon">✕</span>
          ) : (
            <div className="hp-fab-owl-inner">
              <span className="hp-fab-owl-icon">🦉</span>
              {hasUnreadNotification && <span className="hp-fab-pulse-badge">AI</span>}
            </div>
          )}
        </button>
      </div>

      {/* CHAT WIDGET WINDOW */}
      {isOpen && (
        <div className="hp-chat-window-backdrop" onClick={(e) => {
          if (e.target === e.currentTarget && window.innerWidth <= 640) {
            setIsOpen(false);
          }
        }}>
          <div className="hp-chat-window" role="dialog" aria-label="Hogwarts Owl Assistant Window">
            {/* CHAT HEADER */}
            <div className="hp-chat-header">
              <div className="hp-chat-header-info">
                <div className="hp-chat-avatar-wrapper">
                  <span className="hp-chat-avatar">🦉</span>
                  <span className="hp-chat-status-dot" title="Magical network active" />
                </div>
                <div>
                  <h3 className="hp-chat-title">
                    {lang === 'en' ? 'Hogwarts Owl Assistant' : 'Trợ Lý Cú iSupport'}
                  </h3>
                  <p className="hp-chat-subtitle">
                    <span className="hp-chat-live-pulse" />
                    {lang === 'en' ? 'Online • iSupport Mail Network' : 'Trực tuyến • Bưu Cú iSupport'}
                  </p>
                </div>
              </div>

              {/* Header Action Controls */}
              <div className="hp-chat-header-actions">
                <button
                  type="button"
                  onClick={handleLanguageToggle}
                  className="hp-chat-btn-icon hp-chat-lang-btn"
                  title={lang === 'vi' ? 'Chuyển sang Tiếng Anh' : 'Switch to Vietnamese'}
                >
                  {lang === 'vi' ? 'EN' : 'VI'}
                </button>
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="hp-chat-btn-icon"
                  title={lang === 'en' ? 'Clear message history' : 'Xóa lịch sử chat'}
                >
                  🧹
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="hp-chat-btn-icon hp-chat-close-btn"
                  title={lang === 'en' ? 'Minimize chat' : 'Thu nhỏ chat'}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* CHAT MESSAGES CONTAINER */}
            <div className="hp-chat-messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`hp-chat-msg-row ${
                    msg.role === 'user' ? 'hp-chat-msg-user-row' : 'hp-chat-msg-bot-row'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="hp-chat-bot-avatar-tag">
                      <span>🦉</span>
                    </div>
                  )}

                  <div
                    className={`hp-chat-msg-bubble ${
                      msg.role === 'user' ? 'hp-chat-user-bubble' : 'hp-chat-bot-bubble'
                    }`}
                  >
                    <div className="hp-chat-msg-content">{renderMessageContent(msg.content)}</div>
                    <div className="hp-chat-msg-meta">
                      <span>{msg.timestamp}</span>
                      {msg.source === 'openai' && <span className="hp-chat-source-badge">⚡ GPT</span>}
                    </div>
                  </div>
                </div>
              ))}

              {/* TYPING INDICATOR */}
              {isLoading && (
                <div className="hp-chat-msg-row hp-chat-msg-bot-row">
                  <div className="hp-chat-bot-avatar-tag">
                    <span>🦉</span>
                  </div>
                  <div className="hp-chat-msg-bubble hp-chat-bot-bubble hp-chat-typing-bubble">
                    <span className="hp-typing-text">
                      {lang === 'en' ? 'The owl is writing...' : 'Cú đang tra cứu thư tịch...'}
                    </span>
                    <div className="hp-typing-dots">
                      <span className="dot dot-1"></span>
                      <span className="dot dot-2"></span>
                      <span className="dot dot-3"></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* QUICK PROMPT SUGGESTION CHIPS */}
            <div className="hp-chat-quick-prompts-bar">
              <span className="hp-quick-label">
                {lang === 'en' ? 'Suggested Sparks:' : 'Gợi ý câu hỏi nhanh:'}
              </span>
              <div className="hp-quick-chips-scroll">
                {quickPrompts.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleSendMessage(item.query)}
                    className="hp-quick-chip"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* INPUT AND SEND BAR */}
            <div className="hp-chat-input-bar">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  lang === 'en'
                    ? 'Ask the Owl about iSupport, iLEAD 2026...'
                    : 'Gửi câu hỏi cho Cú về iSupport & iLEAD 2026...'
                }
                disabled={isLoading}
                className="hp-chat-input"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputValue.trim()}
                className="hp-chat-send-btn"
                aria-label={lang === 'en' ? 'Send magical message' : 'Gửi tin nhắn'}
                title={lang === 'en' ? 'Send (Enter)' : 'Gửi (Enter)'}
              >
                <span>🪄</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
