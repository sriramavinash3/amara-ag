import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, X, Send, ArrowRight, Activity, Calendar, HelpCircle, Phone } from 'lucide-react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';
import { conditions, treatments } from '../../../utils/medicalData';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Initial welcome message when chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          sender: 'bot',
          text: "Hello! I am your Amara Clinical Assistant. How can I help you find pain relief today?",
          options: [
            { label: '🔍 Symptom Checker', value: 'symptoms' },
            { label: '💳 Insurance & Fees', value: 'billing' },
            { label: '🕒 Hours & Location', value: 'hours' },
            { label: '📅 Book Appointment', value: 'book' }
          ]
        }
      ]);
    }
  }, [isOpen, messages]);

  const addMessage = (sender, text, options = null, links = null) => {
    setMessages(prev => [...prev, { sender, text, options, links }]);
  };

  const handleOptionClick = (value, label) => {
    // Add user message
    addMessage('user', label);

    // Trigger bot response based on value
    setTimeout(() => {
      processResponse(value);
    }, 800);
  };

  const processResponse = (value) => {
    // 1. Symptoms Hub
    if (value === 'symptoms') {
      addMessage('bot', "Where are you currently experiencing pain? Select an area below to explore non-surgical treatment options:", [
        { label: 'Back & Leg Pain', value: 'cond_back-pain' },
        { label: 'Neck & Arm Pain', value: 'cond_neck-pain' },
        { label: 'Sciatica Nerve Pain', value: 'cond_sciatica' },
        { label: 'Knee & Joint Pain', value: 'cond_knee-pain' },
        { label: 'Nerve Burning/Tingling', value: 'cond_neuropathic-pain' },
        { label: 'Back to Main Menu', value: 'main_menu' }
      ]);
    }
    // 2. Billing / Flat Fee
    else if (value === 'billing') {
      addMessage('bot', "At Amara Pain & Spine, we believe in complete financial transparency. We charge one flat, affordable office fee and absolutely zero hospital facility fees, saving you up to 60% out-of-pocket.\n\nWe accept Medicare, Medicaid, Blue Cross Blue Shield (BCBS), United Healthcare, Cigna, Aetna, and Workers' Comp.", [
        { label: 'How does it save money?', value: 'facility_fees_expl' },
        { label: 'Book Consultation', value: 'book' },
        { label: 'Back to Main Menu', value: 'main_menu' }
      ]);
    }
    // 3. Facility fees explanation
    else if (value === 'facility_fees_expl') {
      addMessage('bot', "Hospital-owned clinics bill patients an extra 'facility fee' simply for using the procedure room, separate from the doctor's fee. Since we are an independent private clinic, we eliminate this markup entirely.", [
        { label: 'Book Appointment', value: 'book' },
        { label: 'Main Menu', value: 'main_menu' }
      ]);
    }
    // 4. Hours & Location
    else if (value === 'hours') {
      addMessage('bot', "Our clinic is located at:\n📍 6429 Bannington Road, Suite B, Charlotte, NC 28226\n\nOffice Hours:\n🕒 Monday - Friday: 8:00 AM - 5:00 PM\nSame-week appointments are often available.", [
        { label: 'Get Directions', value: 'directions' },
        { label: 'Back to Main Menu', value: 'main_menu' }
      ]);
    }
    // 5. Directions Link route
    else if (value === 'directions') {
      addMessage('bot', "I can direct you to our Directions page, which details bus routes (CATS Route 51) and driving instructions from I-485 exit 64-A.");
      navigate('/contact');
    }
    // 6. Book Appointment route
    else if (value === 'book') {
      addMessage('bot', "Great! I am opening our Smart Appointment Booking Wizard now. You can choose your condition, preferred treatment, and schedule a slot.");
      setTimeout(() => {
        setIsOpen(false);
        navigate('/book');
      }, 1000);
    }
    // 7. Main Menu reset
    else if (value === 'main_menu') {
      addMessage('bot', "How can I help you find pain relief today?", [
        { label: '🔍 Symptom Checker', value: 'symptoms' },
        { label: '💳 Insurance & Fees', value: 'billing' },
        { label: '🕒 Hours & Location', value: 'hours' },
        { label: '📅 Book Appointment', value: 'book' }
      ]);
    }
    // 8. Specific Condition Handlers (clinical decision-tree)
    else if (value.startsWith('cond_')) {
      const condId = value.replace('cond_', '');
      const condData = conditions[condId];
      if (condData) {
        addMessage(
          'bot',
          `**${condData.title}**\n\n${condData.shortDesc}\n\nCommon causes include: ${condData.causes.slice(0, 3).join(', ')}.\n\nWe offer advanced interventional blocks and epidural injections to treat this.`,
          [
            { label: '📅 Request Consultation', value: 'book' },
            { label: '🔍 Different Pain Area', value: 'symptoms' },
            { label: 'Main Menu', value: 'main_menu' }
          ],
          [
            { label: `View Full ${condData.title} Guide`, path: `/conditions/${condId}` }
          ]
        );
      }
    }
    // 9. Default Chat Text response
    else {
      addMessage('bot', "I understand. To get personalized diagnostic advice, we highly recommend scheduling a physical consultation with our board-certified specialist.", [
        { label: '📅 Book Online', value: 'book' },
        { label: 'Back to Main Menu', value: 'main_menu' }
      ]);
    }
  };

  const handleTextInputSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText.trim().toLowerCase();
    addMessage('user', inputText);
    setInputText('');

    setTimeout(() => {
      // Natural language mapping keywords
      if (query.includes('back') || query.includes('spine') || query.includes('disc') || query.includes('lumbar')) {
        processResponse('cond_back-pain');
      } else if (query.includes('neck') || query.includes('arm') || query.includes('cervical')) {
        processResponse('cond_neck-pain');
      } else if (query.includes('sciatic') || query.includes('leg pain') || query.includes('buttock')) {
        processResponse('cond_sciatica');
      } else if (query.includes('joint') || query.includes('arthritis') || query.includes('shoulder') || query.includes('hip')) {
        processResponse('cond_joint-pain');
      } else if (query.includes('knee')) {
        processResponse('cond_knee-pain');
      } else if (query.includes('neuropathy') || query.includes('numb') || query.includes('tingl') || query.includes('burn')) {
        processResponse('cond_neuropathic-pain');
      } else if (query.includes('insurance') || query.includes('cost') || query.includes('fee') || query.includes('billing') || query.includes('pay')) {
        processResponse('billing');
      } else if (query.includes('hour') || query.includes('location') || query.includes('address') || query.includes('open') || query.includes('where')) {
        processResponse('hours');
      } else if (query.includes('book') || query.includes('appointment') || query.includes('schedule') || query.includes('consult')) {
        processResponse('book');
      } else {
        processResponse('default_text');
      }
    }, 800);
  };

  return (
    <>
      {/* 1. FLOATING CHAT BUBBLE BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 lg:bottom-6 right-6 z-50 p-4 bg-medical-600 hover:bg-medical-700 text-white rounded-full shadow-[0_10px_30px_rgba(2,132,199,0.3)] hover:shadow-[0_15px_40px_rgba(2,132,199,0.4)] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer flex items-center justify-center border border-white/10"
        aria-label="Open AI Clinic Assistant"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6 animate-pulse" />}
      </button>

      {/* 2. CHAT CONTAINER WINDOW */}
      {isOpen && (
        <Card
          variant="white"
          padding="none"
          className="fixed bottom-36 lg:bottom-24 right-6 w-[340px] sm:w-[360px] md:w-[400px] max-w-[calc(100vw-2rem)] h-[440px] lg:h-[520px] z-50 border-slate-100 shadow-2xl flex flex-col justify-between overflow-hidden animate-slide-up bg-white/95 backdrop-blur-md"
        >
          {/* Header */}
          <div className="bg-primary-900 text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-medical-600 rounded-xl flex items-center justify-center">
                <Activity className="h-4.5 w-4.5 text-white animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-sm font-heading">Clinic Assistant</h4>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" /> Online Support
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                  }`}
              >
                {/* Text Bubble */}
                <div
                  className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${msg.sender === 'user'
                      ? 'bg-medical-600 text-white rounded-br-none font-medium shadow-sm'
                      : 'bg-slate-100 text-primary-900 rounded-bl-none border border-slate-200/50 shadow-[0_4px_10px_rgba(15,23,42,0.02)]'
                    }`}
                >
                  {msg.text}
                </div>

                {/* Inline Links */}
                {msg.links && (
                  <div className="mt-2 space-y-1 w-full text-left">
                    {msg.links.map((link, lIdx) => (
                      <Link
                        key={lIdx}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center text-xs font-bold text-medical-600 hover:underline gap-1 mt-1"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    ))}
                  </div>
                )}

                {/* Option Buttons */}
                {msg.options && (
                  <div className="mt-3 flex flex-wrap gap-2 w-full">
                    {msg.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleOptionClick(opt.value, opt.label)}
                        className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-medical-600 border border-slate-200 rounded-full font-semibold transition-all duration-150 cursor-pointer shadow-sm text-left text-[11px]"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Text Input Form */}
          <form
            onSubmit={handleTextInputSubmit}
            className="p-3 border-t border-slate-100 bg-slate-50 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about symptoms, fees, hours..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-full text-xs focus:outline-none focus:border-medical-600 focus:ring-1 focus:ring-medical-600 shadow-sm"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-medical-600 hover:bg-medical-700 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </Card>
      )}
    </>
  );
}
