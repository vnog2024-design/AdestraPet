import type { TrainingExercise, DailyTip } from "./types";

export const TRAINING_EXERCISES: TrainingExercise[] = [
  {
    id: "sentar",
    name: "Sentar",
    category: "obediencia",
    difficulty: "iniciante",
    description:
      "O comando mais básico e fundamental. Todo cão deve aprender a sentar quando solicitado. É a base para outros comandos.",
    icon: "Dog",
    durationMin: 10,
    steps: [
      {
        title: "Preparar o petisco",
        description:
          "Tenha em mãos petiscos pequenos e saborosos que seu cão adore. Segure o petisco entre o polegar e o indicador.",
        duration: 2,
      },
      {
        title: "Atrair a atenção",
        description:
          "Mostre o petisco bem perto do focinho do cão. Quando ele sentir o cheiro, levante lentamente a mão acima e atrás da cabeça dele.",
        duration: 3,
      },
      {
        title: "Recompensar o sentar",
        description:
          "O cão acompanhará o petisco com os olhos e naturalmente sentará. No momento em que o traseiro tocar o chão, diga 'Sentar' e dê o petisco imediatamente.",
        duration: 3,
      },
      {
        title: "Repetir e consolidar",
        description:
          "Repita o exercício 5 a 10 vezes em sessões curtas. Pratique em diferentes ambientes até o cão responder apenas ao comando verbal.",
        duration: 2,
      },
    ],
    tips: [
      "Use petiscos pequenos para não engordar o cão",
      "Treine antes das refeições, quando o cão está com mais apetite",
      "Sessões curtas de 5-10 minutos são mais eficazes que sessões longas",
      "Nunca force o cão a sentar empurrando o traseiro",
    ],
    reward: "Petisco + carinho verbal 'Muito bem!'",
  },
  {
    id: "deitar",
    name: "Deitar",
    category: "obediencia",
    difficulty: "iniciante",
    description:
      "Comando essencial para controle e calma. Útil em visitas, veterinário e momentos de descanso.",
    icon: "Bed",
    durationMin: 12,
    steps: [
      {
        title: "Partir do Sentar",
        description:
          "Primeiro peça para o cão sentar. Segure o petisco próximo ao focinho dele.",
        duration: 2,
      },
      {
        title: "Atrair para baixo",
        description:
          "Baixe o petisco lentamente entre as patas dianteiras do cão, levando-o para frente. O cão deve acompanhar deitando.",
        duration: 4,
      },
      {
        title: "Marcar o comando",
        description:
          "Quando o cão estiver completamente deitado, diga 'Deitar' e recompense. Repita várias vezes.",
        duration: 4,
      },
      {
        title: "Aumentar duração",
        description:
          "Aos poucos, peça para o cão permanecer deitado por mais tempo antes de recompensar.",
        duration: 2,
      },
    ],
    tips: [
      "Não force o cão a empurrar para baixo",
      "Superfícies macias (tapete) facilitam o aprendizado",
      "Se o cão levantar, recomece sem repreender",
    ],
    reward: "Petisco duplo + brincadeira curta",
  },
  {
    id: "ficar",
    name: "Ficar",
    category: "obediencia",
    difficulty: "intermediario",
    description:
      "Ensina autocontrole. O cão aprende a manter a posição até receber liberação. Crítico para segurança.",
    icon: "Hourglass",
    durationMin: 15,
    steps: [
      {
        title: "Posicionar o cão",
        description: "Peça para o cão sentar ou deitar em uma posição confortável.",
        duration: 2,
      },
      {
        title: "Sinal de espera",
        description:
          "Mostre a palma da mão aberta na frente do rosto do cão e diga 'Ficar'. Dê um petisco enquanto ele mantém a posição.",
        duration: 4,
      },
      {
        title: "Aumentar distância",
        description:
          "Dê um passo para trás. Se o cão ficar, volte e recompense. Aumente gradualmente a distância e o tempo.",
        duration: 6,
      },
      {
        title: "Comando de liberação",
        description:
          "Use uma palavra específica como 'Livre' ou 'Ok' para liberar o cão. Sempre use a mesma palavra.",
        duration: 3,
      },
    ],
    tips: [
      "Aumente distância e tempo separadamente, nunca juntos no início",
      "Se o cão quebrar, volte um passo no treinamento",
      "Pratique em ambientes com poucas distrações primeiro",
      "Recompense apenas quando o cão estiver na posição correta",
    ],
    reward: "Petisco + brinquedo favorito",
  },
  {
    id: "vir",
    name: "Vir (Chamada)",
    category: "obediencia",
    difficulty: "intermediario",
    description:
      "Comando de chamada - o mais importante para segurança. Pode salvar a vida do seu cão em situações de risco.",
    icon: "Footprints",
    durationMin: 12,
    steps: [
      {
        title: "Começar curto",
        description:
          "A 2 metros do cão, com um ajudante segurando-o, mostre um petisco e diga o nome dele seguido de 'Vir'.",
        duration: 3,
      },
      {
        title: "Recompensar a chegada",
        description:
          "Quando o cão vier correndo, comemore bastante e dê vários petiscos. A chegada deve ser uma festa!",
        duration: 4,
      },
      {
        title: "Aumentar distância",
        description:
          "Aos poucos, aumente a distância. Pratique em locais fechados antes de ir para áreas abertas.",
        duration: 3,
      },
      {
        title: "Adicionar distrações",
        description:
          "Pratique com outras pessoas por perto, depois em parques. O cão deve vir mesmo com distrações.",
        duration: 2,
      },
    ],
    tips: [
      "NUNCA chame o cão para algo desagradável (banho, veterinário)",
      "Sempre recompense generosamente a vinda",
      "Se o cão não vier, não o persiga - vire-se e vá embora",
      "Pratique diariamente para manter a confiabilidade",
    ],
    reward: "Festa de petiscos + brincadeira de puxar",
  },
  {
    id: "junto",
    name: "Andar Junto",
    category: "obediencia",
    difficulty: "avancado",
    description:
      "Ensina o cão a caminhar sem puxar a guia. Torna os passeios prazerosos para ambos.",
    icon: "Footprints",
    durationMin: 20,
    steps: [
      {
        title: "Posição inicial",
        description:
          "Com o cão sentado à sua esquerda, segure a guia frouxa na mão direita. Petisco na mão esquerda.",
        duration: 3,
      },
      {
        title: "Iniciar caminhada",
        description:
          "Diga 'Junto' e comece a andar com o pé esquerdo. Mantenha o petisco próximo ao focinho do cão.",
        duration: 5,
      },
      {
        title: "Recompensar posição",
        description:
          "A cada 5 passos com o cão na posição correta, recompense. Se ele puxar, pare imediatamente.",
        duration: 7,
      },
      {
        title: "Mudança de direção",
        description:
          "Faça curvas e mudanças de ritmo para manter o cão atento à sua movimentação.",
        duration: 5,
      },
    ],
    tips: [
      "Se o cão puxar, pare ou mude de direção - nunca continue andando",
      "Use coleira peitoral para evitar lesões na traqueia",
      "Comece em ambientes sem distração",
      "Recompense frequentemente no início",
    ],
    reward: "Passeio mais longo com sniffs livres",
  },
  {
    id: "dar-pata",
    name: "Dar a Pata",
    category: "tricks",
    difficulty: "iniciante",
    description:
      "Truque clássico e simpático. Reforça a conexão com o dono e é ótimo para visitantes.",
    icon: "Hand",
    durationMin: 8,
    steps: [
      {
        title: "Esconder petisco",
        description:
          "Feche a mão com um petisco dentro e mostre ao cão. Ele tentará abrir sua mão.",
        duration: 2,
      },
      {
        title: "Esperar a pata",
        description:
          "Quando o cão usar a pata na sua mão, diga 'Dar a pata' e abra a mão entregando o petisco.",
        duration: 3,
      },
      {
        title: "Adicionar gesto",
        description:
          "Estenda a mão aberta e diga o comando. Gradualmente, reduza o petisco visível.",
        duration: 3,
      },
    ],
    tips: [
      "Sempre pegue a mesma pata para consistência inicial",
      "Mãos abertas e relaxadas facilitam o aprendizado",
      "Não force a pata do cão",
    ],
    reward: "Petisco + aplausos",
  },
  {
    id: "rolar",
    name: "Rolar",
    category: "tricks",
    difficulty: "intermediario",
    description:
      "Truque divertido que exige confiança do cão em deitar e expor a barriga.",
    icon: "RotateCw",
    durationMin: 15,
    steps: [
      {
        title: "Posicionar deitado",
        description: "Peça para o cão deitar. Este é o ponto de partida.",
        duration: 2,
      },
      {
        title: "Atrair o movimento",
        description:
          "Com um petisco, leve-o do focinho para a lateral e em direção ao ombro oposto, fazendo um movimento circular.",
        duration: 5,
      },
      {
        title: "Marcar o rolamento",
        description:
          "Quando o cão rolar, diga 'Rolar' e recompense generosamente.",
        duration: 5,
      },
      {
        title: "Refinar o comando",
        description: "Aos poucos, reduza o gesto até apenas o comando verbal.",
        duration: 3,
      },
    ],
    tips: [
      "Treine em piso macio (tapete ou grama)",
      "Cães com dor articular podem ter dificuldade",
      "Paciência - alguns cães demoram a confiar para expor a barriga",
    ],
    reward: "Petisco + brincadeira",
  },
  {
    id: "morto",
    name: "Fingir Morto",
    category: "tricks",
    difficulty: "avancado",
    description:
      "Truque teatral - o cão cai e fica imóvel como se estivesse 'morto'. Exige controle de impulso.",
    icon: "Drama",
    durationMin: 18,
    steps: [
      {
        title: "Deitar de lado",
        description: "Peça para o cão deitar. Atraia com petisco para que ele fique de lado.",
        duration: 4,
      },
      {
        title: "Marcar o 'Bang'",
        description:
          "Use a mão como arma (sinal de pistola) e diga 'Bang' ou 'Morto'. Recompense quando ele ficar imóvel de lado.",
        duration: 6,
      },
      {
        title: "Aumentar duração",
        description:
          "Aos poucos, espere mais tempo antes de recompensar. O cão deve permanecer 'morto' até o comando de liberação.",
        duration: 5,
      },
      {
        title: "Adicionar distância",
        description:
          "Aumente a distância do gesto. Pratique com diferentes posições do treinador.",
        duration: 3,
      },
    ],
    tips: [
      "Use piso confortável",
      "Ensine depois de 'Rolar' para facilitar",
      "Use comando de liberação claro ('Viva!' ou 'Ok')",
    ],
    reward: "Petisco + brincadeira favorita",
  },
  {
    id: "xixi-fora",
    name: "Fazer Necessidades no Lugar",
    category: "comportamento",
    difficulty: "iniciante",
    description:
      "Ensina o cão a fazer xixi e coco em local apropriado. Fundamental para a convivência doméstica.",
    icon: "MapPin",
    durationMin: 10,
    steps: [
      {
        title: "Definir o local",
        description:
          "Escolha um local fixo (jornal, tapete higiênico, quintal). Leve o cão lá após refeições, sono e brincadeiras.",
        duration: 3,
      },
      {
        title: "Esperar e recompensar",
        description:
          "Acompanhe o cão no local. Quando ele fizer as necessidades, comemore muito e dê petiscos.",
        duration: 4,
      },
      {
        title: "Comando verbal",
        description:
          "Adicione um comando como 'Faz xixi' ou 'Livre' enquanto ele estiver fazendo. Logo ele associará.",
        duration: 3,
      },
    ],
    tips: [
      "Nunca castigue o cão por fazer no lugar errado - apenas limpe sem comentários",
      "Leve o cão ao local a cada 2 horas no início",
      "Mantenha horários regulares de alimentação",
      "Use removedor de odor enzimático em acidentes",
    ],
    reward: "Petisco + brincadeira ao ar livre",
  },
  {
    id: "socializacao",
    name: "Socialização com Pessoas",
    category: "socializacao",
    difficulty: "iniciante",
    description:
      "Acostuma o cão com diferentes pessoas, evitando medo e agressividade. Crítico nas primeiras 16 semanas.",
    icon: "Users",
    durationMin: 15,
    steps: [
      {
        title: "Apresentação gradual",
        description:
          "Em ambiente calmo, apresente o cão a uma pessoa nova. Deixe-o aproximar por conta própria.",
        duration: 4,
      },
      {
        title: "Recompensar calma",
        description:
          "Quando o cão interagir calmamente, dê petiscos. A pessoa pode oferecer petiscos também.",
        duration: 5,
      },
      {
        title: "Diversificar estímulos",
        description:
          "Apresente pessoas com chapéus, óculos, barbas, crianças, idosos. Cada nova experiência enriquece o cão.",
        duration: 4,
      },
      {
        title: "Diversificar ambientes",
        description:
          "Pratique em diferentes locais - casa, parque, rua. Mantenha sempre o cão confortável.",
        duration: 2,
      },
    ],
    tips: [
      "Nunca force o cão a interagir - respeite o ritmo dele",
      "Observe linguagem corporal: cauda baixa = desconforto",
      "Quanto mais cedo socializar, melhor",
      "Use petiscos para criar associações positivas",
    ],
    reward: "Muitos petiscos + carinho",
  },
  {
    id: "latir-lugar",
    name: "Controlar Latidos",
    category: "comportamento",
    difficulty: "intermediario",
    description:
      "Ensina o cão a parar de latir quando solicitado. Útil para porteiros, campainha e visitantes.",
    icon: "Bell",
    durationMin: 12,
    steps: [
      {
        title: "Identificar o gatilho",
        description:
          "Observe o que faz o cão latir (campainha, outros cães). Tenha petiscos prontos.",
        duration: 3,
      },
      {
        title: "Comando 'Quieto'",
        description:
          "Quando o cão latir, espere uma pausa natural e diga 'Quieto'. Recompense imediatamente o silêncio.",
        duration: 5,
      },
      {
        title: "Aumentar tempo de silêncio",
        description:
          "Gradualmente, exija mais segundos de silêncio antes de recompensar.",
        duration: 3,
      },
      {
        title: "Comando de latir",
        description:
          "Ensine também 'Fala' para latir - assim você controla quando iniciar e parar.",
        duration: 1,
      },
    ],
    tips: [
      "Nunca grite com o cão - ele achará que você está latindo junto",
      "Identifique e evite gatilhos desnecessários no início",
      "Recompense o silêncio, não o latido",
      "Seja consistente - todos na casa devem usar o mesmo comando",
    ],
    reward: "Petisco + brincadeira calma",
  },
  {
    id: "buscar",
    name: "Buscar (Busca)",
    category: "tricks",
    difficulty: "intermediario",
    description:
      "Ensina o cão a buscar objetos e trazer de volta. Ótimo para exercício e conexão.",
    icon: "Tennis",
    durationMin: 15,
    steps: [
      {
        title: "Escolher brinquedo favorito",
        description:
          "Use uma bola ou brinquedo que o cão adore. Mostre e incentive o interesse.",
        duration: 2,
      },
      {
        title: "Arremesso curto",
        description:
          "Jogue o brinquedo a poucos metros. Anime o cão a buscar com voz empolgada.",
        duration: 4,
      },
      {
        title: "Trazer de volta",
        description:
          "Quando o cão pegar, chame pelo nome animadamente. Recompense quando trouxer.",
        duration: 5,
      },
      {
        title: "Comando 'Larga'",
        description:
          "Quando o cão chegar, ofereça petisco em troca do brinquedo. Diga 'Larga' no momento da troca.",
        duration: 4,
      },
    ],
    tips: [
      "Use dois brinquedos idênticos para iniciar",
      "Nunca persiga o cão se ele não trouxer",
      "Termine a brincadeira antes do cão se entediar",
      "Brinquedos que fazem barulho atraem mais",
    ],
    reward: "Continuar a brincadeira!",
  },
];

