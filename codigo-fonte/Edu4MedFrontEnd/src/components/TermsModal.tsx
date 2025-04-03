import React from 'react';
import { X } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Termos de Uso</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="prose max-w-none">
          <h3>1. Aceitação dos Termos</h3>
          <p>
            Ao acessar e usar a plataforma Edu4Med, você concorda com estes termos de uso
            e todas as leis e regulamentos aplicáveis. Se você não concordar com algum
            destes termos, está proibido de usar ou acessar este site.
          </p>

          <h3>2. Uso da Plataforma</h3>
          <p>
            A Edu4Med é uma plataforma destinada a estudantes de medicina e profissionais
            da área médica, fornecendo acesso a editais, oportunidades e informações
            relevantes para a comunidade médica.
          </p>

          <h3>3. Conta de Usuário</h3>
          <p>
            Para acessar certas funcionalidades da plataforma, é necessário criar uma
            conta. Você é responsável por manter a confidencialidade de sua conta e senha
            e por restringir o acesso ao seu computador.
          </p>

          <h3>4. Privacidade</h3>
          <p>
            Suas informações pessoais são protegidas de acordo com nossa Política de
            Privacidade. Ao usar a plataforma, você concorda com a coleta e uso de
            informações conforme descrito na Política de Privacidade.
          </p>

          <h3>5. Limitação de Responsabilidade</h3>
          <p>
            A Edu4Med não se responsabiliza por quaisquer danos diretos, indiretos,
            incidentais, consequenciais ou punitivos decorrentes do uso ou
            impossibilidade de uso da plataforma.
          </p>
        </div>
      </div>
    </div>
  );
}