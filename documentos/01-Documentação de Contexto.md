# Introdução

A Extensão Universitária desempenha um papel essencial na formação acadêmica, proporcionando aos alunos a oportunidade de aplicar, na prática, os conhecimentos adquiridos em sala de aula. Na PUC Minas, essa iniciativa fortalece a conexão entre a universidade e a sociedade, permitindo que os estudantes se envolvam ativamente na solução de desafios reais do mercado de trabalho. Dessa forma, a Extensão Universitária não apenas complementa a formação teórica, mas também contribui para o desenvolvimento de profissionais mais preparados para enfrentar as demandas da sociedade brasileira.

Nesse contexto, a Edu4Med surge como uma aplicação concreta dos princípios da Extensão Universitária, ao utilizar a tecnologia para facilitar o acesso a oportunidades na área médica. A proposta da plataforma é criar um sistema eficiente e intuitivo, no qual os usuários possam realizar login e acessar, de maneira simplificada, informações sobre vagas, concursos e editais. Esses dados serão organizados por cidade e estado, permitindo uma busca otimizada e personalizada conforme a necessidade de cada estudante ou profissional.

Além de simplificar a busca por oportunidades, a plataforma amplia o impacto da formação acadêmica ao conectar o ensino teórico às exigências práticas do mercado de trabalho. O projeto prevê o desenvolvimento de um sistema automatizado baseado em Web Scraping, capaz de identificar, extrair e organizar informações sobre editais, concursos e estágios para estudantes e profissionais da Medicina. Essa solução visa preencher uma lacuna existente no mercado, onde a busca por essas oportunidades frequentemente exige um esforço manual considerável por parte dos interessados.

A Edu4Med permitirá que os usuários filtrem os editais por estado, universidade e tipo de processo seletivo, incluindo Enem, vestibulares próprios, Prouni e FIES. Além disso, oferecerá notificações personalizadas, garantindo que os candidatos fiquem sempre atualizados sobre novas oportunidades na área médica. O cliente Edu4Med se alinha diretamente ao propósito da Extensão Universitária ao oferecer uma solução inovadora que conecta o conhecimento acadêmico à resolução de problemas sociais. 

O envolvimento de estudantes no desenvolvimento e na implementação do sistema cria um ambiente de aprendizado prático, onde habilidades como pesquisa, análise de dados e aplicação de tecnologias avançadas são aprimoradas. Além disso, ao disponibilizar informações organizadas e acessíveis em uma plataforma intuitiva, a Edu4Med contribui para a democratização do acesso a oportunidades na concorrida área da Medicina.

Portanto, a relação entre a Extensão Universitária e a Edu4Med evidencia como a tecnologia pode ser um meio estratégico para fortalecer a interação entre academia e sociedade. Ao permitir que os alunos desenvolvam soluções inovadoras e adquiram experiência prática, a Extensão Universitária reafirma seu papel essencial na formação de profissionais qualificados e preparados para transformar desafios em oportunidades concretas. 

Dessa forma, a Edu4Med não apenas otimiza a busca por oportunidades na área médica, mas também contribui para a capacitação e inserção profissional de estudantes e profissionais da saúde em todo o Brasil.

# Problema

O Brasil enfrenta um grave desafio na formação de médicos, caracterizado pela escassez de vagas para Residência Médica. Um estudo da Faculdade de Medicina da Universidade de São Paulo [^1] (FMUSP) destaca que, embora o número de cursos de Medicina tenha aumentado significativamente — resultando em um crescimento de 71% no número de graduados — as vagas para Residência Médica cresceram apenas 26%. Isso evidencia um descompasso alarmante entre a formação de novos médicos e a capacitação necessária para a atuação profissional, criando um gargalo que compromete a qualidade da assistência à saúde no país (FMUSP, 2024).

