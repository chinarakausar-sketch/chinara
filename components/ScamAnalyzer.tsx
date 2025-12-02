import React, { useState } from 'react';
import { Upload, AlertCircle, CheckCircle, FileText, X, Loader2 } from 'lucide-react';
import { analyzeImageRisk } from '../services/gemini';
import ReactMarkdown from 'react-markdown';

const ScamAnalyzer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        setError("Файл слишком большой. Максимальный размер 4MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await analyzeImageRisk(image);
      setAnalysis(result);
    } catch (err) {
      setError("Не удалось проанализировать изображение. Попробуйте другое фото или опишите ситуацию в чате.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <FileText className="text-blue-600" />
          Анализ скриншота
        </h2>
        <p className="text-slate-600 mb-6">
          Загрузите скриншот подозрительного SMS, письма электронной почты или переписки. 
          ИИ проанализирует текст и визуальные элементы на наличие признаков мошенничества.
        </p>

        {!image ? (
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 text-center hover:bg-slate-50 transition-colors relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center gap-3 pointer-events-none">
              <div className="p-4 bg-blue-50 rounded-full">
                <Upload className="text-blue-600" size={32} />
              </div>
              <p className="font-medium text-slate-700">Нажмите чтобы загрузить скриншот</p>
              <p className="text-sm text-slate-500">JPG, PNG (макс. 4MB)</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 max-h-[400px] flex justify-center">
              <img src={image} alt="Upload preview" className="object-contain max-h-full" />
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 p-2 bg-slate-900/50 hover:bg-slate-900/70 text-white rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {!analysis && (
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Анализируем...
                  </>
                ) : (
                  <>
                    <AlertCircle size={20} />
                    Проверить на мошенничество
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-start gap-3">
            <AlertCircle className="flex-shrink-0 mt-0.5" size={20} />
            <p>{error}</p>
          </div>
        )}

        {analysis && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                <h3 className="text-lg font-bold text-emerald-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="text-emerald-600" />
                  Результат анализа
                </h3>
                <div className="prose prose-sm prose-slate max-w-none text-slate-800">
                  <ReactMarkdown>{analysis}</ReactMarkdown>
                </div>
             </div>
             <div className="mt-4 text-center">
                <button onClick={clearImage} className="text-blue-600 hover:underline text-sm font-medium">
                  Загрузить другое изображение
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScamAnalyzer;