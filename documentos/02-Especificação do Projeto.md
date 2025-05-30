# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="01-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. 

## Usuários

| Tipo de Usuário   | Descrição | Responsabilidades |
|------------------|-----------|------------------|
| **Administrador** | Valida os editais encontrados automaticamente, publica as oportunidades para o público e acessa dashboard de audiência dos usuários. | Validar os editais encontrados automaticamente, publicar as oportunidades para o público, adicionar oportunidades manualmente e acessar dashboard de audiênica dos usuários (Clicks, Navegação, tempo de uso da ferramenta e etc.) |
| **Usuário** | Cadastra e edita as regiões e faculdades de interesse, além disso visualiza a tabela de oportunidades. | Cadastrar e editar regiões e faculdades de interesse, além de visualizar a tabela de oportunidades. | 


## Arquitetura e Tecnologias

| Nome  | Função |
|------------------|------------------|
| **WhatsApp, Teams** | Comunicação entre a equipe; comunicação entre a equipe e o Product Owner do projeto. | 
| **GitHub** | Repositório da documentação e do código fonte. | 
| **Visual Studio Code, Visual Studio** | Editor de código. | 
| **Figma** | Ferramenta de desenho de tela / Wireframes. | 
| **Lucidchart** | Ferramenta de criação de diagramas e modelos. | 
| **React, ASP.NET Core, Beautiful Soup** | Bibliotecas e frameworks utilizados. |
| **HTML, Css, JavaScript, TypeScript, Python** | Linguagens de programação utilizadas na criação do código fonte da aplicação. |  

## Project Model Canvas

![projectmodelcanvas_-_edu4med](https://github.com/user-attachments/assets/9ed81ab7-5444-429f-a0a0-560964257cf8)

> **Links Úteis**:
> Disponíveis em material de apoio do projeto

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

Para mais informações, consulte os microfundamentos Fundamentos de Engenharia de Software e Engenharia de Requisitos de Software. 

### Requisitos Funcionais

| Código  | Descrição | Prioridade |
|---------|-----------------------------------------------|-----------|
| RF-001  | Permitir que o usuário se cadastre utilizando dados pessoais. | ALTA |
| RF-002  | Permitir que o usuário recupere a senha. | MÉDIA |
| RF-003  | Permitir que o usuário cadastre e edite suas regiões e faculdades de interesse. | ALTA |
| RF-004  | Permitir que o usuário visualize uma tabela de Visualização das Oportunidades. | ALTA |
| RF-005  | Permitir que o usuário filtre os editais por localização, período de inscrição e tipo de vestibular. | ALTA |
| RF-006  | Exibir alertas (mensagens) quando a inscrição de um edital estiver próxima do prazo final. | BAIXA |
| RF-007  | Permitir que o administrador cadastre, edite e exclua editais manualmente. | ALTA |
| RF-008  | Exibir uma página com perguntas frequentes (FAQ) sobre o uso da plataforma. | MÉDIA |
| RF-009  | Disponibilizar uma seção de contato para que usuários possam enviar dúvidas ou sugestões. | MÉDIA |
| RF-010  | Permitir que o administrador visualize uma dashboard de audiência dos usuários com as seguintes informações: clicks, tempo de uso da ferramenta e a quantidade total de usuários. | ALTA |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| Usabilidade: O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Performance: Deve processar requisições do usuário em no máximo 3s |  BAIXA | 
|RNF-003| Usabilidade: A aplicação deve ser utilizada sem a necessidade de curso ou manual, nas atividades complexas o máximo de erros aceitáveis por parte do usuário são 2 erros. |  ALTA  | 
|RNF-004| Segurança: A senha do usuário deve conter no mínimo 6 caracteres, sendo uma letra maiúscula, letra minúscula e um dígito. |  ALTA  | 
|RNF-005| Confiabilidade: A aplicação deve ser confiável, com no máximo 2 erros ou falhas por parte do sistema. |  ALTA  | 
|RNF-006| Performance: A aplicação deve ser rápida e com boa performance mesmo em situações com mais de 10 usuários conectados simultaneamente. |  ALTA  | 
|RNF-007| Performance: A aplicação deve carregar todas as telas em no máximo 5 segundos. |  ALTA  | 
|RNF-008| Escalabilidade: A aplicação deve ser capaz de lidar com mais de 10 usuários novos a cada ano, sem comprometer seu desempenho ou segurança. |  ALTA  | 
|RNF-009| Manutenibilidade: A aplicação deve ser facilmente mantida e atualizada, com código organizado e documentação clara no GitHub. |  MÉDIA  |

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre. |
|02| Não pode ser desenvolvido um módulo de backend. |
|03| A equipe não pode subcontratar o desenvolvimento do trabalho. |
|04| A plataforma deve se restringir às tecnologias básicas utilizando ferramentas de desenvolvimento pré-estabelecidas. |

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Diagrama de Caso de Uso

![Edu4Med UML (1)](https://github.com/user-attachments/assets/f2da0ca5-822e-4501-812d-0f540f5d1d6b)

## Projeto da Base de Dados

O projeto da base de dados corresponde à representação das entidades e relacionamentos identificadas no Modelo ER, no formato de tabelas, com colunas e chaves primárias/estrangeiras necessárias para representar corretamente as restrições de integridade.

![ModeloDB](https://github.com/user-attachments/assets/27708828-2082-4f26-ad52-63f39830162a)





