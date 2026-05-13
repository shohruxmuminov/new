export interface SpeakingTask {
  id: string;
  part: 1 | 2 | 3;
  topic: string;
  question: string;
  sampleAnswer?: string;
}

export interface SpeakingMockTest {
  id: string;
  title: string;
  duration: string;
  parts: (
    | { part: 1 | 3; duration: string; questions: string[] }
    | { part: 2; duration: string; cueCard: string }
  )[];
}

export interface CueCard {
  id: string;
  topic: string;
  prompt: string;
  bulletPoints: string[];
  sampleAnswer: string;
  followUpQuestions: string[];
}

export interface BandDescriptor {
  band: number;
  title: string;
  fluency: string;
  vocabulary: string;
  grammar: string;
  pronunciation: string;
}

export const speakingPart1: SpeakingTask[] = [
  { id: 'p1_1', part: 1, topic: 'Hometown', question: 'Where are you from?' },
  { id: 'p1_2', part: 1, topic: 'Hometown', question: 'Can you describe it?' },
  { id: 'p1_3', part: 1, topic: 'Hometown', question: 'What do you like most about it?' },
  { id: 'p1_4', part: 1, topic: 'Hometown', question: 'Has it changed much since you were a child?' },
  { id: 'p1_5', part: 1, topic: 'Accommodation', question: 'Do you live in a house or an apartment?' },
  { id: 'p1_6', part: 1, topic: 'Accommodation', question: 'Describe your home.' },
  { id: 'p1_7', part: 1, topic: 'Accommodation', question: 'What’s your favorite room?' },
  { id: 'p1_8', part: 1, topic: 'Accommodation', question: 'How long have you lived there?' },
  { id: 'p1_9', part: 1, topic: 'Work/Study', question: 'Do you work or are you a student?' },
  { id: 'p1_10', part: 1, topic: 'Work/Study', question: 'Why did you choose this job/subject?' },
  { id: 'p1_11', part: 1, topic: 'Work/Study', question: 'Is it difficult?' },
  { id: 'p1_12', part: 1, topic: 'Work/Study', question: 'What do you like most about it?' },
  { id: 'p1_13', part: 1, topic: 'Family', question: 'How often do you see your family?' },
  { id: 'p1_14', part: 1, topic: 'Family', question: 'Who are you closest to?' },
  { id: 'p1_15', part: 1, topic: 'Family', question: 'What do you usually do together?' },
  { id: 'p1_16', part: 1, topic: 'Family', question: 'Do you have a large family?' },
  { id: 'p1_17', part: 1, topic: 'Art', question: 'Do you like art?' },
  { id: 'p1_18', part: 1, topic: 'Art', question: 'Have you ever visited an art gallery?' },
  { id: 'p1_19', part: 1, topic: 'Art', question: 'Did you learn art at school?' },
  { id: 'p1_20', part: 1, topic: 'Art', question: 'Is art popular in your country?' },
  { id: 'p1_21', part: 1, topic: 'Bicycles', question: 'Do you like riding a bike?' },
  { id: 'p1_22', part: 1, topic: 'Bicycles', question: 'How popular are bikes in your country?' },
  { id: 'p1_23', part: 1, topic: 'Bicycles', question: 'Is it safe to cycle in your city?' },
  { id: 'p1_24', part: 1, topic: 'Bicycles', question: 'When was the last time you rode a bike?' },
  { id: 'p1_25', part: 1, topic: 'Birthdays', question: 'How do you usually celebrate your birthday?' },
  { id: 'p1_26', part: 1, topic: 'Birthdays', question: 'What did you do for your last birthday?' },
  { id: 'p1_27', part: 1, topic: 'Birthdays', question: 'Which birthdays are most important in your culture?' },
  { id: 'p1_28', part: 1, topic: 'Birthdays', question: 'Do you prefer small or big birthday parties?' },
  { id: 'p1_29', part: 1, topic: 'Books', question: 'Do you like reading?' },
  { id: 'p1_30', part: 1, topic: 'Books', question: 'What kind of books do you prefer?' },
  { id: 'p1_31', part: 1, topic: 'Books', question: 'Is reading popular in your country?' },
  { id: 'p1_32', part: 1, topic: 'Books', question: 'Do you prefer paper books or e-books?' },
  { id: 'p1_33', part: 1, topic: 'Childhood', question: 'Where did you grow up?' },
  { id: 'p1_34', part: 1, topic: 'Childhood', question: 'What was your favorite toy?' },
  { id: 'p1_35', part: 1, topic: 'Childhood', question: 'Who was your best friend?' },
  { id: 'p1_36', part: 1, topic: 'Childhood', question: 'What was your favorite subject at school?' },
  { id: 'p1_37', part: 1, topic: 'Clothes', question: 'What kind of clothes do you like?' },
  { id: 'p1_38', part: 1, topic: 'Clothes', question: 'Do you prefer comfortable or fashionable clothes?' },
  { id: 'p1_39', part: 1, topic: 'Clothes', question: 'Where do you usually buy your clothes?' },
  { id: 'p1_40', part: 1, topic: 'Clothes', question: 'Do you wear different clothes for work and weekends?' },
  { id: 'p1_41', part: 1, topic: 'Computers', question: 'How often do you use a computer?' },
  { id: 'p1_42', part: 1, topic: 'Computers', question: 'Is it important for your work/study?' },
  { id: 'p1_43', part: 1, topic: 'Computers', question: 'What do you mostly use it for?' },
  { id: 'p1_44', part: 1, topic: 'Computers', question: 'How did you learn to use a computer?' },
  { id: 'p1_45', part: 1, topic: 'Chocolate', question: 'Do you like chocolate?' },
  { id: 'p1_46', part: 1, topic: 'Chocolate', question: 'Why do people give chocolate as a gift?' },
  { id: 'p1_47', part: 1, topic: 'Chocolate', question: 'Is it popular in your country?' },
  { id: 'p1_48', part: 1, topic: 'Chocolate', question: 'Did you like chocolate as a child?' },
  { id: 'p1_49', part: 1, topic: 'Daily Routine', question: 'Describe your typical day.' },
  { id: 'p1_50', part: 1, topic: 'Daily Routine', question: 'What’s your favorite part of the day?' },
  { id: 'p1_51', part: 1, topic: 'Daily Routine', question: 'Do you prefer mornings or evenings?' },
  { id: 'p1_52', part: 1, topic: 'Daily Routine', question: 'Have you changed your routine recently?' },
  { id: 'p1_53', part: 1, topic: 'Flowers', question: 'Do you like flowers?' },
  { id: 'p1_54', part: 1, topic: 'Flowers', question: 'What kind of flowers are popular in your country?' },
  { id: 'p1_55', part: 1, topic: 'Flowers', question: 'When do people give flowers?' },
  { id: 'p1_56', part: 1, topic: 'Flowers', question: 'Do you have flowers in your home?' },
  { id: 'p1_57', part: 1, topic: 'Food', question: 'What’s your favorite food?' },
  { id: 'p1_58', part: 1, topic: 'Food', question: 'Do you prefer eating at home or at a restaurant?' },
  { id: 'p1_59', part: 1, topic: 'Food', question: 'What is a traditional dish from your country?' },
  { id: 'p1_60', part: 1, topic: 'Food', question: 'Do you enjoy cooking?' },
  { id: 'p1_61', part: 1, topic: 'Going Out', question: 'How often do you go out with friends?' },
  { id: 'p1_62', part: 1, topic: 'Going Out', question: 'Where do you usually go?' },
  { id: 'p1_63', part: 1, topic: 'Going Out', question: 'Do you prefer going out in the daytime or at night?' },
  { id: 'p1_64', part: 1, topic: 'Going Out', question: 'What did you do last time you went out?' },
  { id: 'p1_65', part: 1, topic: 'Happiness', question: 'What makes you happy?' },
  { id: 'p1_66', part: 1, topic: 'Happiness', question: 'Do you think money can buy happiness?' },
  { id: 'p1_67', part: 1, topic: 'Happiness', question: 'Is happiness important for health?' },
  { id: 'p1_68', part: 1, topic: 'Happiness', question: 'What made you happy recently?' },
  { id: 'p1_69', part: 1, topic: 'Hobbies', question: 'What are your hobbies?' },
  { id: 'p1_70', part: 1, topic: 'Hobbies', question: 'Why do you enjoy them?' },
  { id: 'p1_71', part: 1, topic: 'Hobbies', question: 'How much time do you spend on them?' },
  { id: 'p1_72', part: 1, topic: 'Hobbies', question: 'Did you have different hobbies as a child?' },
  { id: 'p1_73', part: 1, topic: 'Movies', question: 'Do you like watching movies?' },
  { id: 'p1_74', part: 1, topic: 'Movies', question: 'What’s your favorite genre?' },
  { id: 'p1_75', part: 1, topic: 'Movies', question: 'Do you prefer the cinema or TV?' },
  { id: 'p1_76', part: 1, topic: 'Movies', question: 'Who is your favorite actor?' },
  { id: 'p1_77', part: 1, topic: 'Music', question: 'What kind of music do you like?' },
  { id: 'p1_78', part: 1, topic: 'Music', question: 'Can you play an instrument?' },
  { id: 'p1_79', part: 1, topic: 'Music', question: 'Is music important to you?' },
  { id: 'p1_80', part: 1, topic: 'Music', question: 'Do you prefer live music or recordings?' },
  { id: 'p1_81', part: 1, topic: 'Neighbours', question: 'Do you know your neighbours?' },
  { id: 'p1_82', part: 1, topic: 'Neighbours', question: 'Do you think it’s important to be friendly with them?' },
  { id: 'p1_83', part: 1, topic: 'Neighbours', question: 'How often do you talk to them?' },
  { id: 'p1_84', part: 1, topic: 'Neighbours', question: 'Have you ever had a problem with a neighbour?' },
  { id: 'p1_85', part: 1, topic: 'Newspapers', question: 'Do you read the news?' },
  { id: 'p1_86', part: 1, topic: 'Newspapers', question: 'Do you prefer newspapers or online news?' },
  { id: 'p1_87', part: 1, topic: 'Newspapers', question: 'Which section of the news do you usually read?' },
  { id: 'p1_88', part: 1, topic: 'Newspapers', question: 'Is it important to stay informed?' },
  { id: 'p1_89', part: 1, topic: 'Pets', question: 'Do you have a pet?' },
  { id: 'p1_90', part: 1, topic: 'Pets', question: 'Why do people keep pets?' },
  { id: 'p1_91', part: 1, topic: 'Pets', question: 'What animals are popular as pets in your country?' },
  { id: 'p1_92', part: 1, topic: 'Pets', question: 'Did you have a pet as a child?' },
  { id: 'p1_93', part: 1, topic: 'Reading', question: 'How often do you read?' },
  { id: 'p1_94', part: 1, topic: 'Reading', question: 'What was the last book you read?' },
  { id: 'p1_95', part: 1, topic: 'Reading', question: 'Do you like reading in a library?' },
  { id: 'p1_96', part: 1, topic: 'Reading', question: 'Is reading a good hobby?' },
  { id: 'p1_97', part: 1, topic: 'TV', question: 'How much TV do you watch?' },
  { id: 'p1_98', part: 1, topic: 'TV', question: 'What are your favorite programs?' },
  { id: 'p1_99', part: 1, topic: 'TV', question: 'Is TV educational?' },
  { id: 'p1_100', part: 1, topic: 'TV', question: 'Has the way you watch TV changed?' },
  { id: 'p1_101', part: 1, topic: 'Technology', question: 'What piece of technology is most important to you?' },
  { id: 'p1_102', part: 1, topic: 'Technology', question: 'How has it changed your life?' },
  { id: 'p1_103', part: 1, topic: 'Technology', question: 'Do you enjoy learning about new gadgets?' },
  { id: 'p1_104', part: 1, topic: 'Technology', question: 'Is technology always a good thing?' },
  { id: 'p1_105', part: 1, topic: 'Transportation', question: 'How do you usually travel?' },
  { id: 'p1_106', part: 1, topic: 'Transportation', question: 'Is public transport good in your city?' },
  { id: 'p1_107', part: 1, topic: 'Transportation', question: 'What is your favorite way to travel?' },
  { id: 'p1_108', part: 1, topic: 'Transportation', question: 'Have you ever been stuck in traffic?' },
  { id: 'p1_109', part: 1, topic: 'Travel', question: 'Do you like traveling?' },
  { id: 'p1_110', part: 1, topic: 'Travel', question: 'Where have you been recently?' },
  { id: 'p1_111', part: 1, topic: 'Travel', question: 'Where would you like to go next?' },
  { id: 'p1_112', part: 1, topic: 'Travel', question: 'Do you prefer traveling alone or in a group?' },
  { id: 'p1_113', part: 1, topic: 'Shopping', question: 'Do you like shopping?' },
  { id: 'p1_114', part: 1, topic: 'Shopping', question: 'Do you prefer small shops or big malls?' },
  { id: 'p1_115', part: 1, topic: 'Shopping', question: 'What was the last thing you bought?' },
  { id: 'p1_116', part: 1, topic: 'Shopping', question: 'Do you like online shopping?' },
  { id: 'p1_117', part: 1, topic: 'Sports', question: 'Do you play any sports?' },
  { id: 'p1_118', part: 1, topic: 'Sports', question: 'What sports are popular in your country?' },
  { id: 'p1_119', part: 1, topic: 'Sports', question: 'Do you prefer team sports or individual sports?' },
  { id: 'p1_120', part: 1, topic: 'Sports', question: 'Have you ever won a sports competition?' },
  { id: 'p1_121', part: 1, topic: 'Weather', question: 'What’s the weather like today?' },
  { id: 'p1_122', part: 1, topic: 'Weather', question: 'What’s your favorite season?' },
  { id: 'p1_123', part: 1, topic: 'Weather', question: 'Does the weather affect your mood?' },
  { id: 'p1_124', part: 1, topic: 'Weather', question: 'Is the weather in your country changing?' },
  { id: 'p1_125', part: 1, topic: 'Desserts', question: 'Do you like sweets/desserts?' },
  { id: 'p1_126', part: 1, topic: 'Desserts', question: 'What is a traditional dessert in your country?' },
  { id: 'p1_127', part: 1, topic: 'Desserts', question: 'When do people usually eat desserts?' },
  { id: 'p1_128', part: 1, topic: 'Desserts', question: 'Can you make any desserts?' },
  { id: 'p1_129', part: 1, topic: 'Laughter', question: 'Do you like making people laugh?' },
  { id: 'p1_130', part: 1, topic: 'Laughter', question: 'What makes you laugh?' },
  { id: 'p1_131', part: 1, topic: 'Laughter', question: 'Is laughter important?' },
  { id: 'p1_132', part: 1, topic: 'Laughter', question: 'When was the last time you laughed a lot?' },
  { id: 'p1_133', part: 1, topic: 'Pens/Pencils', question: 'Do you prefer using a pen or a pencil?' },
  { id: 'p1_134', part: 1, topic: 'Pens/Pencils', question: 'When was the last time you bought one?' },
  { id: 'p1_135', part: 1, topic: 'Pens/Pencils', question: 'Do you use them for work or study?' },
  { id: 'p1_136', part: 1, topic: 'Pens/Pencils', question: 'Is handwriting still important?' },
  { id: 'p1_137', part: 1, topic: 'Scenery', question: 'Do you like looking at beautiful scenery?' },
  { id: 'p1_138', part: 1, topic: 'Scenery', question: 'Where is the most scenic place you\'ve been?' },
  { id: 'p1_139', part: 1, topic: 'Scenery', question: 'Do you like taking photos of scenery?' },
  { id: 'p1_140', part: 1, topic: 'Scenery', question: 'Is there much nature near your home?' },
  { id: 'p1_141', part: 1, topic: 'Museums', question: 'Do you like visiting museums?' },
  { id: 'p1_142', part: 1, topic: 'Museums', question: 'Are they important for education?' },
  { id: 'p1_143', part: 1, topic: 'Museums', question: 'What was the last museum you visited?' },
  { id: 'p1_144', part: 1, topic: 'Museums', question: 'Should museums be free?' },
  { id: 'p1_145', part: 1, topic: 'Numbers', question: 'Are you good at remembering numbers?' },
  { id: 'p1_146', part: 1, topic: 'Numbers', question: 'Do you have a favorite number?' },
  { id: 'p1_147', part: 1, topic: 'Numbers', question: 'Are you good at math?' },
  { id: 'p1_148', part: 1, topic: 'Numbers', question: 'When do you need to use numbers in daily life?' },
  { id: 'p1_149', part: 1, topic: 'History', question: 'Did you like history at school?' },
  { id: 'p1_150', part: 1, topic: 'History', question: 'Is it important to learn about the past?' },
  { id: 'p1_151', part: 1, topic: 'History', question: 'Which historical period interests you?' },
  { id: 'p1_152', part: 1, topic: 'History', question: 'Have you ever visited a historic site?' },
  { id: 'p1_153', part: 1, topic: 'Breaks', question: 'How often do you take breaks during work/study?' },
  { id: 'p1_154', part: 1, topic: 'Breaks', question: 'What do you do during breaks?' },
  { id: 'p1_155', part: 1, topic: 'Breaks', question: 'Are breaks important for productivity?' },
  { id: 'p1_156', part: 1, topic: 'Breaks', question: 'How long should a break be?' },
  { id: 'p1_157', part: 1, topic: 'Social Media', question: 'Which social media platforms do you use?' },
  { id: 'p1_158', part: 1, topic: 'Social Media', question: 'Is it a good way to keep in touch?' },
  { id: 'p1_159', part: 1, topic: 'Social Media', question: 'How much time do you spend on social media?' },
  { id: 'p1_160', part: 1, topic: 'Social Media', question: 'Are there any downsides to social media?' },
  { id: 'p1_161', part: 1, topic: 'Perfume', question: 'Do you like wearing perfume?' },
  { id: 'p1_162', part: 1, topic: 'Perfume', question: 'Do you give it as a gift?' },
  { id: 'p1_163', part: 1, topic: 'Perfume', question: 'Is it expensive in your country?' },
  { id: 'p1_164', part: 1, topic: 'Perfume', question: 'What kind of scents do you like?' },
  { id: 'p1_165', part: 1, topic: 'Borrowing', question: 'Have you ever borrowed something important?' },
  { id: 'p1_166', part: 1, topic: 'Borrowing', question: 'Is it okay to borrow money from friends?' },
  { id: 'p1_167', part: 1, topic: 'Borrowing', question: 'What should you do if you lose something you borrowed?' },
  { id: 'p1_168', part: 1, topic: 'Borrowing', question: 'Do you like lending things to others?' },
  { id: 'p1_169', part: 1, topic: 'Markets', question: 'Do you like going to street markets?' },
  { id: 'p1_170', part: 1, topic: 'Markets', question: 'What can you buy there?' },
  { id: 'p1_171', part: 1, topic: 'Markets', question: 'Are markets better than supermarkets?' },
  { id: 'p1_172', part: 1, topic: 'Markets', question: 'How often do you go to a market?' },
  { id: 'p1_173', part: 1, topic: 'Visiting Friends', question: 'How often do you visit your friends\' homes?' },
  { id: 'p1_174', part: 1, topic: 'Visiting Friends', question: 'What do you usually do when you visit?' },
  { id: 'p1_175', part: 1, topic: 'Visiting Friends', question: 'Do you prefer hosting or visiting?' },
  { id: 'p1_176', part: 1, topic: 'Visiting Friends', question: 'Is it common to visit without an invitation?' },
  { id: 'p1_177', part: 1, topic: 'Smile', question: 'Do you smile often?' },
  { id: 'p1_178', part: 1, topic: 'Smile', question: 'When was the last time you saw someone smiling?' },
  { id: 'p1_179', part: 1, topic: 'Smile', question: 'Is a smile important when meeting new people?' },
  { id: 'p1_180', part: 1, topic: 'Smile', question: 'What makes you smile?' },
  { id: 'p1_181', part: 1, topic: 'Time Management', question: 'Are you good at managing your time?' },
  { id: 'p1_182', part: 1, topic: 'Time Management', question: 'Do you use a planner or app?' },
  { id: 'p1_183', part: 1, topic: 'Time Management', question: 'What do you do if you are running late?' },
  { id: 'p1_184', part: 1, topic: 'Time Management', question: 'Is it important to be punctual?' },
  { id: 'p1_185', part: 1, topic: 'Garbage', question: 'Is there a lot of litter in your area?' },
  { id: 'p1_186', part: 1, topic: 'Garbage', question: 'How can we reduce waste?' },
  { id: 'p1_187', part: 1, topic: 'Garbage', question: 'Do you recycle at home?' },
  { id: 'p1_188', part: 1, topic: 'Garbage', question: 'What happens to garbage in your city?' },
  { id: 'p1_189', part: 1, topic: 'Places to Play', question: 'Where did you play as a child?' },
  { id: 'p1_190', part: 1, topic: 'Places to Play', question: 'Are there enough parks for children today?' },
  { id: 'p1_191', part: 1, topic: 'Places to Play', question: 'Do you think children should play outdoors more?' },
  { id: 'p1_192', part: 1, topic: 'Places to Play', question: 'What was your favorite playground?' },
  { id: 'p1_193', part: 1, topic: 'Dreams', question: 'Do you often remember your dreams?' },
  { id: 'p1_194', part: 1, topic: 'Dreams', question: 'Do you think they have meanings?' },
  { id: 'p1_195', part: 1, topic: 'Dreams', question: 'Do you ever have recurring dreams?' },
  { id: 'p1_196', part: 1, topic: 'Dreams', question: 'Do you like talking about your dreams?' },
  { id: 'p1_197', part: 1, topic: 'Science', question: 'Did you like science at school?' },
  { id: 'p1_198', part: 1, topic: 'Science', question: 'Which branch (Biology/Physics/Chemistry) do you prefer?' },
  { id: 'p1_199', part: 1, topic: 'Science', question: 'Is science important in our daily lives?' },
  { id: 'p1_200', part: 1, topic: 'Science', question: 'Have you ever visited a science museum?' }
];

