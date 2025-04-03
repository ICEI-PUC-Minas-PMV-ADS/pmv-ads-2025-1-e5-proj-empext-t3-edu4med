import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Como encontrar editais na plataforma?",
    answer: "Você pode encontrar editais usando a barra de pesquisa no topo da página, filtrar por localização ou instituição, ou navegar pelas seções 'Para você' e 'Todos Editais'."
  },
  {
    question: "Como favoritar um edital?",
    answer: "Para favoritar um edital, basta clicar no ícone de coração em qualquer edital. Os editais favoritados podem ser encontrados na seção 'Meus Editais'."
  },
  {
    question: "Para quem é a plataforma?",
    answer: "A Edu4Med é uma plataforma dedicada a estudantes de medicina e profissionais da área médica que buscam oportunidades de desenvolvimento profissional, como congressos, simpósios e programas de residência."
  },
  {
    question: "Como funciona o sistema de notificações?",
    answer: "Você receberá notificações sobre novos editais que correspondam ao seu perfil, lembretes de prazos próximos ao fim e atualizações de editais que você favoritou."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#00B4D8]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#00B4D8]" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}