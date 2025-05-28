import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000); // Redireciona após 4 segundos

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-5xl font-bold text-[#00B4D8] mb-4">Erro 404</h1>
      <p className="text-gray-700 text-lg text-center mb-6">
        Página não encontrada. Você será redirecionado para a página inicial.
      </p>
      <div className="animate-bounce text-2xl text-[#00B4D8]">⏳</div>
    </div>
  );
}