export const cueCards: CueCard[] = [
  {
    id: 'cc_1',
    topic: 'A House or Apartment You’d Like to Live In',
    prompt: 'Describe a house or apartment you would like to live in.',
    bulletPoints: ["Where it is","What it looks like","Who you would live with","And explain why you would like to live there."],
    sampleAnswer: '',
    followUpQuestions: ["Is it common to buy or rent in your country?","How do housing costs affect young people?","What are the advantages of living in a house vs an apartment?","How has architecture changed in your country?","Do you think people will live in different types of homes in the future?","Is it better to live in the city or the countryside?"]
  },
  {
    id: 'cc_2',
    topic: 'An Interesting Animal',
    prompt: 'Describe an interesting animal you have seen.',
    bulletPoints: ["What it is","Where you saw it","What it looks like","And explain why you find it interesting."],
    sampleAnswer: '',
    followUpQuestions: ["Why do people keep pets?","Should we protect endangered species?","Is it ethical to keep animals in zoos?","How has the relationship between humans and animals changed?","What can we learn from animals?","Do you think animal research is necessary?"]
  },
  {
    id: 'cc_3',
    topic: 'A Successful Small Business',
    prompt: 'Describe a successful small business you know.',
    bulletPoints: ["What it is","Who the owner is","What it sells or provides","And explain why you think it is successful."],
    sampleAnswer: '',
    followUpQuestions: ["What qualities make a good leader?","How does technology help small businesses?","Is it better to start your own business or work for someone else?","What challenges do small businesses face today?","Why do some small businesses fail?","How can the government support local entrepreneurs?"]
  },
  {
    id: 'cc_4',
    topic: 'A Crowded Place',
    prompt: 'Describe a crowded place you have visited.',
    bulletPoints: ["Where it is","When you went there","Why it was crowded","And explain how you felt about being there."],
    sampleAnswer: '',
    followUpQuestions: ["Why do some people enjoy being in crowds?","How can urban planning reduce overcrowding?","What are the problems of living in a big city?","Do you think festivals should be held in crowded areas?","Is noise pollution a major issue in cities?","How has the pandemic changed our view of crowded places?"]
  },
  {
    id: 'cc_5',
    topic: 'A Family Member You Spend Time With',
    prompt: 'Describe a family member you spend a lot of time with.',
    bulletPoints: ["Who they are","What you usually do together","What kind of person they are","And explain why you spend so much time with them."],
    sampleAnswer: '',
    followUpQuestions: ["What are the advantages of strong family relationships?","How many generations usually live under one roof in your country?","What are the benefits and drawbacks of multi-generational living?","Do both parents have equal responsibilities in childcare?","How has the role of grandparents changed?","Is it better to have a large family or a small one?"]
  },
  {
    id: 'cc_6',
    topic: 'A Person Often in the News',
    prompt: 'Describe a person who is often in the news and you would like to meet.',
    bulletPoints: ["Who they are","Why they are in the news","What they have achieved","And explain why you would like to meet them."],
    sampleAnswer: '',
    followUpQuestions: ["What is the difference between new media and old media?","Can we trust the news we read online?","Is it necessary for people to watch foreign news?","How has social media changed how we consume news?","What kinds of people are usually in the news?","Should the private lives of celebrities be public?"]
  },
  {
    id: 'cc_7',
    topic: 'A Change That Could Improve Your Local Area',
    prompt: 'Describe a change that could improve your local area.',
    bulletPoints: ["What the change would be","How this change could be made","What problems are causing the need for this change","And explain how this change would improve your local area."],
    sampleAnswer: '',
    followUpQuestions: ["Why do some people dislike change?","Is it important for people to socialize with their neighbors?","How can communities work together on local projects?","What role should the government play in local improvements?","How has your neighborhood changed in the last 10 years?","What makes a neighborhood a good place to live?"]
  },
  {
    id: 'cc_8',
    topic: 'A Performance You Enjoyed',
    prompt: 'Describe a performance you enjoyed watching (e.g., a play, concert, or dance).',
    bulletPoints: ["What the performance was","When and where you watched it","Who was performing","And explain why you enjoyed it."],
    sampleAnswer: '',
    followUpQuestions: ["Do you think traditional performances are still important?","What is the difference between watching a live performance and one on TV?","How can performances influence children?","Should the government fund the arts?","Why are some types of music more popular than others?","How has technology changed the entertainment industry?"]
  },
  {
    id: 'cc_9',
    topic: 'An Important Text Message',
    prompt: 'Describe an important text message you received.',
    bulletPoints: ["Who sent it","What was in the message","Why the person sent the message","And explain why the message was important to you."],
    sampleAnswer: '',
    followUpQuestions: ["Why do some people prefer texting over calling?","How has technology changed how we communicate?","Can written words be easily misunderstood?","Is it appropriate to use text messages for formal communication?","Do you think we depend too much on our phones?","What are the downsides of digital communication?"]
  },
  {
    id: 'cc_10',
    topic: 'A Uniform You Have Worn',
    prompt: 'Describe a uniform you have worn (e.g., for school or work).',
    bulletPoints: ["What it looked like","When you wore it","How you felt about wearing it","And explain why you had to wear it."],
    sampleAnswer: '',
    followUpQuestions: ["What are the pros and cons of school uniforms?","Do clothes reflect a person's personality?","Should employees in all jobs wear uniforms?","How do uniforms affect team spirit?","Do you think fashion is important in the workplace?","Why do some professions have very distinct uniforms?"]
  },
  {
    id: 'cc_11',
    topic: 'A Time Someone Apologized to You',
    prompt: 'Describe a time someone apologized to you.',
    bulletPoints: ["Who apologized","Why they apologized","How you felt about it","And explain why the apology was important."],
    sampleAnswer: '',
    followUpQuestions: ["Why is it important to apologize when you make a mistake?","Are there cultural differences in how people say sorry?","Is it easier to apologize in person or in writing?","Can an apology fix a broken relationship?","Why do some people find it hard to apologize?","When is an apology not enough?"]
  },
  {
    id: 'cc_12',
    topic: 'An Article About Health',
    prompt: 'Describe an article about health you read recently.',
    bulletPoints: ["Where you read it","What it was about","What you learned from it","And explain why it was interesting."],
    sampleAnswer: '',
    followUpQuestions: ["How can people stay healthy in a busy world?","Is diet or exercise more important for health?","Should schools have mandatory fitness programs?","How does the media influence our health choices?","Why is mental health becoming a bigger topic today?","What role does the government play in public health?"]
  },
  {
    id: 'cc_13',
    topic: 'A Trip by Public Transport',
    prompt: 'Describe a trip you took by public transport.',
    bulletPoints: ["Where you went","What type of transport you used","Who you went with","And explain how you felt about the journey."],
    sampleAnswer: '',
    followUpQuestions: ["How can traffic jams be reduced in big cities?","Is public transport affordable in your country?","What are the environmental benefits of using public transport?","How has the transport system changed in recent years?","Should city centers be car-free?","What is the future of transport?"]
  },
  {
    id: 'cc_14',
    topic: 'A Challenging Thing You Did',
    prompt: 'Describe a challenging thing you did.',
    bulletPoints: ["What it was","How you handled it","Why it was challenging","And explain how you felt after doing it."],
    sampleAnswer: '',
    followUpQuestions: ["What are the common challenges for young people today?","Is it better to seek help or work alone when facing a challenge?","How can challenges help people grow?","Why do some people enjoy taking risks?","What role does resilience play in success?","How can parents help children face challenges?"]
  },
  {
    id: 'cc_15',
    topic: 'A Person Who Taught You Something Important',
    prompt: 'Describe a person who taught you something important.',
    bulletPoints: ["Who they were","What they taught you","How they taught you","And explain why what you learned was important."],
    sampleAnswer: '',
    followUpQuestions: ["What are the best methods for teaching children?","Who has more influence on a child: parents or teachers?","How has technology changed the way we learn?","Is lifelong learning important in the modern world?","Should practical skills be taught more in schools?","What makes someone a great teacher?"]
  },
  {
    id: 'cc_16',
    topic: 'A Member of a Team',
    prompt: 'Describe a member of a team you worked with.',
    bulletPoints: ["Who they were","What their role was","Why you liked working with them","And explain what you achieved as a team."],
    sampleAnswer: '',
    followUpQuestions: ["Why is cooperation important in a team?","How should teams handle disagreements?","Is it better to have a strong leader or a democratic team?","What are the benefits of team sports for children?","How has remote work changed teamwork?","What qualities make a good team player?"]
  },
  {
    id: 'cc_17',
    topic: 'A Job You Would Not Like to Do',
    prompt: 'Describe a job you would not like to do.',
    bulletPoints: ["What the job is","What the responsibilities are","Why you wouldn't like it","And explain what kind of job you prefer instead."],
    sampleAnswer: '',
    followUpQuestions: ["How will AI change the future of work?","Is salary or job satisfaction more important?","Why do some people change careers many times?","Should people move to other cities for better jobs?","What are the most respected jobs in your country?","How can work-life balance be achieved?"]
  },
  {
    id: 'cc_18',
    topic: 'Something Exciting You Did',
    prompt: 'Describe something exciting you did.',
    bulletPoints: ["What it was","Where you did it","Who you were with","And explain why it was exciting."],
    sampleAnswer: '',
    followUpQuestions: ["How do people celebrate festivals in your country?","Are parties becoming too expensive nowadays?","What is the difference between traditional and modern celebrations?","Why is it important to have exciting experiences?","Do you think young people need more excitement than older people?","How can we make daily life more exciting?"]
  },
  {
    id: 'cc_19',
    topic: 'A Time You Couldn’t Use Your Phone',
    prompt: 'Describe a time you couldn’t use your mobile phone.',
    bulletPoints: ["When and where it happened","Why you couldn't use it","What you did instead","And explain how you felt about not having your phone."],
    sampleAnswer: '',
    followUpQuestions: ["Should there be rules about phone use in public places?","At what age should children get their first phone?","Are we becoming too dependent on technology?","What are the benefits of a 'digital detox'?","How has the mobile phone changed social interactions?","Should phones be banned in classrooms?"]
  },
  {
    id: 'cc_20',
    topic: 'Weather That Prevented an Activity',
    prompt: 'Describe a time when weather prevented you from doing something.',
    bulletPoints: ["What you planned to do","What the weather was like","Where you were","And explain how you felt about the situation."],
    sampleAnswer: '',
    followUpQuestions: ["How reliable are weather forecasts in your country?","Is the weather a common topic of conversation?","How do different seasons affect people's jobs?","Do you think climate change is making weather more unpredictable?","What is your favorite type of weather?","How does weather affect tourism?"]
  },
  {
    id: 'cc_21',
    topic: 'Something Difficult to Use',
    prompt: 'Describe something you found difficult to use (e.g., a gadget or software).',
    bulletPoints: ["What it was","Why it was difficult","How you eventually used it","And explain what you learned from the experience."],
    sampleAnswer: '',
    followUpQuestions: ["Why do some companies make products that are hard to use?","How can older people be helped with new technology?","Should products always come with detailed manuals?","Does advertising often mislead consumers about ease of use?","How has user interface design improved over the years?","Do you think we buy too many gadgets?"]
  },
  {
    id: 'cc_22',
    topic: 'A Piece of Art You Like',
    prompt: 'Describe a piece of art you like (e.g., a painting or sculpture).',
    bulletPoints: ["What it is","Where you saw it","What it looks like","And explain why you like it."],
    sampleAnswer: '',
    followUpQuestions: ["Should art be a mandatory subject in schools?","What is the value of museums to society?","How does art reflect a country's culture?","Is digital art as valuable as traditional art?","Why do some people pay millions for a painting?","How can art improve our daily lives?"]
  },
  {
    id: 'cc_23',
    topic: 'A Historic Building',
    prompt: 'Describe a historic building you have visited.',
    bulletPoints: ["Where it is","What it looks like","What you learned about its history","And explain why you think it is important."],
    sampleAnswer: '',
    followUpQuestions: ["Why should we preserve old buildings?","Is modern architecture better than traditional architecture?","How do historic buildings attract tourists?","Should the government or private owners pay for building restoration?","Can a building tell us about the history of a city?","Do you prefer living in an old or new building?"]
  },
  {
    id: 'cc_24',
    topic: 'A Favorite Book from Childhood',
    prompt: 'Describe a favorite book from your childhood.',
    bulletPoints: ["What the book was","What the story was about","Why you liked it","And explain how it influenced you."],
    sampleAnswer: '',
    followUpQuestions: ["Why is it important for children to read books?","Do you think e-books will replace paper books for children?","How can parents encourage their children to read?","Should schools focus more on classic literature or modern books?","What are the benefits of storytelling?","How has children's literature changed over time?"]
  },
  {
    id: 'cc_25',
    topic: 'A Small Business You Admire',
    prompt: 'Describe a small business you admire in your hometown.',
    bulletPoints: ["What it is","What it sells","Why you admire it","And explain how it helps the local community."],
    sampleAnswer: '',
    followUpQuestions: ["What are the advantages of local businesses over large corporations?","How can small businesses compete with online giants?","What marketing strategies are most effective for small businesses?","Is it better to buy local products?","How do small businesses impact the local economy?","What makes a small business successful?"]
  },
  {
    id: 'cc_26',
    topic: 'A Charity You Support',
    prompt: 'Describe a charity or organization you support.',
    bulletPoints: ["What they do","How you found out about them","Why you support them","And explain how they make a difference."],
    sampleAnswer: '',
    followUpQuestions: ["What is the role of volunteering in society?","Should the government provide more aid to other countries?","Are large charities more effective than small ones?","How can we encourage more people to donate to charity?","Should famous people use their platform for charity?","Is it better to give money or time?"]
  },
  {
    id: 'cc_27',
    topic: 'A Traditional Piece of Clothing',
    prompt: 'Describe a traditional piece of clothing from your country.',
    bulletPoints: ["What it looks like","When it is worn","What it is made of","And explain why it is important to your culture."],
    sampleAnswer: '',
    followUpQuestions: ["Is traditional clothing still popular in your country?","How has global fashion influenced local styles?","Should people wear traditional clothes for special occasions?","Do you think fashion is becoming too uniform across the world?","What does clothing tell us about a person's status?","Is it important to preserve traditional crafts like weaving?"]
  },
  {
    id: 'cc_28',
    topic: 'An Important Conversation',
    prompt: 'Describe an important conversation you had with someone.',
    bulletPoints: ["Who you talked to","What the conversation was about","When it happened","And explain why it was important."],
    sampleAnswer: '',
    followUpQuestions: ["How has the way people communicate changed across generations?","What are the most important skills for a good listener?","Is it better to have important conversations in person or online?","How can we avoid misunderstandings in communication?","Why do some people find it hard to express their feelings?","What role does body language play in a conversation?"]
  },
  {
    id: 'cc_29',
    topic: 'A Law You Think is Good',
    prompt: 'Describe a law you think is good for your country.',
    bulletPoints: ["What the law is","Why it was created","How it affects people","And explain why you support it."],
    sampleAnswer: '',
    followUpQuestions: ["What is the primary purpose of laws in society?","How can crime be prevented effectively?","Are some laws outdated and need to be changed?","Should there be more international laws?","How do laws protect the rights of individuals?","Is it important for everyone to know the law?"]
  },
  {
    id: 'cc_30',
    topic: 'Your Daily Routine During Lockdown/Holiday',
    prompt: 'Describe your daily routine during a recent long holiday or lockdown.',
    bulletPoints: ["What you did in the morning","What you did in the afternoon","How you spent your evenings","And explain how you felt about this routine."],
    sampleAnswer: '',
    followUpQuestions: ["Why is having a routine important for mental health?","How did people's habits change during the pandemic?","Is it better to have a flexible or strict schedule?","How can we maintain a good work-life balance when at home?","Do you think people are more or less productive without an office?","What are the benefits of having a hobby during free time?"]
  },
  {
    id: 'cc_31',
    topic: 'A Teacher Who Influenced You',
    prompt: 'Describe a teacher who had a great influence on you.',
    bulletPoints: ["Who they were","What subject they taught","How they influenced you","And explain why you remember them so well."],
    sampleAnswer: '',
    followUpQuestions: ["What qualities make a teacher effective?","How has technology changed the role of teachers?","Should teachers focus more on academic results or character building?","Why do some students perform better with certain teachers?","Is teaching a respected profession in your country?","How can teachers motivate students who are struggling?"]
  },
  {
    id: 'cc_32',
    topic: 'An Environmental Problem in Your Country',
    prompt: 'Describe an environmental problem in your country.',
    bulletPoints: ["What the problem is","What causes it","What the effects are","And explain how it could be solved."],
    sampleAnswer: '',
    followUpQuestions: ["Whose responsibility is it to protect the environment?","How can recycling be made more common?","What are the benefits of using renewable energy?","Is global warming the biggest threat to our planet?","How can individuals reduce their carbon footprint?","Should environmental education be mandatory in schools?"]
  },
  {
    id: 'cc_33',
    topic: 'A Film That Made You Think',
    prompt: 'Describe a film that made you think deeply about a subject.',
    bulletPoints: ["What the film was","What it was about","What subject it made you think about","And explain why it had such an impact on you."],
    sampleAnswer: '',
    followUpQuestions: ["What is the role of cinema in society?","Are streaming services like Netflix changing the film industry?","Should films be educational as well as entertaining?","How can movies influence people's opinions?","Why do some films become global hits?","Is it better to watch a movie at home or in the cinema?"]
  },
  {
    id: 'cc_34',
    topic: 'A Special Meal You Had',
    prompt: 'Describe a special meal you had with friends or family.',
    bulletPoints: ["Where you had it","What you ate","Who was there","And explain why it was special."],
    sampleAnswer: '',
    followUpQuestions: ["Is healthy eating a priority for people in your country?","Why is fast food so popular despite its health risks?","How has the traditional way of eating changed?","Should children be taught how to cook at school?","What role does food play in festivals and celebrations?","Is it better to eat at home or at a restaurant?"]
  },
  {
    id: 'cc_35',
    topic: 'A Friend from Childhood',
    prompt: 'Describe a friend you have known since childhood.',
    bulletPoints: ["Who they are","How you met","What you used to do together","And explain why you are still friends."],
    sampleAnswer: '',
    followUpQuestions: ["Why is childhood friendship often very strong?","How can people keep in touch with old friends via social media?","Is it better to have many friends or a few close ones?","How do friendships change as we get older?","What qualities do you look for in a friend?","Can a colleague also be a close friend?"]
  },
  {
    id: 'cc_36',
    topic: 'A Global Issue That Concerns You',
    prompt: 'Describe a global issue that concerns you (e.g., poverty or climate change).',
    bulletPoints: ["What the issue is","Why it is important","What is being done about it","And explain why it concerns you personally."],
    sampleAnswer: '',
    followUpQuestions: ["How has globalization changed the world?","Is international cooperation effective in solving global problems?","What can individuals do to help with global issues?","Why is poverty still a major problem in many countries?","Should developed nations do more to help developing ones?","What is the biggest challenge facing the world in the next 50 years?"]
  },
  {
    id: 'cc_37',
    topic: 'A Government Policy You Support',
    prompt: 'Describe a government policy you support.',
    bulletPoints: ["What the policy is","What it aims to achieve","How it affects the public","And explain why you think it is a good policy."],
    sampleAnswer: '',
    followUpQuestions: ["What are the most important services a government should provide?","How should taxes be used to benefit society?","Is government censorship ever justified?","How can citizens participate more in government decisions?","What makes a policy successful?","Should the government focus more on the economy or the environment?"]
  },
  {
    id: 'cc_38',
    topic: 'A Health Hobby You Have',
    prompt: 'Describe a healthy hobby you have (e.g., running or yoga).',
    bulletPoints: ["What it is","How often you do it","Why you started it","And explain how it helps your health."],
    sampleAnswer: '',
    followUpQuestions: ["How important is mental health compared to physical health?","What are the best ways to manage stress?","Should public healthcare be free for everyone?","How can we encourage more people to take up a hobby?","Are sports and hobbies more important for children or adults?","How does a healthy lifestyle affect productivity?"]
  },
  {
    id: 'cc_39',
    topic: 'A Museum You Visited Recently',
    prompt: 'Describe a museum you visited recently.',
    bulletPoints: ["Where it is","What you saw there","Who you went with","And explain what you liked most about it."],
    sampleAnswer: '',
    followUpQuestions: ["Do you prefer history museums or science museums?","Should museums charge an entrance fee?","How can museums be made more interesting for children?","What is the role of technology in modern museums?","Is it important to return stolen artifacts to their original countries?","How do museums preserve a nation's heritage?"]
  },
  {
    id: 'cc_40',
    topic: 'A Tourist Attraction in Your Country',
    prompt: 'Describe a popular tourist attraction in your country.',
    bulletPoints: ["Where it is","What it is famous for","When is the best time to visit","And explain why it is popular."],
    sampleAnswer: '',
    followUpQuestions: ["What are the positive and negative effects of tourism?","How can ecotourism help protect natural sites?","Is tourism a major part of your country's economy?","Should some tourist sites be closed to protect them?","How has the way people travel changed in recent years?","What makes a place a good tourist attraction?"]
  },
  {
    id: 'cc_41',
    topic: 'A Song That Means a Lot to You',
    prompt: 'Describe a song that means a lot to you.',
    bulletPoints: ["What the song is","What it is about","When you first heard it","And explain why it is meaningful to you."],
    sampleAnswer: '',
    followUpQuestions: ["Should music education be a part of the school curriculum?","What is the difference between listening to live music and recorded music?","How can music affect a person's mood?","Why do some songs become popular globally?","Is traditional music still relevant to young people?","How has the internet changed the music industry?"]
  },
  {
    id: 'cc_42',
    topic: 'A Plant or Tree in Your Garden/Park',
    prompt: 'Describe a plant or tree you have in your garden or a local park.',
    bulletPoints: ["What it is","Where it is located","What it looks like","And explain why you like it."],
    sampleAnswer: '',
    followUpQuestions: ["How important is agriculture to your country?","Should cities have more green spaces and parks?","How can we protect forests from deforestation?","What are the benefits of having plants in the home?","Do you think vertical farming is the future of food?", "How can gardening improve mental health?"]
  },
  {
    id: 'cc_43',
    topic: 'A Workplace Relationship',
    prompt: 'Describe a colleague you work (or worked) well with.',
    bulletPoints: ["Who they are","What their job was","How you worked together","And explain why you worked well together."],
    sampleAnswer: '',
    followUpQuestions: ["What makes a positive office culture?","How should professionalism be maintained in the workplace?","Is it important to have friends at work?","What are the common causes of workplace conflict?","How can teamwork be improved in a company?","Is a good relationship with the boss necessary?"]
  },
  {
    id: 'cc_44',
    topic: 'A Role Model for Young People',
    prompt: 'Describe a person you think is a good role model for young people.',
    bulletPoints: ["Who they are","What they have achieved","What qualities they have","And explain why they are a good role model."],
    sampleAnswer: '',
    followUpQuestions: ["How do celebrities influence the behavior of young people?","What are the most important characteristics of a hero?","Should role models always be perfect?","How can parents be good role models?","Is it important for young people to have a role model?","How has the definition of a role model changed?"]
  },
  {
    id: 'cc_45',
    topic: 'An Online Shop You Use Frequently',
    prompt: 'Describe an online shop you use frequently.',
    bulletPoints: ["What it is","What you usually buy there","Why you like using it","And explain how it compares to physical shops."],
    sampleAnswer: '',
    followUpQuestions: ["How has e-commerce changed the way people shop?","Is consumerism a problem in modern society?","What are the security risks of online shopping?","Should there be more regulations on online businesses?","Will physical shops disappear in the future?","What are the environmental impacts of online deliveries?"]
  },
  {
    id: 'cc_46',
    topic: 'A Sport You Enjoy Watching',
    prompt: 'Describe a sport you enjoy watching.',
    bulletPoints: ["What the sport is","Who you watch it with","Where you watch it","And explain why you enjoy it."],
    sampleAnswer: '',
    followUpQuestions: ["Should professional athletes earn very high salaries?","How does sport help build a national identity?","Is it better to play a sport or watch it?","What are the benefits of international sports events like the Olympics?","Should sports be purely competitive or for fun?","How has technology changed sports broadcasting?"]
  },
  {
    id: 'cc_47',
    topic: 'A Website You Visit Every Day',
    prompt: 'Describe a website you visit every day.',
    bulletPoints: ["What the website is","What you do on the website","Why you visit it daily","And explain how it is useful to you."],
    sampleAnswer: '',
    followUpQuestions: ["Can we always rely on the information found on the internet?","What is the 'digital divide' and how does it affect people?","Should certain websites be restricted by the government?","How has the internet changed the way we learn?","Is social media the most popular type of website?","What will the internet look like in 20 years?"]
  },
  {
    id: 'cc_48',
    topic: 'A City You Would Like to Visit',
    prompt: 'Describe a city you would like to visit in the future.',
    bulletPoints: ["Where it is","What you want to see there","Who you would go with","And explain why you want to visit this city."],
    sampleAnswer: '',
    followUpQuestions: ["What are the main reasons people move from the countryside to the city?","How can cities handle the challenges of rapid urbanization?","What makes a city 'livable'?", "Should more be done to preserve historical sites in modern cities?","How do cities contribute to a country's culture?","What are the downsides of living in a mega-city?"]
  },
  {
    id: 'cc_49',
    topic: 'A Journey That Didn\'t Go to Plan',
    prompt: 'Describe a journey that didn\'t go as planned.',
    bulletPoints: ["Where you were going","What went wrong","How you handled the situation","And explain how you felt about it later."],
    sampleAnswer: '',
    followUpQuestions: ["How can road safety be improved in your country?","What is the future of transport technology (e.g., self-driving cars)?","Should we rely more on trains than planes for travel?","How do travel delays affect people's stress levels?","What should you do if you get lost in a foreign city?","Is it important to have travel insurance?"]
  },
  {
    id: 'cc_50',
    topic: 'A Water-Based Activity You Enjoy',
    prompt: 'Describe a water-based activity you enjoy (e.g., swimming or boating).',
    bulletPoints: ["What it is","Where you do it","How often you do it","And explain why you enjoy it."],
    sampleAnswer: '',
    followUpQuestions: ["Why is access to clean water a global concern?","How can we protect our oceans and rivers from pollution?","Should swimming be a mandatory skill taught in schools?","What are the benefits of living near water?","How does water affect a country's climate?","What are the most popular water sports in your country?"]
  }
];

