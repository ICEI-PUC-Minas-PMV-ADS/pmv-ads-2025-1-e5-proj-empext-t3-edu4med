import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handlePopupOpen = () => {
    setShowPopup(true);
  };
  const handlePopupClose = () => {
    setShowPopup(false);
    setConfirmationMessage('');
  };

  const handleSendEmail = () => {
    setConfirmationMessage(`Uma nova senha foi enviada para o seu e-mail: ${emailInput}`);
  };

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('https://webapiedu4med-b4h3hafmfcekhce9.brazilsouth-01.azurewebsites.net/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        const { token, user } = data; // Supondo que a API retorne o token e os dados do usuário
        localStorage.setItem('authToken', token);

        // Agora salvamos o token e as informações do usuário no contexto
        login(user, token); // Salva no AuthContext

        // Navega para a próxima página
        navigate('/editais');
    } else {
        setError('Credenciais inválidas. Por favor, tente novamente.');
    }
} catch (error) {
    setError('Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.');
}
};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h3 className="text-center text-3xl font-bold text-gray-900">LOGIN</h3>
        <p className="mt-2 text-center text-gray-600">
          Ou{' '}
          <Link to="/register" className="text-[#00B4D8] hover:text-[#0077B6]">
            criar uma conta gratuita
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B4D8] focus:ring-[#00B4D8]"
                placeholder="Insira seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B4D8] focus:ring-[#00B4D8]"
                placeholder="Insira sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <p className="text-sm text-right text-[#00B4D8] hover:text-[#0077B6] cursor-pointer" onClick={handlePopupOpen}>
              Esqueceu a senha?
            </p>
            <div className="space-y-4">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00B4D8] hover:bg-[#0077B6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B4D8]"
                onClick={handleLoginSubmit}
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Popup de redefinição de senha */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-xl font-semibold mb-4 text-center">Redefinir Senha</h3>
            <input
              type="email"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B4D8] focus:ring-[#00B4D8] mb-3"
              placeholder="Insira seu e-mail"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <button
              onClick={handleSendEmail}
              className="w-full mb-2 py-2 px-4 bg-[#00B4D8] hover:bg-[#0077B6] text-white text-sm font-medium rounded-md"
            >
              Enviar
            </button>
            {confirmationMessage && (
              <p className="text-sm text-green-600 mb-2 text-center">{confirmationMessage}</p>
            )}
            <button
              onClick={handlePopupClose}
              className="w-full py-2 px-4 border border-gray-300 text-gray-700 hover:text-black text-sm rounded-md"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
