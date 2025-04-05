# Casos de Teste - Edu4Med

Este documento apresenta os casos de testes funcionais e não funcionais da plataforma Edu4Med, com base nos requisitos especificados e utilizando a técnica de escrita de testes com critérios de aceitação claros.

---

## Casos de Teste Funcionais

### CT-01 - Cadastro de Usuário

| **Requisito Associado** | RF-001 - Permitir que o usuário se cadastre utilizando dados pessoais. |
|-------------------------|-------------------------------------------------------------------------|
| **Objetivo do Teste**   | Verificar se o usuário consegue se cadastrar com sucesso na plataforma. |
| **Passos para Execução**| 1. Acessar a tela de cadastro.<br>2. Preencher nome, e-mail e senha válidos.<br>3. Confirmar cadastro. |
| **Critério de Êxito**   | - Usuário é redirecionado para a área de login ou recebe confirmação de cadastro. |

---

### CT-02 - Cadastro de Usuário com Dados Inválidos

| **Requisito Associado** | RF-001 - Permitir que o usuário se cadastre utilizando dados pessoais. |
|-------------------------|-------------------------------------------------------------------------|
| **Objetivo do Teste**   | Verificar se o sistema impede o cadastro com campos inválidos. |
| **Passos para Execução**| 1. Deixar campos obrigatórios em branco ou preencher com dados inválidos.<br>2. Tentar realizar o cadastro. |
| **Critério de Êxito**   | - O sistema exibe mensagens de erro e não permite finalizar o cadastro. |

---

### CT-03 - Recuperação de Senha

| **Requisito Associado** | RF-002 - Permitir que o usuário recupere a senha. |
|-------------------------|--------------------------------------------------|
| **Objetivo do Teste**   | Verificar se o usuário consegue recuperar a senha via e-mail. |
| **Passos para Execução**| 1. Clicar em “Esqueceu a senha?”<br>2. Inserir e-mail cadastrado.<br>3. Acessar link enviado por e-mail e redefinir senha. |
| **Critério de Êxito**   | - Link enviado com sucesso e senha redefinida. |

---

### CT-04 - Cadastro de Regiões e Faculdades de Interesse

| **Requisito Associado** | RF-003 - Permitir que o usuário cadastre e edite suas regiões e faculdades de interesse. |
|-------------------------|------------------------------------------------------------------------------------------------|
| **Objetivo do Teste**   | Verificar se o usuário consegue cadastrar e editar suas regiões e faculdades de interesse. |
| **Passos para Execução**| 1. Acessar perfil ou configurações.<br>2. Selecionar estados, cidades e faculdades.<br>3. Salvar preferências. |
| **Critério de Êxito**   | - Preferências são salvas e refletidas na visualização de oportunidades. |

---

### CT-05 - Visualização da Tabela de Oportunidades

| **Requisito Associado** | RF-004 - Permitir que o usuário visualize uma tabela de Visualização das Oportunidades. |
|-------------------------|-------------------------------------------------------------------------------------------|
| **Objetivo do Teste**   | Verificar se o usuário pode visualizar a tabela de oportunidades. |
| **Passos para Execução**| 1. Fazer login na plataforma.<br>2. Acessar a seção de oportunidades. |
| **Critério de Êxito**   | - Tabela carregada com informações organizadas por estado, cidade, edital etc. |

---

### CT-06 - Filtros de Busca

| **Requisito Associado** | RF-005 - Permitir que o usuário filtre os editais por localização, período de inscrição e tipo de vestibular. |
|-------------------------|----------------------------------------------------------------------------------------------------------------|
| **Objetivo do Teste**   | Verificar se os filtros funcionam corretamente. |
| **Passos para Execução**| 1. Acessar tabela de oportunidades.<br>2. Aplicar filtros por estado, data e tipo de processo.<br>3. Verificar resultados. |
| **Critério de Êxito**   | - Resultados atualizados de acordo com os filtros aplicados. |

---

### CT-07 - Alerta de Editais Próximos do Prazo

| **Requisito Associado** | RF-006 - Exibir alertas (mensagens) quando a inscrição de um edital estiver próxima do prazo final. |
|-------------------------|----------------------------------------------------------------------------------------------------------------|
| **Objetivo do Teste**   | Verificar se o sistema exibe alertas para editais com prazos próximos do fim. |
| **Passos para Execução**| 1. Acessar a plataforma com editais próximos do vencimento.<br>2. Verificar notificações ou alertas visuais. |
| **Critério de Êxito**   | - Alerta visível indicando editais com poucos dias restantes para inscrição. |

---

### CT-08 - Cadastro Manual de Editais pelo Administrador

| **Requisito Associado** | RF-007 - Permitir que o administrador cadastre, edite e exclua editais manualmente. |
|-------------------------|---------------------------------------------------------------------------------------|
| **Objetivo do Teste**   | Verificar se o administrador pode adicionar editais manualmente. |
| **Passos para Execução**| 1. Fazer login como administrador.<br>2. Acessar seção de gestão de editais.<br>3. Inserir novo edital e salvar. |
| **Critério de Êxito**   | - Edital aparece na listagem pública. |

---

### CT-09 - Página de FAQ

| **Requisito Associado** | RF-008 - Exibir uma página com perguntas frequentes (FAQ) sobre o uso da plataforma. |
|-------------------------|------------------------------------------------------------------------------------------------|
| **Objetivo do Teste**   | Verificar se a FAQ está disponível e acessível para o usuário. |
| **Passos para Execução**| 1. Acessar a seção de FAQ no menu.<br>2. Verificar perguntas e respostas. |
| **Critério de Êxito**   | - Informações carregadas corretamente. |

