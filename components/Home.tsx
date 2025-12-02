import React from 'react';
import { MessageSquare, Image, ShieldCheck, ArrowRight } from 'lucide-react';
import { View } from '../types';

interface HomeProps {
  onNavigate: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 py-8">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Защитите себя от <span className="text-blue-600">кибермошенников</span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Используйте мощь искусственного интеллекта для проверки подозрительных звонков, сообщений и сайтов. 
          Быстро, анонимно и бесплатно.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={() => onNavigate(View.CHAT)}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all hover:-translate-y-1"
          >
            <MessageSquare size={20} />
            Задать вопрос консультанту
          </button>
          <button
            onClick={() => onNavigate(View.ANALYZER)}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-semibold shadow-sm transition-all hover:-translate-y-1"
          >
            <Image size={20} />
            Проверить скриншот
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 pt-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Мгновенный анализ</h3>
          <p className="text-slate-500">
            Опишите ситуацию в чате, и ИИ моментально оценит риски, указав на признаки мошенничества.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <Image size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Распознавание по фото</h3>
          <p className="text-slate-500">
            Пришли подозрительное SMS или письмо? Загрузи скриншот, и система найдет скрытые угрозы.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4">
            <MessageSquare size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Чёткие инструкции</h3>
          <p className="text-slate-500">
            Не просто предупреждаем, но и говорим, что делать: куда звонить, что блокировать и как вернуть деньги.
          </p>
        </div>
      </div>
      
      {/* Call to Action Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 text-white shadow-xl">
        <div className="space-y-3">
            <h3 className="text-2xl font-bold">Изучите схемы обмана</h3>
            <p className="text-slate-300 max-w-lg">Знание — лучшая защита. Посмотрите нашу базу знаний о популярных видах мошенничества.</p>
        </div>
        <button 
            onClick={() => onNavigate(View.KNOWLEDGE)}
            className="px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold flex items-center gap-2 hover:bg-slate-100 transition-colors whitespace-nowrap"
        >
            Открыть базу знаний <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
};

export default Home;