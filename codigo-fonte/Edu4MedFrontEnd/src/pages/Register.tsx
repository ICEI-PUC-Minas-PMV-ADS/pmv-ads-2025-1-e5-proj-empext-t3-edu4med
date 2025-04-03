import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';
import TermsModal from '../components/TermsModal';

const registerSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número'),
  confirmPassword: z.string().min(6, 'Confirme sua senha'),
  role: z.enum(['admin', 'student'], {
    required_error: 'Selecione um tipo de usuário',
  }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'Você deve aceitar os termos de uso',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'student',
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      await registerUser(data.name, data.email, data.password, data.role);
      navigate('/editais');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Criar nova conta
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Ou{' '}
          <Link to="/login" className="text-[#00B4D8] hover:text-[#0077B6]">
            entrar na sua conta existente
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome completo
              </label>
              <input
                type="text"
                {...register('name')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B4D8] focus:ring-[#00B4D8]"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register('email')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B4D8] focus:ring-[#00B4D8]"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo de Usuário
              </label>
              <select
                {...register('role')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B4D8] focus:ring-[#00B4D8]"
              >
                <option value="student">Estudante</option>
                <option value="admin">Administrador</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                {...register('password')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B4D8] focus:ring-[#00B4D8]"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirmar senha
              </label>
              <input
                type="password"
                {...register('confirmPassword')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B4D8] focus:ring-[#00B4D8]"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('acceptTerms')}
                className="h-4 w-4 text-[#00B4D8] focus:ring-[#00B4D8] border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Concordo com os{' '}
                <button
                  type="button"
                  onClick={() => setIsTermsModalOpen(true)}
                  className="text-[#00B4D8] hover:text-[#0077B6]"
                >
                  Termos de Uso
                </button>
              </label>
              {errors.acceptTerms && (
                <p className="mt-1 text-sm text-red-600">{errors.acceptTerms.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00B4D8] hover:bg-[#0077B6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B4D8] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Criar conta'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </div>
  );
}