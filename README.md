Projeto realizado em parceira com Mateus Palma como atividade prática proposta pelo tech helper Bruno Breise na Growdev.

Nosso to Do List é uma aplicação de criação e listagem de tarefas cotidianas onde o usuario pode incluir, editar e deletar tarefas.
A listagem pode ser ordenada por status de conclusão, ordem alfabética do nome da tarefa ou por data de criação.
Trouxemos uma vibe game anos 90, retratando alguns elementos na tela que remetem ao famoso jogo consagrado da Nitendo: Mario Bross.
O check box da tarefa remete a figura das caixas com ponto de interrogação presentes em todo o jogo de Mario Bross que traziam itens, como moedas e cogumelos
utilizados no jogo pelo Mario. Ao clicar na check box a imagem é alterada para uma coin(moeda) como "recompensa" pela tarefa concluida. 

Para acessar nossa aplicação você pode utilizar o link abaixo disponibilizado, no entanto para que ela seja funcional é necessario rodar a API simulada para que o CRUD funcione.
Você pode acessar a API através desse link: json-server --watch db.json --port 3000. Aqui utilizamos a porta 3000, mas fique a vontade para alterar a porta se quiser.
Em seguida acesse a aplicação atráves desse link: https://lista-de-tarefas-sepia.vercel.app/


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
