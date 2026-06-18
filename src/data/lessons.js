// TODO: fetch from Supabase
// Data shape matches future Supabase `lessons` table schema.
// Filter by `difficulty` to support multi-level system.

export const lessons = [
  // --- Greetings ---
  { id: 'g1', afrikaans: 'Goeie môre', english: 'Good morning', category: 'Greetings', difficulty: 'advanced_beginner', hint: '"Khoo-yuh maw-ruh"' },
  { id: 'g2', afrikaans: 'Goeie middag', english: 'Good afternoon', category: 'Greetings', difficulty: 'advanced_beginner', hint: '"Khoo-yuh mid-dakh"' },
  { id: 'g3', afrikaans: 'Goeie naand', english: 'Good evening', category: 'Greetings', difficulty: 'advanced_beginner', hint: '"Khoo-yuh nahnt"' },
  { id: 'g4', afrikaans: 'Totsiens', english: 'Goodbye', category: 'Greetings', difficulty: 'advanced_beginner', hint: '"Tot-seens" — literally "till we see again"' },
  { id: 'g5', afrikaans: 'Hoe gaan dit?', english: 'How are you?', category: 'Greetings', difficulty: 'advanced_beginner', hint: '"Hoo khahn dit"' },
  { id: 'g6', afrikaans: 'Dit gaan goed, dankie', english: 'I am fine, thank you', category: 'Greetings', difficulty: 'advanced_beginner', hint: 'Common polite reply' },
  { id: 'g7', afrikaans: 'Baie dankie', english: 'Thank you very much', category: 'Greetings', difficulty: 'advanced_beginner', hint: '"Buy-yuh dahn-kee"' },
  { id: 'g8', afrikaans: 'Asseblief', english: 'Please', category: 'Greetings', difficulty: 'advanced_beginner', hint: '"As-uh-bleef"' },

  // --- Introductions ---
  { id: 'i1', afrikaans: 'My naam is...', english: 'My name is...', category: 'Introductions', difficulty: 'advanced_beginner', hint: '"May nahm is"' },
  { id: 'i2', afrikaans: 'Wat is jou naam?', english: 'What is your name?', category: 'Introductions', difficulty: 'advanced_beginner', hint: '"Vat is yoh nahm"' },
  { id: 'i3', afrikaans: 'Aangename kennis', english: 'Nice to meet you', category: 'Introductions', difficulty: 'advanced_beginner', hint: 'Formal greeting on first meeting' },
  { id: 'i4', afrikaans: 'Ek kom van Suid-Afrika', english: 'I am from South Africa', category: 'Introductions', difficulty: 'advanced_beginner', hint: '"Ek kom fun Sayd Afrika"' },
  { id: 'i5', afrikaans: 'Hoe oud is jy?', english: 'How old are you?', category: 'Introductions', difficulty: 'advanced_beginner', hint: '"Hoo owt is yay"' },
  { id: 'i6', afrikaans: 'Ek is tien jaar oud', english: 'I am ten years old', category: 'Introductions', difficulty: 'advanced_beginner', hint: 'Replace "tien" with your age' },

  // --- Asking Questions ---
  { id: 'q1', afrikaans: 'Waar is die badkamer?', english: 'Where is the bathroom?', category: 'Questions', difficulty: 'advanced_beginner', hint: '"Vaar is dee but-kah-mer"' },
  { id: 'q2', afrikaans: 'Hoeveel kos dit?', english: 'How much does it cost?', category: 'Questions', difficulty: 'advanced_beginner', hint: '"Hoo-feel kos dit"' },
  { id: 'q3', afrikaans: 'Kan jy my help?', english: 'Can you help me?', category: 'Questions', difficulty: 'advanced_beginner', hint: '"Kun yay may help"' },
  { id: 'q4', afrikaans: 'Praat jy Engels?', english: 'Do you speak English?', category: 'Questions', difficulty: 'advanced_beginner', hint: '"Praht yay Eng-els"' },
  { id: 'q5', afrikaans: 'Wat beteken dit?', english: 'What does that mean?', category: 'Questions', difficulty: 'advanced_beginner', hint: '"Vat buh-tay-ken dit"' },
  { id: 'q6', afrikaans: 'Watter tyd is dit?', english: 'What time is it?', category: 'Questions', difficulty: 'advanced_beginner', hint: '"Vat-ter tayt is dit"' },

  // --- Common Responses ---
  { id: 'r1', afrikaans: 'Ja', english: 'Yes', category: 'Responses', difficulty: 'advanced_beginner', hint: '"Yah"' },
  { id: 'r2', afrikaans: 'Nee', english: 'No', category: 'Responses', difficulty: 'advanced_beginner', hint: '"Nee-uh" (rhymes with "near")' },
  { id: 'r3', afrikaans: 'Ek verstaan nie', english: 'I do not understand', category: 'Responses', difficulty: 'advanced_beginner', hint: '"Ek fer-stahn nee"' },
  { id: 'r4', afrikaans: 'Herhaal asseblief', english: 'Please repeat that', category: 'Responses', difficulty: 'advanced_beginner', hint: '"Her-hahl as-uh-bleef"' },
  { id: 'r5', afrikaans: 'Ek weet nie', english: 'I do not know', category: 'Responses', difficulty: 'advanced_beginner', hint: '"Ek veet nee"' },
  { id: 'r6', afrikaans: 'Natuurlik', english: 'Of course', category: 'Responses', difficulty: 'advanced_beginner', hint: '"Nah-teer-lik"' },

  // --- Shopping ---
  { id: 's1', afrikaans: 'Ek wil dit koop', english: 'I want to buy this', category: 'Shopping', difficulty: 'advanced_beginner', hint: '"Ek vil dit kawp"' },
  { id: 's2', afrikaans: 'Het julle dit in blou?', english: 'Do you have it in blue?', category: 'Shopping', difficulty: 'advanced_beginner', hint: '"Het yull-uh dit in bloo"' },
  { id: 's3', afrikaans: 'Dit is te duur', english: 'This is too expensive', category: 'Shopping', difficulty: 'advanced_beginner', hint: '"Dit is tuh deer"' },
  { id: 's4', afrikaans: 'Waar is die kassier?', english: 'Where is the till/checkout?', category: 'Shopping', difficulty: 'advanced_beginner', hint: '"Vaar is dee kus-suh"' },
  { id: 's5', afrikaans: 'Kan ek met kaart betaal?', english: 'Can I pay by card?', category: 'Shopping', difficulty: 'advanced_beginner', hint: 'Very common in SA shops' },
  { id: 's6', afrikaans: 'Ek soek \'n geskenk', english: 'I am looking for a gift', category: 'Shopping', difficulty: 'advanced_beginner', hint: '"Ek sook un khe-skenk"' },

  // --- Directions ---
  { id: 'd1', afrikaans: 'Gaan reguit', english: 'Go straight ahead', category: 'Directions', difficulty: 'advanced_beginner', hint: '"Khahn rekh-ayt"' },
  { id: 'd2', afrikaans: 'Draai links', english: 'Turn left', category: 'Directions', difficulty: 'advanced_beginner', hint: '"Dry-ee links"' },
  { id: 'd3', afrikaans: 'Draai regs', english: 'Turn right', category: 'Directions', difficulty: 'advanced_beginner', hint: '"Dry-ee rekhs"' },
  { id: 'd4', afrikaans: 'Dit is naby', english: 'It is nearby', category: 'Directions', difficulty: 'advanced_beginner', hint: '"Dit is nah-bay"' },
  { id: 'd5', afrikaans: 'Hoe ver is dit?', english: 'How far is it?', category: 'Directions', difficulty: 'advanced_beginner', hint: '"Hoo fer is dit"' },
  { id: 'd6', afrikaans: 'By die robot', english: 'At the traffic light', category: 'Directions', difficulty: 'advanced_beginner', hint: 'SA slang — robots = traffic lights!' },

  // --- Food Ordering ---
  { id: 'f1', afrikaans: 'Die spyskaart, asseblief', english: 'The menu, please', category: 'Food', difficulty: 'advanced_beginner', hint: '"Dee spays-kaart"' },
  { id: 'f2', afrikaans: 'Ek wil graag bestel', english: 'I would like to order', category: 'Food', difficulty: 'advanced_beginner', hint: '"Ek vil khrakh buh-stel"' },
  { id: 'f3', afrikaans: 'Wat beveel jy aan?', english: 'What do you recommend?', category: 'Food', difficulty: 'advanced_beginner', hint: '"Vat buh-feel yay ahn"' },
  { id: 'f4', afrikaans: 'Ek is vegetariër', english: 'I am vegetarian', category: 'Food', difficulty: 'advanced_beginner', hint: '"Ek is fek-huh-tah-ree-er"' },
  { id: 'f5', afrikaans: 'Die rekening, asseblief', english: 'The bill, please', category: 'Food', difficulty: 'advanced_beginner', hint: '"Dee reh-ken-ing"' },
  { id: 'f6', afrikaans: 'Dis heerlik!', english: 'It is delicious!', category: 'Food', difficulty: 'advanced_beginner', hint: '"Dis heer-lik" — great compliment to a host' },
  { id: 'f7', afrikaans: 'Nog koffie, asseblief', english: 'More coffee, please', category: 'Food', difficulty: 'advanced_beginner', hint: 'Essential South African phrase!' },
];

export const DIFFICULTY_LEVELS = {
  advanced_beginner: { label: 'Advanced Beginner', color: 'bg-blue-500' },
  // Future levels:
  // intermediate: { label: 'Intermediate', color: 'bg-yellow-500' },
  // advanced: { label: 'Advanced', color: 'bg-red-500' },
};

export const CATEGORY_COLORS = {
  Greetings:     { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300' },
  Introductions: { bg: 'bg-sky-100',     text: 'text-sky-800',     border: 'border-sky-300' },
  Questions:     { bg: 'bg-violet-100',  text: 'text-violet-800',  border: 'border-violet-300' },
  Responses:     { bg: 'bg-amber-100',   text: 'text-amber-800',   border: 'border-amber-300' },
  Shopping:      { bg: 'bg-pink-100',    text: 'text-pink-800',    border: 'border-pink-300' },
  Directions:    { bg: 'bg-orange-100',  text: 'text-orange-800',  border: 'border-orange-300' },
  Food:          { bg: 'bg-lime-100',    text: 'text-lime-800',    border: 'border-lime-300' },
};