export const mockTests: SpeakingMockTest[] = []; // Not needed for the new simulator logic


export const bandDescriptors: BandDescriptor[] = [
  {
    band: 9,
    title: 'Expert User',
    fluency: 'Speaks fluently with only rare repetition or self-correction.',
    vocabulary: 'Uses vocabulary with full flexibility and precision in all topics.',
    grammar: 'Uses a full range of structures naturally and appropriately.',
    pronunciation: 'Uses a full range of pronunciation features with precision and subtlety.'
  },
  {
    band: 8,
    title: 'Very Good User',
    fluency: 'Speaks fluently with only occasional repetition or self-correction.',
    vocabulary: 'Uses a wide vocabulary resource readily and flexibly to convey precise meaning.',
    grammar: 'Uses a wide range of structures flexibly.',
    pronunciation: 'Uses a wide range of pronunciation features.'
  },
  {
    band: 7,
    title: 'Good User',
    fluency: 'Speaks at length without noticeable effort or loss of coherence.',
    vocabulary: 'Uses vocabulary resource flexibly to discuss a variety of topics.',
    grammar: 'Uses a range of complex structures with some flexibility.',
    pronunciation: 'Shows all the positive features of Band 6 and some, but not all, of the positive features of Band 8.'
  },
  {
    band: 6,
    title: 'Competent User',
    fluency: 'Is willing to speak at length, though may lose coherence at times due to occasional repetition.',
    vocabulary: 'Has a wide enough vocabulary to discuss topics at length and make meaning clear.',
    grammar: 'Uses a mix of simple and complex structures, but with limited flexibility.',
    pronunciation: 'Uses a range of pronunciation features with mixed control.'
  }
];
