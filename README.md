# NPCs de Candeh'ssa

Módulo para Foundry VTT **v13** com a lista dos moradores de Candeh’ssa para a campanha
*Jornada Heroica: A Libertação de Valkaria* (Tormenta20).

Cada morador tem nome, imagem, local, descrição, do que gosta e do que não gosta, a Última Demanda,
os benefícios de amizade (Cordial, Leal e Íntimo) e os Pontos de Afinidade (PA) de cada personagem.
Os jogadores veem só o que o mestre já revelou.

As páginas citadas são do livro *Jornada Heroica: A Libertação de Valkaria* (Jambô, 2025).
As descrições e os benefícios foram resumidos para o módulo. Para jogar, é preciso ter o livro.

## Como abrir

- **Todos:** botão **NPCs de Candeh'ssa** (ícone de pessoas) nos controles de token, à esquerda.
- **Atalho:** em *Configurar controles* há "Abrir NPCs de Candeh'ssa", sem tecla definida.
- **Macro:** `game.modules.get("npc-libertacao").api.open()`.
- **Mestre para todos:** **Mostrar a todos** abre a lista na tela de todos os jogadores, já no morador selecionado.

## O que vem pronto

São 31 moradores do livro, em 16 locais:

- os moradores dos lugares da cidade (pp. 35-45);
- Hennd Kalamar, o anão que acompanha o grupo (pp. 22-23);
- **ocultos** no começo, porque só entram na história mais tarde:
  - Eh’mmed, que aparece depois da 10ª masmorra ou de 5 missões (p. 37);
  - os Katharmeks, que vão para a Biblioteca se o grupo poupá-los (p. 126).

No começo nada está revelado: nem gostos, nem desgostos, nem Última Demanda, nem benefícios.
Alguns moradores trazem **notas do mestre** com segredos do livro, por exemplo:

- Ashtad e Khordad dividem um corpo;
- a família perdida de Bragi;
- a partida de Tanit;
- o passado de Tharuk.

## O que os jogadores veem

- Os moradores que não estão ocultos: nome, imagem, local e descrição.
- Os gostos e desgostos revelados, e quantos ainda faltam descobrir ("2 ainda por descobrir").
- A Última Demanda e cada benefício de amizade, só depois de revelados.
- Os Pontos de Afinidade do grupo, o nível de amizade (Cordial 1-3, Leal 4-6, Íntimo 7 + Última Demanda),
  a Última Demanda cumprida e qual morador dá os benefícios agora (★).
  - A configuração **Jogadores veem a afinidade de todos** pode ser desligada.
  - Desligada, cada jogador vê só a linha do próprio personagem. Para isso, ligue o personagem ao usuário em **Jogadores…**.
- Na lista, o próprio nível com cada morador e a estrela do morador ativo.

Os jogadores nunca veem a página do livro, as notas do mestre nem os moradores ocultos.

## O que o mestre faz

- **Revelar aos poucos:** clique num gosto ou desgosto para revelar ou esconder. O olho ao lado da
  Última Demanda e de cada benefício faz o mesmo. Para trocar tudo de uma vez, use **Revelar tudo** e
  **Esconder tudo**.
  - O texto que os jogadores ainda não veem aparece para você com uma borda tracejada.
- **Ocultar morador:** **Ocultar morador** some com ele da lista dos jogadores.
  **Mostrar aos jogadores** traz de volta e anuncia no chat "Vocês conheceram…".
- **Afinidade:**
  - cadastre os personagens em **Jogadores…**. **Importar personagens dos jogadores** traz os personagens já atribuídos aos usuários;
  - na tabela de cada morador, use − e + para os PA (0 a 7);
  - a caixa UD marca a Última Demanda cumprida. Íntimo só vale com 7 PA e a UD;
  - a ★ marca o morador cujos benefícios o personagem usa agora. É um morador por vez (p. 35): marcar outro desmarca o anterior.
- **Imagem:** o botão no retrato abre o seletor de arquivos, onde também dá para enviar uma imagem.
  Também dá para soltar um ator do diretório em cima do retrato.
- **Editar:** muda nome, local, descrição, gostos e desgostos (um por linha), Última Demanda, benefícios
  e notas.
  - O que já estava revelado continua revelado se o texto daquela linha não mudar.
  - Linhas novas começam escondidas.
- **Novo morador:** cria um morador seu. Moradores criados podem ser excluídos.
  Os do livro têm **Voltar ao livro**, que desfaz as edições e mantém a imagem e a afinidade.
- **Ver como jogador:** o botão de olho na barra mostra a lista como os jogadores a veem.

## Configurações do módulo

- **Jogadores veem a afinidade de todos** (ligado).
- **Anunciar revelações no chat** (ligado): avisa no chat quando você revela um gosto, um desgosto,
  a Última Demanda, um benefício ou um morador.
- **Anunciar Pontos de Afinidade no chat** (desligado).

## Observações

- **Onde os dados ficam:** ficam em configurações do mundo, que chegam a todos os clientes.
  A janela nunca mostra aos jogadores o que está escondido. Mesmo assim, um jogador que abra o console
  do navegador conseguiria ler.
- **Sistema:** o módulo não depende do sistema Tormenta20 do Foundry.
- **Testes:** foi testado num ambiente simulado do Foundry, não num Foundry de verdade.
  Se algo falhar, o módulo mostra o erro numa notificação vermelha.

## API

```js
const api = game.modules.get("npc-libertacao").api;
api.open();            // abre a lista nesta tela (api.open("tanit") já seleciona um morador)
api.show("tanit");     // mestre: abre a lista na tela de todos
api.npcs();            // cópias dos moradores (inclui o que está escondido: use só como mestre)
api.players();         // personagens cadastrados
api.affinity();        // { idDoMorador: { idDoPersonagem: { pa, ud, ativo } } }
```

## Licença

MIT (código). Tormenta20 e *A Libertação de Valkaria* são da Jambô Editora.
