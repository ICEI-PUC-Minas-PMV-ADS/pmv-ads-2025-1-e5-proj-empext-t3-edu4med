import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TermsModal from '../components/TermsModal';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Email inválido';

    if (password.length < 6) {
      newErrors.password = 'A senha deve ter no mínimo 6 caracteres';
    } else {
      if (!/[A-Z]/.test(password))
        newErrors.password = 'A senha deve conter pelo menos uma letra maiúscula';
      if (!/[a-z]/.test(password))
        newErrors.password = 'A senha deve conter pelo menos uma letra minúscula';
      if (!/[0-9]/.test(password))
        newErrors.password = 'A senha deve conter pelo menos um número';
    }

    if (confirmPassword !== password)
      newErrors.confirmPassword = 'As senhas não coincidem';

    if (!acceptTerms)
      newErrors.acceptTerms = 'Você deve aceitar os termos de uso';

    return newErrors;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsLoading(true);
    setApiError(null);

    const userData = {
      nome,
      email,
      password,
      role: 'Admin',
    };

    try {
      const response = await fetch('https://webapiedu4med-b4h3hafmfcekhce9.brazilsouth-01.azurewebsites.net/api/usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
        navigate('/login');
      } else {
        const errorData = await response.json();
        setApiError(`Erro ao cadastrar usuário: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
      setApiError('Erro ao cadastrar usuário. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">Criar nova conta</h2>
        <p className="mt-2 text-center text-gray-600">
          Ou{' '}
          <Link to="/login" className="text-[#00B4D8] hover:text-[#0077B6]">
            entrar na sua conta existente
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B4D8] focus:ring-[#00B4D8]"
                placeholder="Insira seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              {errors.nome && <p className="text-sm text-red-600">{errors.nome}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B4D8] focus:ring-[#00B4D8]"
                placeholder="Insira seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
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
              {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirmar senha</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B4D8] focus:ring-[#00B4D8]"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-[#00B4D8] focus:ring-[#00B4D8] border-gray-300 rounded"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <label className="ml-2 text-sm text-gray-900">
                Concordo com os{' '}
                <button
                  type="button"
                  onClick={() => setIsTermsModalOpen(true)}
                  className="text-[#00B4D8] hover:text-[#0077B6]"
                >
                  Termos de Uso
                </button>
              </label>
            </div>
            {errors.acceptTerms && <p className="text-sm text-red-600">{errors.acceptTerms}</p>}

            {apiError && <p className="text-sm text-red-600">{apiError}</p>}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 rounded-md text-white bg-[#00B4D8] hover:bg-[#0077B6] focus:ring-2 focus:ring-offset-2 focus:ring-[#00B4D8] disabled:opacity-50"
              >
                {isLoading ? 'Cadastrando...' : 'Criar conta'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
    </div>
  );
};

export default RegisterForm;
