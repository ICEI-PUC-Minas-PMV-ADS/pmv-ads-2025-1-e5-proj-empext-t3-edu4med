import requests
from bs4 import BeautifulSoup
import unicodedata
import re
import time
import psycopg2
from datetime import datetime

# Função para remover acentos
def remover_acentos(texto):
    if texto:
        texto = unicodedata.normalize("NFKD", texto).encode("ASCII", "ignore").decode("utf-8")
        texto = texto.replace("ã", "a").replace("õ", "o").replace("ç", "c")
    return texto

# Conectar ao PostgreSQL
def conectar_bd():
    return psycopg2.connect(
        dbname="edu4med",
        user="postgres",
        password="Banana123",
        host="edu4med.czw4wm4m4akr.us-east-2.rds.amazonaws.com",
        port="5432"
    )


    conn.commit()
    cur.close()
    conn.close()

# Inserir dados no PostgreSQL evitando duplicação
def inserir_dados(universidade, link, regiao, instituicao, vagas, link_cadastro, fim_inscricoes):
    conn = conectar_bd()
    cur = conn.cursor()

    # Verificar se a universidade já está cadastrada para evitar duplicação
    cur.execute('SELECT "Id" FROM "Vestibulares" WHERE "Link" = %s', (link,))

    resultado = cur.fetchone()

    if resultado is None:  # Só insere se não existir
        cur.execute("""
            INSERT INTO "Vestibulares" ("Universidade", "Link", "Regiao", "Instituicao", "Vagas", "Link_inscricoes", "Fim_cadastro")
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (universidade, link, regiao, instituicao, vagas, link_cadastro, fim_inscricoes))

        conn.commit()
        print(f"✅ Dados inseridos: {universidade}")
    else:
        print(f"⚠️ Dados já existem no banco: {universidade}")

    cur.close()
    conn.close()

# URL do site a ser raspado
link = "https://Vestibularesmedicina.com.br/vestibulares-abertos"
headers = {
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
}


# Fazer requisição à página
req = requests.get(link, headers=headers)

if req.status_code == 200:
    site = BeautifulSoup(req.text, "html.parser")
    linhas = site.find_all("tr")

    for linha in linhas:
        try:
            fim_inscricoes_tag = linha.find("span", class_="badge badge-success")
            fim_inscricoes = fim_inscricoes_tag.get_text(strip=True) if fim_inscricoes_tag else "N/A"

            if fim_inscricoes != "N/A":
                universidade_tag = linha.find("a")
                universidade = universidade_tag.get_text(strip=True) if universidade_tag else "N/A"
                link_universidade = universidade_tag["href"] if universidade_tag and universidade_tag.has_attr("href") else "N/A"
                
                if link_universidade != "N/A" and not link_universidade.startswith("http"):
                    link_universidade = f"https://Vestibularesmedicina.com.br{link_universidade}"
                
                regiao_tag = linha.find("strong", string="Região:")
                regiao = regiao_tag.next_sibling.strip() if regiao_tag else "N/A"

                instituicao_tag = linha.find("strong", string="Instituição:")
                instituicao = instituicao_tag.next_sibling.strip() if instituicao_tag else "N/A"

                vagas = "N/A"
                info_divs = linha.find_all("div", class_="text-muted small")
                for div in info_divs:
                    texto = div.get_text(" ", strip=True)
                    if "vagas:" in texto:
                        match = re.search(r'vagas:\s*(\d+)', texto)
                        if match:
                            vagas = match.group(1)
                            break

                link_aqui = "N/A"
                if link_universidade != "N/A":
                    try:
                        time.sleep(1)
                        req_universidade = requests.get(link_universidade, headers=headers)
                        if req_universidade.status_code == 200:
                            site_universidade = BeautifulSoup(req_universidade.text, "html.parser")
                            link_tag = site_universidade.find("a", string=re.compile(r"\baqui\b", re.IGNORECASE))
                            if link_tag and link_tag.has_attr("href"):
                                link_aqui = link_tag["href"]
                                if not link_aqui.startswith("http"):
                                    link_aqui = f"https://Vestibularesmedicina.com.br{link_aqui}"
                    except Exception as e:
                        print(f"Erro ao acessar {link_universidade}: {e}")

                universidade = remover_acentos(universidade)
                regiao = remover_acentos(regiao)
                instituicao = remover_acentos(instituicao)
                vagas = remover_acentos(vagas)
                fim_inscricoes = remover_acentos(fim_inscricoes)

                print(f"Universidade: {universidade}")
                print(f"Link: {link_universidade}")
                print(f"Região: {regiao}")
                print(f"Instituição: {instituicao}")
                print(f"Vagas: {vagas}")
                print(f"Link do cadastro da prova: {link_aqui}")
                print(f"Fim das inscrições: {fim_inscricoes}")
                print("-" * 80)

                # Inserir os dados no banco
                inserir_dados(universidade, link_universidade, regiao, instituicao, vagas, link_aqui, fim_inscricoes)

        except Exception as e:
            print(f"❌ Erro ao processar linha: {e}")
else:
    print(f"❌ Erro ao acessar a página. Status code: {req.status_code}")
