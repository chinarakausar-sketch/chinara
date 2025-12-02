import React from 'react';
import { FRAUD_CATEGORIES } from '../constants';
import * as Icons from 'lucide-react';

const KnowledgeBase: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">База знаний о мошенничестве</h2>
        <p className="text-slate-600">
          Изучите основные схемы обмана, чтобы быть готовым и защитить себя и близких.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FRAUD_CATEGORIES.map((category) => {
          // Dynamically resolve icon component
          const IconComponent = (Icons as any)[category.iconName] || Icons.HelpCircle;

          return (
            <div key={category.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                  <IconComponent size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{category.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 font-medium">{category.description}</p>
                  <p className="text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-3">
                    {category.details}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 mt-12">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="p-4 bg-amber-100 rounded-full text-amber-600 shrink-0">
            <Icons.PhoneCall size={40} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Куда обращаться, если вас обманули?</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Немедленно позвоните в свой банк и заблокируйте карты/счета.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Подайте заявление в ближайшее отделение полиции.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Сообщите о номере мошенника своему мобильному оператору.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;