---

### CT-10 - Seção de Contato

| **Requisito Associado** | RF-009 - Disponibilizar uma seção de contato para que usuários possam enviar dúvidas ou sugestões. |
|-------------------------|----------------------------------------------------------------------------------------------------------------|
| **Objetivo do Teste**   | Verificar se o usuário consegue enviar dúvidas e sugestões. |
| **Passos para Execução**| 1. Acessar seção “Contato”.<br>2. Preencher formulário e enviar. |
| **Critério de Êxito**   | - Mensagem enviada com sucesso e resposta automática de confirmação. |

---

### CT-11 - Dashboard de Audiência (Admin)

| **Requisito Associado** | RF-010 - Permitir que o administrador visualize uma dashboard de audiência dos usuários com clicks, tempo de uso da ferramenta e a quantidade total de usuários. |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Objetivo do Teste**   | Verificar se o administrador consegue visualizar as métricas da plataforma. |
| **Passos para Execução**| 1. Login como administrador.<br>2. Acessar dashboard.<br>3. Visualizar dados de navegação, cliques e tempo de uso. |
| **Critério de Êxito**   | - Métricas exibidas corretamente e com atualização conforme os acessos. |

---

## Casos de Teste Não Funcionais

### CT-RNF-01 - Responsividade em Dispositivos Móveis

| **Requisito Associado** | RNF-001 - O sistema deve ser responsivo para rodar em dispositivos móveis. |
|-------------------------|----------------------------------------------------------------------------|
| **Objetivo do Teste**   | Verificar se a plataforma se adapta corretamente em telas menores (celulares e tablets). |
| **Passos para Execução**| 1. Acessar a plataforma em um navegador de smartphone e em um tablet.<br>2. Testar diferentes funcionalidades (cadastro, login, busca de editais, filtros). |
| **Critério de Êxito**   | - Interface se ajusta sem perda de funcionalidade.<br>- Textos legíveis, botões clicáveis, menus adaptados. |

---

### CT-RNF-02 - Tempo de Resposta em Ações do Usuário

| **Requisito Associado** | RNF-002 - Performance: Deve processar requisições do usuário em no máximo 3s.<br>RNF-007 - Performance: A aplicação deve carregar todas as telas em no máximo 5 segundos. |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Objetivo do Teste**   | Verificar se as requisições do usuário (login, filtros, navegação) são processadas dentro do tempo esperado. |
| **Passos para Execução**| 1. Realizar login, aplicar filtros, navegar entre páginas da plataforma.<br>2. Medir o tempo de resposta com ferramentas como DevTools (aba Network). |
| **Critério de Êxito**   | - Nenhuma ação deve ultrapassar 5s de carregamento.<br>- Idealmente, ações devem ocorrer em até 3s. |

---

### CT-RNF-03 - Facilidade de Uso sem Manual

| **Requisito Associado** | RNF-003 - A aplicação deve ser utilizada sem a necessidade de curso ou manual. Nas atividades complexas, o máximo de erros aceitáveis por parte do usuário são 2 erros. |
|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Objetivo do Teste**   | Avaliar a usabilidade da plataforma por novos usuários. |
| **Passos para Execução**| 1. Convidar uma pessoa que nunca usou a Edu4Med.<br>2. Pedir para ela se cadastrar e localizar um edital.<br>3. Observar se comete erros.<br>4. Repetir com pelo menos 3 usuários distintos. |
| **Critério de Êxito**   | - Os usuários devem conseguir completar as tarefas com no máximo 2 erros.<br>- Plataforma deve ser autoexplicativa. |

---

### CT-RNF-04 - Validação de Segurança de Senha

| **Requisito Associado** | RNF-004 - A senha do usuário deve conter no mínimo 6 caracteres, sendo uma letra maiúscula, letra minúscula e um dígito. |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------|
| **Objetivo do Teste**   | Garantir que o sistema impede senhas fracas e valida o padrão exigido. |
| **Passos para Execução**| 1. Tentar cadastrar senhas fracas (apenas letras, apenas números, menos de 6 caracteres, sem maiúscula).<br>2. Cadastrar senha válida conforme requisito. |
| **Critério de Êxito**   | - Sistema rejeita senhas fora do padrão com mensagens claras.<br>- Aceita apenas senhas seguras. |

---

### CT-RNF-05 - Tolerância a Falhas

| **Requisito Associado** | RNF-005 - Confiabilidade: A aplicação deve ser confiável, com no máximo 2 erros ou falhas por parte do sistema. |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| **Objetivo do Teste**   | Garantir que a aplicação funcione com estabilidade. |
| **Passos para Execução**| 1. Realizar uma bateria de testes funcionais simultâneos (cadastro, login, filtros, visualizações).<br>2. Registrar qualquer falha, erro ou travamento. |
| **Critério de Êxito**   | - No máximo 2 falhas registradas em um conjunto de mais de 50 interações. |

---

### CT-RNF-06 - Suporte a Acessos Simultâneos

| **Requisito Associado** | RNF-006 - Performance: A aplicação deve ser rápida e com boa performance mesmo em situações com mais de 10 usuários conectados simultaneamente. |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Objetivo do Teste**   | Verificar se a plataforma mantém o desempenho com múltiplos acessos. |
| **Passos para Execução**| 1. Utilizar ferramentas como JMeter, BlazeMeter ou usuários reais para simular 10 conexões simultâneas.<br>2. Testar ações simultâneas como login, busca e filtros. |
| **Critério de Êxito**
