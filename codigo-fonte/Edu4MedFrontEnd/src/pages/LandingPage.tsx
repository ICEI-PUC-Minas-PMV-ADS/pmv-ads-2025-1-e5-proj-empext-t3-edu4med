import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Award, Clock, Users } from 'lucide-react';
import PartnersSection from '../components/PartnersSection';
import FAQSection from '../components/FAQSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#00B4D8] to-[#0077B6] text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Encontre as Melhores Oportunidades em Medicina
              </h1>
              <p className="text-xl mb-8">
                Plataforma automática que reúne editais e oportunidades para estudantes de medicina em um só lugar.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/register"
                  className="bg-white text-[#00B4D8] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Cadastre-se Gratuitamente
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#00B4D8] transition-colors"
                >
                  Login
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2940"
                alt="Medical Students"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Search className="w-8 h-8 text-[#00B4D8]" />}
            title="Busca Automática"
            description="Nossa plataforma coleta automaticamente editais de diversas fontes confiáveis."
          />
          <FeatureCard
            icon={<BookOpen className="w-8 h-8 text-[#00B4D8]" />}
            title="Oportunidades Relevantes"
            description="Editais filtrados especificamente para estudantes de medicina."
          />
          <FeatureCard
            icon={<Clock className="w-8 h-8 text-[#00B4D8]" />}
            title="Atualização em Tempo Real"
            description="Receba notificações de novos editais assim que são publicados."
          />
          <FeatureCard
            icon={<Users className="w-8 h-8 text-[#00B4D8]" />}
            title="Comunidade Médica"
            description="Conecte-se com outros estudantes e compartilhe experiências."
          />
        </div>
      </div>

      {/* Partners Section */}
      <PartnersSection />

      {/* Statistics Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <StatCard number="1000+" label="Editais Publicados" />
            <StatCard number="5000+" label="Usuários Ativos" />
            <StatCard number="100+" label="Instituições Parceiras" />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <div className="bg-[#00B4D8] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Comece Sua Jornada Médica Hoje
          </h2>
          <p className="text-xl mb-8">
            Não perca mais tempo procurando oportunidades em diversos sites.
            Centralize sua busca em um só lugar!
          </p>
          <Link
            to="/register"
            className="bg-white text-[#00B4D8] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Criar Conta Gratuita
          </Link>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold text-[#00B4D8] mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}