Dessa forma, diante da dificuldade enfrentada por estudantes de Medicina na busca por oportunidades acadêmicas e profissionais e considerando a enorme escassez de vagas para Residência Médica, a Edu4Med surge como uma solução inovadora para preencher essa lacuna. A plataforma pretende auxiliar os candidatos ao vestibular de Medicina, oferecendo um planejamento estruturado para poderem se preparar com mais foco e eficiência, garantindo uma formação acadêmica de maior qualidade.

Durante o curso de Medicina, os estudantes precisam, obrigatoriamente, participar de atividades de extensão, ligas acadêmicas, iniciação científica, entre outras experiências fundamentais para sua formação. Essas atividades são reconhecidas e validadas ao final do curso, especialmente no momento da preparação para a prova de residência médica, um passo crucial para sua carreira.
Assim, o principal propósito da Edu4Med é facilitar o acesso a essas oportunidades, permitindo que os estudantes encontrem e participem de editais de vestibulares de Medicina de maneira prática e organizada. 

A plataforma oferece um sistema eficiente para localizar e filtrar essas oportunidades, ajudando os alunos a se planejarem melhor e a tomarem decisões mais estratégicas para sua trajetória acadêmica.
Além disso, a missão da Edu4Med é desenvolver soluções tecnológicas que simplifiquem a educação médica e otimizem a busca por informações relevantes, democratizando o acesso a vagas e oportunidades. 

Isso é especialmente importante para estudantes que não têm acesso fácil a esses editais, principalmente em regiões onde a divulgação dessas informações é limitada. Dessa forma, a plataforma contribui tanto para a qualificação dos futuros médicos quanto para um preenchimento mais eficiente das vagas disponíveis no mercado.

[^1]: https://www.fm.usp.br/fmusp/noticias/estudo-da-fmusp-revela-agravamento-na-falta-de-vagas-para-residencia-medica-no-brasil

# Objetivos

O objetivo deste projeto é desenvolver uma plataforma automatizada que organize e disponibilize, de forma acessível, editais de vestibulares de Medicina, facilitando a busca por oportunidades para os estudantes da área. 
Com essa iniciativa, buscamos democratizar o acesso às vagas, beneficiando candidatos que, muitas vezes, não encontram as informações necessárias para ingressar na graduação. Além disso, a plataforma contribuirá para o preenchimento de vagas em estados e cidades brasileiras que enfrentam escassez de profissionais qualificados.

Para garantir a viabilidade do projeto, partimos de algumas premissas fundamentais. Os sites das universidades continuarão disponibilizando editais de forma pública, o que permitirá a coleta de dados de maneira transparente. A tecnologia de Web Scraping será utilizada para acessar e extrair essas informações de forma eficiente, garantindo que a plataforma esteja sempre atualizada. Além disso, acreditamos que os candidatos terão interesse em uma solução digital que facilite a busca por vestibulares de Medicina, otimizando o tempo e aumentando as chances de encontrar as melhores oportunidades dentro da plataforma da Edu4Med.

Nosso principal objetivo é desenvolver uma plataforma centralizada que reúna todos os editais de vestibulares de Medicina no Brasil. Essa solução tecnológica será essencial para reduzir a dificuldade de acesso às informações, tornando a concorrência mais justa e acessível para todos os estudantes. Para isso, utilizaremos tecnologia de Web Scraping, permitindo que os editais sejam atualizados automaticamente, garantindo precisão e confiabilidade nas informações disponibilizadas. 
Dessa maneira, a plataforma da Edu4Med não apenas simplificará a jornada dos candidatos, mas também contribuirá para uma melhor distribuição de profissionais da saúde pelo país.

# Justificativa

Atualmente, mais de 210 mil médicos generalistas no Brasil não concluíram a residência nem obtiveram títulos de especialidade reconhecidos, o que representa um potencial desperdiçado na formação de profissionais qualificados que poderiam contribuir para o sistema de saúde. Essa situação se torna ainda mais preocupante quando consideramos que diversas regiões do país, especialmente aquelas mais carentes, enfrentam uma grave escassez de médicos. Segundo reportagem do [^2] G1, a falta de médicos em áreas remotas é uma realidade que afeta diretamente a qualidade da saúde prestada à população, exacerbando as desigualdades existentes (G1, 2023).

