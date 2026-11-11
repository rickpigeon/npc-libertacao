/**
 * NPC Libertação: the residents of Candeh'ssa ("NPCs de Interesse", pp. 35-45) plus Hennd Kalamar
 * (pp. 22-23) and the Katharmeks (p. 126), from "Jornada Heroica: A Libertação de Valkaria" (Jambô, 2025).
 * Descriptions and benefits are short paraphrases with the printed page; the book has the full text.
 * `notas` are GM-only secrets from the book. `oculto` = hidden from players at the start.
 */

/** Affinity tiers (p. 35). Íntimo needs 7 PA and the Última Demanda done. */
export const TIERS = {
  cordial: { label: "Cordial", range: "1 a 3 PA" },
  leal: { label: "Leal", range: "4 a 6 PA" },
  intimo: { label: "Íntimo", range: "7 PA e a Última Demanda" }
};

export const PA_MAX = 7;

/** Places of Candeh'ssa (pp. 28-33). */
export const LOCAIS = ["Antiquário", "Arena", "Biblioteca", "Bosque", "Casa de Banho", "Churrascaria", "Estalagem", "Guilda", "Laboratório", "Mercado", "Oficina", "Pesqueiro", "Taverna", "Templo", "Qualquer lugar", "Com o grupo"];

export const BOOK_NPCS = [
  {
    id: "aaliyah", nome: "Aaliyah", local: "Casa de Banho", pagina: "35",
    descricao: "Moreau do gato de cabelos, orelhas e cauda felpuda cinzentos e olhos cor de caramelo. Recebe todos com doçura na recepção, mas presta atenção em tudo e usa os passos silenciosos para ouvir o que não devia. Quando não está espreitando, faz tricô.",
    gostos: ["Cafuné na cabeça", "Tricô", "Perfumes", "Fofoca"],
    desgostos: ["Coisas (e pessoas) fedorentas", "Barulho", "Chuva"],
    demanda: "Quer visitar uma masmorra, \"qualquer uma, mesmo bem pequenininha\": missão de escolta para qualquer masmorra.",
    cordial: "+2 em Percepção.",
    leal: "Ignora penalidades de armadura em Acrobacia e Furtividade.",
    intimo: "Pode usar a honraria da Casa de Banho uma vez adicional por dia."
  },
  {
    id: "andris", nome: "Andris", local: "Pesqueiro", pagina: "35",
    descricao: "Qareen moreno de cabelos claros, calmo e plácido como as águas. Passa os dias limpando peixes e cuidando dos criadouros, de braceletes de couro e calça sempre impecavelmente branca. É o oposto da esposa, Nerus, e o parceiro mais duradouro dela.",
    gostos: ["Peixes raros", "Facas de qualidade", "Organização"],
    desgostos: ["Trajes de cores muito fortes", "Bagunça"],
    demanda: "Sonha com uma faca que nunca perca o fio: missão de manufatura em Oceano ou Wynna, ou de recuperação em Keenn.",
    cordial: "+5 em testes de perícia para extrair recursos de criaturas.",
    leal: "+1 na margem de ameaça com armas corpo a corpo leves ou de uma mão que causam dano de perfuração.",
    intimo: "Ao passar em Sobrevivência para identificar uma criatura, a margem de ameaça acima sobe para +2 contra ela."
  },
  {
    id: "artemisia", nome: "Artemisia", local: "Taverna", pagina: "35-36",
    descricao: "Sílfide de cabelos verdes e olhos espertos que comanda as mesas de jogo da taverna e jura que sua sorte é inversamente proporcional ao seu tamanho. Curiosa e bem-humorada, é a primeira a chamar os aventureiros para um carteado.",
    gostos: ["Jogos de azar", "Bebidas fortes", "Tudo que seja verde"],
    desgostos: ["Livros", "Poções mágicas", "Armas de ferro"],
    demanda: "Sua sorte vem de um dado abençoado que \"falha\" quando ela perde. Depois de vencê-la num teste de Jogatina, role uma missão na tabela de missões aleatórias (p. 34): ela envolverá o dado.",
    cordial: "Uma vez por masmorra, ao tirar 10 ou menos no dado de um teste de perícia, rola +1d4 e soma.",
    leal: "Como acima, com +1d6.",
    intimo: "Como acima, duas vezes por masmorra (uma vez por teste)."
  },
  {
    id: "ashtad-khordad", nome: "Ashtad & Khordad", local: "Antiquário", pagina: "36",
    descricao: "As simpáticas cuidadoras do Antiquário: qareen de pele dourada com manchas prateadas. Ash, ruiva de olhos âmbar, aparece de dia e é prática; Khor, de cabelos escuros e olhos violeta, é reservada e objetiva. Nunca são vistas juntas e fogem de perguntas sobre isso.",
    gostos: ["Itens mágicos", "Flores", "Perfumes", "Joias", "Doces (Ash)", "Livros (Khor)"],
    desgostos: ["Barulho", "Curiosidade exagerada", "Perguntas pessoais", "Multidões"],
    demanda: "Guardam um segredo que só se revela com uma missão de pesquisa em Glórienn, Tanna-Toh ou Wynna.",
    cordial: "+5 em testes de perícia para identificar itens e seus usos.",
    leal: "10% de desconto em itens no Antiquário (cumulativo).",
    intimo: "Pode vestir um item mágico adicional.",
    notas: "O segredo: por um acidente mágico, as duas dividem o mesmo corpo, uma dominante de dia e a outra de noite. Com a revelação, aceitam tornar a condição pública (p. 36)."
  },
  {
    id: "barossa", nome: "Barossa", local: "Biblioteca", pagina: "36-37",
    descricao: "Pequena sulfure de pele azul e óculos, sempre estudando zoologia na Biblioteca sob um chapéu imenso e um manto de peles. Alterna entre muita vergonha e uma enxurrada de perguntas, principalmente sobre hidras.",
    gostos: ["Hidras (muito!)", "Partes de monstros", "Histórias", "Sorvete de maracujá"],
    desgostos: ["Barulho", "Dias de sol", "Picolé de uva", "Multidões"],
    demanda: "Quer criar a própria hidra, mas as ideias fantasiosas atrapalham a conjuração: missão de escolta em Megalokk, Sszzaas ou Thyatis.",
    cordial: "+2 em testes de perícia para identificar criatura.",
    leal: "A cada ataque de uma criatura além do primeiro na rodada, +2 cumulativo na Defesa e na redução de dano contra ela, até o fim da rodada.",
    intimo: "Uma vez por rodada, identifica criatura como ação livre; se passar, ganha também +2 em testes de perícia contra ela."
  },
  {
    id: "bragi", nome: "Bragi", local: "Taverna", pagina: "37",
    descricao: "Sulfure pálido de olhos dourados e fendidos, chifres, escamas de dragão no rosto e cabelo castanho-avermelhado rebelde. Fica de braços cruzados encostado numa parede da taverna, com o montante às costas, desencorajando brigas. Isolado e ranzinza.",
    gostos: ["Montantes", "Qareen", "Instrumentos musicais"],
    desgostos: ["Cores vibrantes", "Comidas picantes", "Armas leves"],
    demanda: "Caçar a criatura violenta que levou quem ele amava: missão de caça, na masmorra que o mestre achar apropriada.",
    cordial: "Proficiência numa arma marcial corpo a corpo de duas mãos à escolha (se já tiver, +2 no dano com ela).",
    leal: "+1 em testes de ataque e na margem de ameaça com armas de duas mãos.",
    intimo: "Uma vez por cena, 10 PV temporários por patamar; se perder todos até o próximo turno, ganha 2 PM temporários. Os bônus de Leal sobem para +2.",
    notas: "Era um bardo alegre até perder os entes queridos num raro acidente fatal em Candeh'ssa (p. 37)."
  },
  {
    id: "caliandre", nome: "Caliandre", local: "Arena", pagina: "37",
    descricao: "Aggelus de cabelos negros e lustrosos, halo luminoso e veios dourados na pele escura. Sempre sorrindo, adora ser desafiada para um combate amistoso. Sua arma muda de forma conforme a luta, e ela treina novas combinações de ataques e manobras o tempo todo.",
    gostos: ["Armas exóticas", "Combate", "Manobras", "Duelos"],
    desgostos: ["Magia arcana", "Passividade", "Inimigos em desvantagem"],
    demanda: "Colecionadora de armas: missão de recuperação de uma arma específica em Tauron, Lin-Wu, Keenn ou Khalmyr.",
    cordial: "+5 em testes de manobra.",
    leal: "Um poder à escolha entre Derrubar Aprimorado, Desarmar Aprimorado, Finta Aprimorada ou Quebrar Aprimorado.",
    intimo: "Caliandre vira uma parceira combatente mestre que acompanha você nas masmorras."
  },
  {
    id: "ehmmed", nome: "Eh'mmed", local: "Biblioteca", pagina: "37-38", oculto: true,
    descricao: "Qareen de olhos prateados e cabelos brancos, envolto em pesados mantos escuros, sempre com cara de tédio ou de cansaço. Ácido com aventureiros, costuma estar estudando ou resolvendo problemas dos moradores na Biblioteca. Rabugento, mas um protetor sincero da cidade.",
    gostos: ["Candeh'ssa", "Saber"],
    desgostos: ["Aventureiros", "Ameaças a Candeh'ssa ou a seus cidadãos"],
    demanda: "Cumprir a Última Demanda de outra pessoa.",
    cordial: "Aprende e pode lançar uma magia arcana de convocação ou transmutação de 1º círculo à escolha.",
    leal: "+2 PM para usar em aprimoramentos da magia escolhida.",
    intimo: "Uma vez na campanha, quando você morreria, fica com 0 PV, é resgatado por um Eh'mmed furioso e o grupo inteiro é teleportado de volta a Candeh'ssa.",
    notas: "Só aparece para quem venceu a décima masmorra ou cinco missões da Guilda (p. 37)."
  },
  {
    id: "frann", nome: "Frann", local: "Laboratório", pagina: "38",
    descricao: "Medusa inventora longilínea, de terninho e óculos, com serpentes curtas listradas de vermelho, amarelo e preto no lugar dos cabelos. Curiosa e cética, responde por toda a inovação técnica da cidade e quase nunca sai do Laboratório (que de vez em quando explode).",
    gostos: ["Inovação", "Tecnologia", "Armas de fogo", "Roupas casuais", "Armaduras"],
    desgostos: ["Apego às tradições e ao passado", "História", "Roupas formais"],
    demanda: "Quer provar suas invenções para toda a cidade: missão de escolta em qualquer masmorra.",
    cordial: "Cada visita a Candeh'ssa conta como três semanas de fabricação de itens permanentes.",
    leal: "Cada visita ao Laboratório passa a contar como quatro semanas.",
    intimo: "Reduz pela metade o tempo de fabricação de um item permanente."
  },
  {
    id: "harko", nome: "Harko", local: "Oficina", pagina: "38",
    descricao: "Qareen moreno de braços fortes e riso fácil, armeiro da Oficina (e figura certa na taverna no fim do dia). A chegada dos heróis o animou: finalmente vai forjar armas, em vez de utensílios domésticos.",
    gostos: ["Dias de sol", "Cerveja", "Festas", "Armas exóticas"],
    desgostos: ["Objetos domésticos de metal", "Pessoas calmas demais", "Passividade"],
    demanda: "Sonha com a maior ressaca de todos os tempos para virar o Deus Menor das Festas: a maior caça de todas, em Allihanna, Oceano, Lena ou Megalokk.",
    cordial: "Suas armas recebem +1 em testes de ataque e dano no primeiro encontro da próxima masmorra.",
    leal: "Como acima, até o próximo descanso dentro da masmorra.",
    intimo: "Os bônus duram até o fim da masmorra."
  },
  {
    id: "juno", nome: "Juno", local: "Arena", pagina: "39",
    descricao: "Minotauro musculoso de pelagem castanha que escurece nas costas. Por trás da aparência imponente há um filósofo contemplativo que estuda técnicas de fortalecimento e prefere argumentos aos punhos.",
    gostos: ["Combate desarmado", "Liberdade", "Comida", "Tapista"],
    desgostos: ["Armas", "Covardia", "Escravidão", "Preguiça"],
    demanda: "Quer meditar num espaço divino: missão de escolta em Lin-Wu ou Tauron.",
    cordial: "O dano dos seus ataques desarmados aumenta um passo.",
    leal: "+5 em testes de manobra com ataques desarmados.",
    intimo: "Uma vez por rodada, ao acertar um ataque desarmado, faz uma manobra desarmada contra o mesmo alvo como ação livre."
  },
  {
    id: "kandor", nome: "Kandor", local: "Oficina", pagina: "39",
    descricao: "Aggelus quieto de olhos analíticos, que não deixam escapar nenhum detalhe. Trabalha numa salinha da Oficina e quase não sai de lá: artesão, alfaiate, carpinteiro e mais.",
    gostos: ["Plantas", "Conchas", "Objetos de formato orgânico"],
    desgostos: ["Festas", "Pessoas barulhentas", "Desperdício"],
    demanda: "Vê a perfeição na natureza e quer descrições vívidas para se inspirar: missão de pesquisa em Allihanna, Azgher ou Oceano.",
    cordial: "Uma ferramenta aprimorada à escolha.",
    leal: "Paga só a matéria-prima (metade do preço) por itens mundanos que Kandor consiga fabricar.",
    intimo: "Ajuste especial num item: +10 PV por patamar ou +1 PM por patamar."
  },
  {
    id: "lassance", nome: "Lassance", local: "Bosque", pagina: "39-40",
    descricao: "Dríade de beleza estonteante, com cabelos como folhagem e pele de madeira sedosa. Observa quem entra no Bosque sem se mostrar e só se aproxima quando se sente segura ou gosta de alguém; aí é divertida e curiosa. Por respeito aos vizinhos, veste roupas de folhas e pétalas.",
    gostos: ["Pessoas belas", "Geleia", "Chuva", "Ficar nua"],
    desgostos: ["Desrespeito à natureza", "Matança", "Flores"],
    demanda: "Uma geleia de frutas inigualável: missão de manufatura em três masmorras diferentes, com frutas únicas de cada uma.",
    cordial: "+2 em Adestramento e Cura.",
    leal: "Pode lançar Controlar Plantas (se já conhece, custa −1 PM).",
    intimo: "Pode usar o poder Companheiro Animal como um druida do mesmo nível."
  },
  {
    id: "lyssara", nome: "Lyssara", local: "Mercado", pagina: "40",
    descricao: "Aggelus que aparenta uns 45 anos, de cabelos azul-escuros, olhos violeta e sorriso encantador. Florista tímida, só se solta quando o assunto são flores. Voz calma, sempre disposta a ajudar e incapaz de dizer não.",
    gostos: ["Flores", "Livros", "Silêncio", "Sobremesas de baunilha"],
    desgostos: ["Gente invadindo seu espaço pessoal", "Gente que fala alto", "Chocolate"],
    demanda: "A Kinabalu Mágica, tulipa luminosa de cores sempre mudando: missão de recuperação em Wynna.",
    cordial: "+2 em Ofício (alquimista) e Sobrevivência.",
    leal: "Soma o atributo principal nos PV que recupera usando habilidades.",
    intimo: "Preparados alquímicos com efeito em dados ganham um dado a mais do mesmo tipo."
  },
  {
    id: "mahin", nome: "Mahin", local: "Estalagem", pagina: "40",
    descricao: "Aggelus jovem de cabelos ruivos desgrenhados e olhos lilases estrelados, atrás do balcão da Estalagem; quem já foi à taverna jura ter um déjà-vu, e ela suspira explicando que é gêmea de Nima. Reservada e silenciosa, conhece todos os caminhos da cidade.",
    gostos: ["Mapas", "Peças de cerâmica", "Nima"],
    desgostos: ["Tecidos esvoaçantes", "Itens de madeira", "Animais selvagens"],
    demanda: "Quer fazer as pazes com Nima e lhe dar lírios brancos perfeitos: missão de pesquisa (Sobrevivência) em Allihanna, Marah ou Glórienn.",
    cordial: "PV máximos +3 por patamar.",
    leal: "Ao descansar, elimina também uma condição.",
    intimo: "Os PV que passariam do máximo num descanso viram PV temporários até o fim da próxima masmorra."
  },
  {
    id: "martin", nome: "Martin", local: "Qualquer lugar", pagina: "40-41",
    descricao: "Humano, ex-mercenário de Portsmouth de moral duvidosa que, ao morrer, recebeu um \"contrato\" para ajudar os Libertadores. Alto e magro, de cicatrizes, cavanhaque negro e cabelos longos, faz bicos em qualquer estabelecimento e não esconde que luta sujo.",
    gostos: ["Dinheiro", "Combate desonrado", "Violência"],
    desgostos: ["Magia arcana", "Combate honrado", "Pacifismo"],
    demanda: "Sente falta do antigo bando e quer recuperar o estandarte deles: missão de busca na masmorra de Keenn.",
    cordial: "Pode usar o poder Valentão.",
    leal: "Resistência a magia arcana +5.",
    intimo: "O bônus de dano do Valentão sobe para +5."
  },
  {
    id: "myssia", nome: "Myssia", local: "Guilda", pagina: "41",
    descricao: "Aggelus de cabelos loiros cacheados e pele escura, de casaco branco com botões amarelos e gravata-borboleta azul. Passa o dia no balcão da Guilda organizando as requisições da cidade; pensa e fala rápido, às vezes rápido demais.",
    gostos: ["Organização", "Listas bem-feitas", "Sorvete de morango"],
    desgostos: ["Bagunça", "Coisas erráticas", "Cebola na comida"],
    demanda: "Que as Últimas Demandas de duas outras pessoas sejam concluídas.",
    cordial: "Uma vez por masmorra, rola de novo um teste de perícia relacionado a uma missão.",
    leal: "Quando o grupo conclui uma missão, o mestre rola duas recompensas e os personagens escolhem uma.",
    intimo: "Monta a própria missão escolhendo na tabela de missões aleatórias (p. 34); uma vez por personagem."
  },
  {
    id: "nahiri", nome: "Nahiri", local: "Mercado", pagina: "41",
    descricao: "Qareen do ar de pele escura, cabelos e olhos verde-claros e a Marca de Wynna nas costas. Apareceu ainda bebê na porta de Tharuk, que a criou como filha. Mercadora sorridente e entusiasmada, adora histórias de aventureiros e treinar magias, para desespero do pai.",
    gostos: ["Aventuras", "Coisas brilhantes", "Flertar", "Magia"],
    desgostos: ["Assuntos burocráticos", "Tempo frio", "Pimenta"],
    demanda: "Sonha ser aventureira: missão de escolta em qualquer masmorra.",
    cordial: "+2 em Diplomacia.",
    leal: "Pode lançar Criar Ilusão (se já conhece, custa −1 PM).",
    intimo: "Nahiri vira uma parceira veterana adepta, ajudante ou magivocadora."
  },
  {
    id: "nerus", nome: "Nerus", local: "Pesqueiro", pagina: "41-42",
    descricao: "Elfa-do-mar musculosa e amistosa, de cabelos verdes curtos, botas longas e colete cheio de iscas e linhas. Cheia de energia, vive chamando os aventureiros para a pesca diária com o marido, Andris.",
    gostos: ["Peixes raros", "Marcenaria", "Nadar"],
    desgostos: ["Dias nublados", "Comidas doces", "Aulas e ensinamentos não práticos que demoram"],
    demanda: "Quer pescar um kraken e precisa de uma isca especial: missão de caça em Allihanna, Oceano ou Megalokk.",
    cordial: "+2 em Atletismo e Sobrevivência.",
    leal: "Proficiência com o arpão.",
    intimo: "Segurando a corda de um arpão preso a um alvo, gasta uma ação padrão e faz uma manobra: o alvo cai e é arrastado 9 m."
  },
  {
    id: "nima", nome: "Nima", local: "Taverna", pagina: "42",
    descricao: "Taverneira, gêmea de Mahin: aggelus jovem, ruiva, de olhos lilases estrelados. Ao contrário da irmã, é solícita e falante, conhece cada habitante da cidade e tem ótimas impressões sobre todos.",
    gostos: ["Conversas", "Especiarias", "Lírios brancos", "Mahin"],
    desgostos: ["Roupas de couro", "Armaduras", "Animais selvagens"],
    demanda: "Quer fazer as pazes com Mahin e lhe dar um vaso de cerâmica perfeito: missão de manufatura em Lena, Marah ou Wynna.",
    cordial: "O bônus de um prato especial dura dois dias.",
    leal: "Acumula dois bônus de alimentação ao mesmo tempo.",
    intimo: "Uma vez por visita, dá uma festa para a cidade (metade do dinheiro inicial do nível da próxima masmorra): resistência a magia +5 e 10 PV temporários por patamar até o fim da próxima masmorra."
  },
  {
    id: "nthanda", nome: "Nthanda", local: "Laboratório", pagina: "42",
    descricao: "Aggelus muito alta, de olhar benevolente e pele tatuada com padrões arbóreos que brilham como estrelas; o cheiro de ervas denuncia sua presença. Serena, caridosa e de poucas palavras, está sempre preparando um bálsamo para alguém no Laboratório.",
    gostos: ["Orvalho", "Chuva", "Pássaros", "Penas coloridas"],
    desgostos: ["Pelo de animal", "Bagunça", "Sujeira"],
    demanda: "Transformar a matéria com uma poção: um catalisador universal, missão de manufatura de Ofício (alquimista) em qualquer masmorra.",
    cordial: "A cada retorno a Candeh'ssa, 2d4 × T$ 10 em essências de mana ou bálsamos restauradores.",
    leal: "2d6 × T$ 10, incluindo ácidos, bombas e fogos alquímicos.",
    intimo: "Também uma poção à escolha: Curar Ferimentos (4d8+4), Bola de Fogo (6d6), Purificação ou Resistência a Energia."
  },
  {
    id: "phylla", nome: "Phylla", local: "Oficina", pagina: "43",
    descricao: "Sulfure pequena, de riso fácil e cabeleira ruiva sempre correndo pela Oficina: a mais jovem do lugar e uma couraceira fenomenal, que vive perdendo as ferramentas. Respeita tudo que vive e ama histórias de outras culturas.",
    gostos: ["Itens de pedra", "Culturas distantes", "Histórias"],
    desgostos: ["Livros", "Coisas paradas", "Pessoas quietas demais"],
    demanda: "Seu brunidor favorito foi levado para uma masmorra por aventureiros anteriores: missão de recuperação em qualquer masmorra.",
    cordial: "+2 em Investigação e Percepção.",
    leal: "Uma vez por masmorra, \"acha\" no bolso uma ferramenta de Phylla (pode ter uma melhoria), com uma boa explicação.",
    intimo: "Gasta 1 PM para achar a fraqueza de um inimigo (como identificar criatura); contra quem usa armadura ou construtos, +5 de dano."
  },
  {
    id: "punddin", nome: "Punddin", local: "Churrascaria", pagina: "43",
    descricao: "Moreau do coelho de longas orelhas brancas saindo do chapéu de chef, de vestido cor-de-rosa com babados e avental. Doce, calma e muito tímida, acha que uma sobremesa é o melhor jeito de começar uma conversa.",
    gostos: ["Coelhos", "Cor-de-rosa", "Chantilly", "Livros de terror"],
    desgostos: ["Pimenta", "Carne", "Bagunça na cozinha"],
    demanda: "Quer fazer um bolo enorme para os heróis, mas o açúcar de fada acabou: missão de recuperação em Glórienn, Lena, Marah ou Wynna.",
    cordial: "+2 em Ofício (cozinheiro).",
    leal: "Uma vez por dia, gasta 1 PM para que os pratos especiais que fabrica deem 2d8 PV temporários.",
    intimo: "Seus pratos especiais permitem ignorar a primeira condição de medo ou mental sofrida até o fim do dia."
  },
  {
    id: "rafiq", nome: "Rafiq", local: "Templo", pagina: "43",
    descricao: "Jovem aggelus alto, de pele escura, careca, rosto marcado e olhos dourados muito expressivos. De vestes sacerdotais e armadura completa, conduz os ritos de energia positiva do Templo e tem predileção por aventureiros de causas nobres.",
    gostos: ["Heroísmo", "Romances históricos", "Incenso"],
    desgostos: ["Barulho", "Exibicionismo", "Descrença ou desrespeito aos deuses"],
    demanda: "Levar suas oferendas aos deuses: três missões de entrega em masmorras de deuses diferentes que canalizam energia positiva.",
    cordial: "Suas magias de cura recuperam +1 PV por círculo de magia que você consegue lançar.",
    leal: "Uma magia divina que você conhece custa −1 PM.",
    intimo: "Suas magias divinas de toque ganham o aprimoramento \"+1 PM: muda o alcance para curto\"."
  },
  {
    id: "tanit", nome: "Tanit", local: "Templo", pagina: "44",
    descricao: "Qareen de curvas acentuadas e cabelo cacheado lilás, em véus e trajes leves, que celebra à noite os ritos de energia negativa do Templo. Entediada com os moradores, mas muito interessada nos aventureiros, a quem não poupa elogios nem ajuda.",
    gostos: ["Poder", "Joias", "Presentes caros", "Passeios noturnos"],
    desgostos: ["Altruísmo", "Flores", "Luzes fortes"],
    demanda: "Está farta da cidadela: missão de escolta até a masmorra de um deus que canaliza energia negativa.",
    cordial: "Aprende uma magia divina de necromancia ou transmutação de 1º círculo à escolha.",
    leal: "Ao levar inimigos a 0 PV ou menos com uma magia divina de dano, recebe 2 PM temporários.",
    intimo: "Mesmo depois de partir, na primeira vez em cada masmorra que você chega à metade dos PV, um espírito abissal ajuda por uma cena (parceiro veterano ou como Servo Divino).",
    notas: "Na masmorra ela completa um ritual para alcançar o reino desse deus e some para sempre da campanha (p. 44)."
  },
  {
    id: "teclis", nome: "Teclis", local: "Biblioteca", pagina: "44",
    descricao: "Elfo franzino, escriba da Biblioteca, sempre carregando mais pergaminhos do que consegue. Tímido, a menos que o assunto seja magia; muito solícito com conjuradores e quem tem o dom.",
    gostos: ["Conhecimento arcano", "Pergaminhos", "Mistérios mágicos"],
    desgostos: ["Inventores", "Engenhoqueiros", "Goblinoides", "Armas de fogo"],
    demanda: "Novas informações mágicas: missão de reconhecimento em Wynna, Tanna-Toh ou Glórienn.",
    cordial: "Ao procurar um pergaminho específico na Biblioteca, rola dois dados e usa o melhor.",
    leal: "Ao lançar uma magia de um pergaminho, 25% de chance de o pergaminho não ser consumido.",
    intimo: "Uma magia de até 3º círculo de um pergaminho faz parte das suas magias conhecidas durante a próxima masmorra."
  },
  {
    id: "tharuk", nome: "Tharuk", local: "Mercado", pagina: "44-45",
    descricao: "Anão forte, de barba e cabelos pretos, focado no trabalho e na filha, Nahiri. Conversador e gentil com todos, mas prefere não falar do passado e não tolera quem mexe com a filha.",
    gostos: ["Nahiri", "Cerveja anã", "Histórias de Doherimm"],
    desgostos: ["Falar do passado", "Anões sem barba", "Gente mexendo com sua filha"],
    demanda: "Recuperar o machado anão de família que deixou para trás: missão de recuperação numa das cinco primeiras masmorras, à escolha do mestre.",
    cordial: "A cada retorno a Candeh'ssa, um item à escolha de até T$ 100.",
    leal: "O valor do item sobe para T$ 200.",
    intimo: "Tharuk vira um parceiro veterano combatente, fortão ou guardião.",
    notas: "Tharuk já tentou ser um Libertador: seu grupo foi arrasado e só ele sobreviveu. Ficou em Candeh'ssa por não ver sentido em voltar derrotado (p. 44)."
  },
  {
    id: "tonhao", nome: "Tonhão", local: "Churrascaria", pagina: "45",
    descricao: "Ogro grandalhão de cabelo curto e sorriso bobo, com os espetos de carne presos às costas e à cintura como se fossem espadas, sempre limpando as mãos numa toalha e testando novas linguiças. Chegou há pouco, depois que o bando o largou para morrer por não querer ser guerreiro.",
    gostos: ["Carne", "Cozinhar", "Ajuda para cozinhar"],
    desgostos: ["Peixe", "Dias chuvosos", "Não poder cozinhar"],
    demanda: "O churrasco perfeito: temperar o metal dos espetos numa fonte de calor sobrenatural, missão de manufatura de Ofício (artesão) em Azgher, Thyatis ou Wynna.",
    cordial: "Ao extrair recursos de uma criatura, extrai um recurso extra.",
    leal: "Aprende e pode lançar Abençoar Alimentos (se já conhece, custa −1 PM).",
    intimo: "No misturadinho dos deuses, gasta um ingrediente adicional para escolher um quarto acompanhamento."
  },
  {
    id: "viridiane", nome: "Viridiane", local: "Bosque", pagina: "45",
    descricao: "Unicórnio fêmea extremamente tímida, só à vontade no Bosque sob a proteção de Lassance; quando se assusta (o que é frequente), teleporta. Desconfia de aventureiros que matam animais mágicos, mas pode ficar curiosa com alguém do grupo. Também assume forma humanoide: pequena, de pele clara, cabelos brancos e chifre espiralado.",
    gostos: ["Silêncio", "Segurança", "Confeitos"],
    desgostos: ["Armas", "Ruído alto", "Itens de couro", "Agressividade"],
    demanda: "Vencer a timidez acompanhando o grupo numa missão, como parceira unicórnio iniciante (ela escolhe quem a abordou com mais candura).",
    cordial: "+2 em Percepção e Sobrevivência.",
    leal: "Na próxima masmorra, pode lançar Purificação uma vez, pagando o custo normal.",
    intimo: "Viridiane atua como parceira unicórnio veterana (Ameaças de Arton, p. 227); a partir do nível 11, mestre."
  },
  {
    id: "kalamar", nome: "Hennd Kalamar", local: "Com o grupo", pagina: "22-23",
    descricao: "Jovem clérigo humano de Valkaria que peregrina em busca de heróis para libertar a deusa. Manca desde o cativeiro nas mãos de cultistas de Sszzaas. Pode acompanhar o grupo pelo Labirinto.",
    gostos: ["Aventuras", "Heroísmo", "Batatas valkarianas"],
    desgostos: ["Responsabilidade", "Tirania", "Devotos de Sszzaas"],
    demanda: "Libertar Valkaria: acompanhar o grupo nas incursões às vinte masmorras.",
    cordial: "Parceiro iniciante que não conta no limite de parceiros; +2 em testes para obter informações sobre as masmorras (como o Agrado aos Deuses); uma vez por rodada, 1 PM cura 2d8+2 PV de uma criatura adjacente.",
    leal: "Vira parceiro veterano; o bônus sobe para +5 e 6 PM curam 2d8+2 PV de criaturas à escolha em alcance curto.",
    intimo: "Vira parceiro mestre e você pode lançar Círculo da Restauração, Heroísmo e Libertação."
  },
  {
    id: "katharmeks", nome: "Katharmeks", local: "Biblioteca", pagina: "126", oculto: true,
    descricao: "O bando de pequenos feiticeiros do Desafio de Wynna. Se forem poupados e convencidos a sair da masmorra, mudam-se para a Biblioteca, onde seu conhecimento de magias e pergaminhos os faz aceitos, ainda que com certa relutância.",
    gostos: ["Livros", "Pergaminhos", "Magia arcana", "Besouros", "Roupas remendadas"],
    desgostos: ["Crânios", "Copos trincados", "Necromancia", "Penas totalmente brancas"],
    demanda: "Resgatar os espíritos dos amigos: missão de ritual (Misticismo) no Desafio de Thyatis.",
    cordial: "Uma vez por estada em Candeh'ssa, um pergaminho de magia arcana de 1º círculo à escolha.",
    leal: "Como acima, com magias arcanas de até 2º círculo.",
    intimo: "Ao lançar uma magia de um pergaminho arcano, +2 PM para aprimoramentos.",
    notas: "Só vêm para a cidade se poupados em Wynna e convencidos com Diplomacia estendida CD 25 (3 sucessos) (p. 126)."
  }
];