export const DAILY_TIPS: DailyTip[] = [
  {
    date: "1",
    title: "Recompensa imediata",
    content:
      "Recompense seu cão em até 2 segundos após o comportamento desejado. Após esse tempo, ele não associará a recompensa à ação.",
  },
  {
    date: "2",
    title: "Sessões curtas",
    content:
      "Treine 2 a 3 vezes ao dia por 5 a 10 minutos. Cães aprendem melhor em sessões curtas e divertidas.",
  },
  {
    date: "3",
    title: "Consistência é tudo",
    content:
      "Todos na família devem usar os mesmos comandos. Inconsistência confunde o cão e atrasa o aprendizado.",
  },
  {
    date: "4",
    title: "Reforço positivo",
    content:
      "Castigos não funcionam e prejudicam a relação. Foque em recompensar o comportamento correto e ignorar o indesejado.",
  },
  {
    date: "5",
    title: "Exercício antes do treino",
    content:
      "Um cão cansado é um cão focado. Faça uma caminhada ou brincadeira antes da sessão de treino.",
  },
  {
    date: "6",
    title: "Paciência e calma",
    content:
      "Se você se frustrar, pare o treino. Cães sentem a emoção do dono. Retome quando estiver relaxado.",
  },
  {
    date: "7",
    title: "Treine antes das refeições",
    content:
      "Cães com mais apetite aprendem melhor. Use parte da ração diária como recompensa durante os treinos.",
  },
];

export const BREEDS = [
  "Sem raça definida (SRD)",
  "Labrador",
  "Golden Retriever",
  "Pastor Alemão",
  "Poodle",
  "Bulldog Francês",
  "Beagle",
  "Rottweiler",
  "Yorkshire",
  "Shih Tzu",
  "Chihuahua",
  "Maltês",
  "Dachshund (Salsicha)",
  "Border Collie",
  "Australian Shepherd",
  "Pug",
  "Schnauzer",
  "Lhasa Apso",
  "Boxer",
  "Outra",
];

export const TRAITS = [
  "Brincalhão",
  "Calmo",
  "Energético",
  "Tímido",
  "Sociável",
  "Independente",
  "Protetor",
  "Carinhoso",
  "Desconfiado",
  "Curioso",
  "Obediente",
  "Teimoso",
];

export const DOG_EMOJIS = ["🐕", "🐶", "🦮", "🐕‍🦺", "🐩"];

export const GOALS = [
  "Aprender comandos básicos",
  "Parar de puxar na guia",
  "Fazer necessidades no lugar",
  "Não latir em excesso",
  "Socializar com outros cães",
  "Aprender truques",
  "Ficar calmo em visitas",
  "Viajar sem estresse",
];