Além disso o ingresso no curso de Medicina no Brasil é extremamente concorrido, e muitos candidatos acabam perdendo prazos de inscrição devido à falta de acesso a informações organizadas sobre os editais. Segundo o portal Melhores Escolas Médicas[^3], o vestibular da Universidade de São Paulo (USP), aplicado pela Fuvest (Fundação Universitária para o Vestibular), é considerado um dos processos seletivos mais concorridos do país. Dentre todos os cursos da instituição, Medicina é o que apresenta a maior disputa por vaga. Embora o curso de Medicina seja oferecido apenas nas cidades de São Paulo, Ribeirão Preto e Bauru, as provas da Fuvest são aplicadas em diversas localidades do estado. No vestibular de 2023, o curso ofertado no campus São Paulo registrou uma relação candidato/vaga de 117,7, evidenciando sua alta concorrência (MELHORES ESCOLAS MÉDICAS, 2023).

Analisando esse cenário, a busca por vestibulares exige um esforço manual significativo, pois os estudantes precisam acessar diversos sites para encontrar editais atualizados. No entanto, não existe um sistema centralizado e automatizado que disponibilize essas informações de maneira acessível e estruturada, o que dificulta ainda mais o processo de inscrição e planejamento dos candidatos.

Diante desse cenário, o objetivo deste projeto é criar uma plataforma automatizada que organize e liste oportunidades de Residência Médica, disponibilizando editais relevantes de forma acessível para estudantes de Medicina. Acreditamos que, ao democratizar o acesso a essas informações, podemos beneficiar aqueles que, por diferentes motivos, não têm acesso fácil às oportunidades disponíveis. A plataforma não apenas facilitará a busca por vagas, mas também contribuirá para preencher as lacunas existentes na área da saúde em estados e cidades que carecem de profissionais qualificados.

Além disso, a utilização de tecnologia é fundamental para promover o acesso a novas vagas de emprego e editais de concursos. Conforme uma matéria da [^4] Forbes, a tomada de decisão e planejamento estratégico aprimorados aos sistemas tecnológicos podem analisar vastos conjuntos de dados, reconhecer padrões e prever resultados, oferecendo assim insights que podem ser imprescindíveis ​​para a estratégia empresarial e na busca por empregos, desde a previsão de tendências de mercado até a otimização das cadeias de abastecimento de ofertas (FORBES, 2024).

Ao centralizar essas informações, uma plataforma tecnologica se tornará uma ferramenta valiosa para promover vagas e editais de empregos, permitindo que os profissionaisestejam melhor informados e preparados para dar os próximos passos em suas carreiras. Essa iniciativa não apenas contribuirá para a formação de uma força de trabalho mais robusta, mas também ajudará a melhorar a qualidade do profissionalismo em todo o Brasil.

[^2]: https://g1.globo.com/saude/noticia/2023/02/06/brasil-tem-5454-mil-medicos-mais-da-metade-esta-concentrada-somente-nas-capitais.ghtml
[^3]: https://melhoresescolasmedicas.com/tudo-sobre-os-vestibulares-de-medicina-mais-concorridos-do-brasil/
[^4]: https://forbes.com.br/carreira/2024/01/como-a-ia-generativa-mudara-todos-os-nossos-empregos-em-2024/
[^5]: https://www.instagram.com/edu4med
[^6]: https://www.instagram.com/pontuamed
[^7]: https://www.instagram.com/educatbh

# Relação com a Extensão Universitária

A Extensão Universitária, conforme desenvolvida pela PUC Minas, tem um papel essencial na formação dos alunos, proporcionando-lhes a oportunidade de aplicar os conhecimentos adquiridos em sala de aula na prática. Essa iniciativa busca conectar os discentes à sociedade, permitindo que eles compreendam melhor os desafios reais do mercado de trabalho e desenvolvam soluções inovadoras para problemas concretos.

