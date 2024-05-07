# Ecommerce

Este é um projeto que realiza a criação de uma api e um front end de ecommerce

## Como Rodar o Projeto

Siga as instruções abaixo para rodar o projeto em seu ambiente local:
#### Primeiro vamos rodar a API
1. **Instale o Node.js:**
   Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixá-lo em [https://nodejs.org/](https://nodejs.org/).

2. **Instale o Dcoker**
   Certifique-se de ter o Docker instalado em sua máquina. Você pode baixá-lo em [https://www.docker.com/get-started/](https://www.docker.com/get-started/)

3. **Clone o Repositório:**
   ```bash
   git clone https://github.com/brunosbrito/ecommerce.git
   cd ecommerce-api

4. **Instale as dependências:**
   ```bash
    npm install
    
4. **Rode o Docker:**
   ```bash
   docker-compose up --build
    
5. **Rode a api:**
   ```bash
    npm run start:dev
    
6. **para rodar os teste:**
   ```bash
    npm test

7. **Documentação da API:**
   Você pode encontrar a documentação completa da API [aqui](http://localhost:3000/api). Lembre-se de que é necessário que a API esteja rodando para acessar a documentação.

#### Agora precisamos rodar o front end
1. **Entre no diretorio do front-end:**
   ```bash
   cd ecommerce-frontend
   
2. **Instale as dependências:**
   ```bash
    npm install
    
5. **Rode o front-end:**
   ```bash
    npm start ou ng server