Nesse contexto, a plataforma Edu4Med se alinha perfeitamente aos princípios da Extensão Universitária, pois seu objetivo é utilizar tecnologia para facilitar o acesso a oportunidades na área médica. O desenvolvimento do sistema, que utiliza Web Scraping para coletar e organizar informações sobre editais, concursos e estágios, representa uma aplicação direta do conhecimento acadêmico à resolução de demandas sociais.

Assim como a Extensão Universitária permite que os alunos adquiram experiência prática ao interagir com a comunidade, a EDU4MED cria um ambiente no qual estudantes de Medicina podem acessar informações relevantes para seu desenvolvimento profissional. Dessa forma, a plataforma não apenas simplifica a busca por oportunidades, mas também amplia o impacto da formação acadêmica ao conectar o ensino teórico às necessidades do mercado.

Além disso, o envolvimento de alunos no desenvolvimento e na utilização da plataforma reforça habilidades fundamentais, como a capacidade de pesquisa, a análise de dados e o uso de novas tecnologias para solucionar problemas. Esse processo reflete diretamente o propósito da Extensão Universitária de formar profissionais diferenciados, que saibam aplicar o conhecimento de maneira prática e inovadora.

Portanto, a relação entre a Extensão Universitária da PUC Minas e a plataforma Edu4Med exemplifica como a tecnologia pode ser um meio eficaz para fortalecer a conexão entre academia e sociedade. Iniciativas como essa mostram que a extensão vai além da sala de aula, sendo um caminho estratégico para impulsionar carreiras e gerar impacto positivo na comunidade.

# Descrição do Parceiro

A Edu4Med busca desenvolver um sistema automatizado capaz de identificar e extrair, de forma eficiente, informações sobre editais e oportunidades na área da Medicina. O objetivo é criar um robô que monitore diversas páginas especializadas e colete dados sobre concursos públicos, estágios e oportunidades de emprego para estudantes e profissionais do setor.

A plataforma contará com um sistema de login e cadastro, permitindo que os usuários acessem as oportunidades de maneira simples e intuitiva. Além disso, será possível visualizar informações detalhadas sobre vagas, editais e concursos públicos, organizadas por cidade e estado em todo o Brasil. Para garantir a atualização contínua desses dados, a Edu4Med utilizará um sistema automatizado de Web Scraping, que coletará e estruturará as informações de forma eficiente.

A Edu4Med[^5] nasceu da união entre as empresas PontuaMed[^6] e EduCAT[^7], compartilhando o compromisso de oferecer tecnologia inovadora para a educação médica. Como valor e princípio fundamental, a empresa se dedica a desenvolver soluções que otimizem o aprendizado e a jornada acadêmica dos estudantes de Medicina. Seu foco principal é auxiliar esses alunos na construção de um currículo sólido, além de engajá-los no processo seletivo para ingresso na faculdade.

Os principais stakeholders externos incluem estudantes, cursinhos preparatórios, universidades, portais de educação e órgãos reguladores, como o MEC. Durante o curso de Medicina, os alunos precisam realizar atividades complementares, como extensão universitária, participação em ligas acadêmicas e iniciação científica, que são reconhecidas e validadas ao final da graduação, especialmente no momento da prova de residência.

Desse modo, a Edu4Med tem como missão e objetivo desenvolver soluções que facilitem a educação médica, tornando a busca por informações mais acessível e eficiente. Como benefícios futuros, a plataforma visa democratizar o acesso às informações sobre vestibulares de Medicina, reduzir o tempo e o esforço despendidos pelos candidatos, aumentar a transparência no processo seletivo e facilitar a tomada de decisão sobre onde prestar o vestibular. Além disso, há o potencial de expansão da solução para outras áreas acadêmicas, ampliando seu impacto no setor educacional.
