import { CodingChallenge } from '../types';

export const KHMER_CODING_CHALLENGES: CodingChallenge[] = [
  {
    id: 'quest-1',
    levelNum: 1,
    titleKhmer: 'ជំហានដំបូងនៃកូដ',
    titleEn: 'Hello World & Print',
    category: 'basics',
    difficulty: 'ងាយស្រួល',
    xp: 50,
    gems: 10,
    storyKhmer: '🧙‍♂️ គ្រូមន្តអាគមខ្មែរត្រូវការបង្កើតពាក្យសព្ទស្វាគមន៍ដំបូងគេដើម្បីបើកទ្វារប្រាសាទកូដ! ចែករំលែកសារ "សួស្តីកម្ពុជា" ទៅកាន់អេក្រង់ console។',
    descriptionKhmer: 'បង្កើតអនុគមន៍ `sayHello()` ដែលរ៉ីថើន (return) នូវអត្ថបទ `"សួស្តីកម្ពុជា"`។',
    theoryKhmer: '💡 **ការបង្ហាញអត្ថបទ (Return Value)**\n\nនៅក្នុង JavaScript ពាក្យ `return` ត្រូវបានប្រើប្រាស់ដើម្បីបញ្ជូនតម្លៃចេញពីអនុគមន៍ (Function)។\n\n**ឧទាហរណ៍:**\n```js\nfunction getGreeting() {\n  return "សួស្តី!";\n}\n```',
    keyConcepts: ['function', 'return', 'string'],
    starterCode: `// ទទួលបានការស្វាគមន៍
function sayHello() {
  // សរសេរកូដរ៉ីថើន "សួស្តីកម្ពុជា" នៅទីនេះ
  return "";
}`,
    solutionHintKhmer: 'ផ្លាស់ប្តូរតម្លៃនៅក្នុង return "" ទៅជា "សួស្តីកម្ពុជា"',
    solutionCode: `function sayHello() {
  return "សួស្តីកម្ពុជា";
}`,
    testCases: [
      {
        id: 't1-1',
        inputDescription: 'sayHello()',
        testFnCall: 'sayHello()',
        expectedOutput: 'សួស្តីកម្ពុជា',
        explanationKhmer: 'អនុគមន៍ត្រូវតែរ៉ីថើនត្រង់ៗនូវ "សួស្តីកម្ពុជា"',
      },
    ],
  },
  {
    id: 'quest-2',
    levelNum: 2,
    titleKhmer: 'ប្រអប់រក្សាទុកទិន្នន័យ (អថេរ)',
    titleEn: 'Variables & Addition',
    category: 'basics',
    difficulty: 'ងាយស្រួល',
    xp: 75,
    gems: 15,
    storyKhmer: '⚔️ វីរបុរសបានរកឃើញកាបូបមាសពីរ! កាបូប A មាន $a$ កាក់ និងកាបូប B មាន $b$ កាក់។ គណនាកាក់សរុបទាំងអស់។',
    descriptionKhmer: 'បង្កើតអនុគមន៍ `addGold(a, b)` ដែលទទួលប៉ារ៉ាម៉ែត្រពីរ ហើយរ៉ីថើនផលបូកនៃ `a + b`។',
    theoryKhmer: '💡 **អថេរ និងប្រមាណវិធីបូក (+)**\n\nប៉ារ៉ាម៉ែត្រ `a` និង `b` គឺជាអថេរដែលរក្សាទុកលេខ។ យើងអាចបូកពួកវាចូលគ្នាដោយប្រើសញ្ញា `+`។\n\n**ឧទាហរណ៍:**\n```js\nfunction sum(x, y) {\n  return x + y;\n}\n```',
    keyConcepts: ['variables', 'math', 'parameters'],
    starterCode: `function addGold(a, b) {
  // គណនាផលបូកកាក់ a និង b
  return 0;
}`,
    solutionHintKhmer: 'ប្រទាក់ក្រឡាកូដ: return a + b;',
    solutionCode: `function addGold(a, b) {
  return a + b;
}`,
    testCases: [
      {
        id: 't2-1',
        inputDescription: 'addGold(10, 20)',
        testFnCall: 'addGold(10, 20)',
        expectedOutput: '30',
      },
      {
        id: 't2-2',
        inputDescription: 'addGold(100, 250)',
        testFnCall: 'addGold(100, 250)',
        expectedOutput: '350',
      },
    ],
  },
  {
    id: 'quest-3',
    levelNum: 3,
    titleKhmer: 'ការធ្វើសេចក្តីសម្រេច (If/Else)',
    titleEn: 'Conditional Logic',
    category: 'control_flow',
    difficulty: 'ងាយស្រួល',
    xp: 100,
    gems: 20,
    storyKhmer: '🛡️ អ្នកយាមទ្វារប្រាសាទត្រួតពិនិត្យអាយុអ្នកក្លាហាន! ប្រសិនបើអាយុចាប់ពី ១៨ ឆ្នាំឡើងទៅ បង្ហាញ "អនុញ្ញាត" បើមិនដូច្នោះទេ "បដិសេធ"។',
    descriptionKhmer: 'សរសេរអនុគមន៍ `checkAccess(age)`:\n- ប្រសិនបើ `age >= 18` ត្រូវ return `"អនុញ្ញាត"`\n- បើមិនដូច្នោះទេ ត្រូវ return `"បដិសេធ"`',
    theoryKhmer: '💡 **លក្ខខណ្ឌ If / Else**\n\nប្រើ `if` ដើម្បីពិនិត្យលក្ខខណ្ឌ:\n```js\nif (age >= 18) {\n  return "អនុញ្ញាត";\n} else {\n  return "បដិសេធ";\n}\n```',
    keyConcepts: ['if-else', 'boolean', 'comparison'],
    starterCode: `function checkAccess(age) {
  // សរសេរលក្ខខណ្ឌ check ទីនេះ
  if (age >= 18) {
    return "";
  }
  return "";
}`,
    solutionHintKhmer: 'បើ age >= 18 return "អនុញ្ញាត" បើមិនចឹងទេ return "បដិសេធ"',
    solutionCode: `function checkAccess(age) {
  if (age >= 18) {
    return "អនុញ្ញាត";
  }
  return "បដិសេធ";
}`,
    testCases: [
      {
        id: 't3-1',
        inputDescription: 'checkAccess(20)',
        testFnCall: 'checkAccess(20)',
        expectedOutput: 'អនុញ្ញាត',
      },
      {
        id: 't3-2',
        inputDescription: 'checkAccess(15)',
        testFnCall: 'checkAccess(15)',
        expectedOutput: 'បដិសេធ',
      },
      {
        id: 't3-3',
        inputDescription: 'checkAccess(18)',
        testFnCall: 'checkAccess(18)',
        expectedOutput: 'អនុញ្ញាត',
      },
    ],
  },
  {
    id: 'quest-4',
    levelNum: 4,
    titleKhmer: 'ការគណនាពិន្ទុប្រឡង (Grade Calculator)',
    titleEn: 'Multiple Conditions',
    category: 'control_flow',
    difficulty: 'មធ្យម',
    xp: 120,
    gems: 25,
    storyKhmer: '📜 គ្រូបង្រៀនកូដចង់បង្កើតប្រព័ន្ធស្វ័យប្រវត្តិដើម្បីកំណត់និទ្ទេសសិស្សកម្ពុជា!',
    descriptionKhmer: 'សរសេរអនុគមន៍ `getGrade(score)`:\n- ពិន្ទុ >= 90: return `"A"`\n- ពិន្ទុ >= 80: return `"B"`\n- ពិន្ទុ >= 70: return `"C"`\n- តិចជាង 70: return `"F"`',
    theoryKhmer: '💡 **If / Else If / Else**\n\n```js\nif (score >= 90) {\n  return "A";\n} else if (score >= 80) {\n  return "B";\n} ...\n```',
    keyConcepts: ['else if', 'grading logic'],
    starterCode: `function getGrade(score) {
  // សរសេរលក្ខខណ្ឌកាត់សេចក្តីពិន្ទុ
  return "F";
}`,
    solutionHintKhmer: 'ប្រើ if () ... else if () ... តាមលំដាប់ពិន្ទុពីធំទៅតូច',
    solutionCode: `function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  return "F";
}`,
    testCases: [
      {
        id: 't4-1',
        inputDescription: 'getGrade(95)',
        testFnCall: 'getGrade(95)',
        expectedOutput: 'A',
      },
      {
        id: 't4-2',
        inputDescription: 'getGrade(83)',
        testFnCall: 'getGrade(83)',
        expectedOutput: 'B',
      },
      {
        id: 't4-3',
        inputDescription: 'getGrade(65)',
        testFnCall: 'getGrade(65)',
        expectedOutput: 'F',
      },
    ],
  },
  {
    id: 'quest-5',
    levelNum: 5,
    titleKhmer: 'កម្លាំងនៃរង្វិលជុំ (Sum up to N)',
    titleEn: 'Loops & Accumulation',
    category: 'functions',
    difficulty: 'មធ្យម',
    xp: 150,
    gems: 30,
    storyKhmer: '🌀 វេទមន្តរង្វិលជុំ! គណនាផលបូកលេខតាំងពី ១ រហូតដល់ $N$ (ឧទាហរណ៍: ១ + ២ + ៣ + ... + N)។',
    descriptionKhmer: 'សរសេរអនុគមន៍ `sumUpTo(n)` ដែលប្រើរង្វិលជុំ `for` loop ដើម្បីបូកលេខពី 1 ដល់ n រួច return ផលបូកនោះ។',
    theoryKhmer: '💡 **រង្វិលជុំ For Loop**\n\n```js\nlet total = 0;\nfor (let i = 1; i <= n; i++) {\n  total += i;\n}\nreturn total;\n```',
    keyConcepts: ['for-loop', 'accumulator'],
    starterCode: `function sumUpTo(n) {
  let total = 0;
  // ប្រើរង្វិលជុំ for loop ទីនេះ
  
  return total;
}`,
    solutionHintKhmer: 'បង្កើតរង្វិលជុំ for (let i = 1; i <= n; i++) រួចបូកចូល total',
    solutionCode: `function sumUpTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}`,
    testCases: [
      {
        id: 't5-1',
        inputDescription: 'sumUpTo(5)',
        testFnCall: 'sumUpTo(5)',
        expectedOutput: '15',
        explanationKhmer: '1 + 2 + 3 + 4 + 5 = 15',
      },
      {
        id: 't5-2',
        inputDescription: 'sumUpTo(10)',
        testFnCall: 'sumUpTo(10)',
        expectedOutput: '55',
      },
    ],
  },
  {
    id: 'quest-6',
    levelNum: 6,
    titleKhmer: 'ការគ្រប់គ្រងកន្ត្រកទិន្នន័យ (Arrays)',
    titleEn: 'Array Filtering & Odd/Even',
    category: 'arrays',
    difficulty: 'មធ្យម',
    xp: 180,
    gems: 35,
    storyKhmer: '🧺 អ្នកភូមិត្រូវការរៀបចំផ្លែឈើ! គណនាចំនួនលេខគូ (Even Numbers) នៅក្នុងបញ្ជីកន្ត្រក។',
    descriptionKhmer: 'សរសេរអនុគមន៍ `countEvenNumbers(numbers)` ដែលទទួល Array នៃលេខ រួច return ចំនួនធាតុណាដែលជាលេខគូ (ចែកដាច់នឹង ២)។',
    theoryKhmer: '💡 **ការរាប់ធាតុក្នុង Array ជាមួយ % Modulo**\n\nលេខគូគឺលេខដែល % 2 === 0:\n```js\nlet count = 0;\nfor (let num of numbers) {\n  if (num % 2 === 0) count++;\n}\nreturn count;\n```',
    keyConcepts: ['arrays', 'modulo', 'counting'],
    starterCode: `function countEvenNumbers(numbers) {
  let count = 0;
  // សរសេរកូដរាប់លេខគូក្នុងកន្ត្រក
  return count;
}`,
    solutionHintKhmer: 'ប្រើ for (let num of numbers) { if (num % 2 === 0) count++; }',
    solutionCode: `function countEvenNumbers(numbers) {
  let count = 0;
  for (let num of numbers) {
    if (num % 2 === 0) {
      count++;
    }
  }
  return count;
}`,
    testCases: [
      {
        id: 't6-1',
        inputDescription: 'countEvenNumbers([1, 2, 3, 4, 6])',
        testFnCall: 'countEvenNumbers([1, 2, 3, 4, 6])',
        expectedOutput: '3',
        explanationKhmer: 'លេខគូមាន: 2, 4, 6 (សរុប ៣)',
      },
      {
        id: 't6-2',
        inputDescription: 'countEvenNumbers([1, 3, 5, 7])',
        testFnCall: 'countEvenNumbers([1, 3, 5, 7])',
        expectedOutput: '0',
      },
    ],
  },
  {
    id: 'quest-7',
    levelNum: 7,
    titleKhmer: 'ស្វែងរកលេខអតិបរមា (Max Value)',
    titleEn: 'Find Max in Array',
    category: 'arrays',
    difficulty: 'ពិបាក',
    xp: 220,
    gems: 40,
    storyKhmer: '👑 រកមើលអ្នកជើងខ្លាំងដែលមានពិន្ទុខ្ពស់បំផុតក្នុងព្រះរាជាណាចក្រកូដ!',
    descriptionKhmer: 'សរសេរអនុគមន៍ `findMax(numbers)` ដែលរកលេខដែលធំបំផុតនៅក្នុង Array។ បើ Array ទទេ ត្រូវ return `null`។',
    theoryKhmer: '💡 **ការរកតម្លៃអតិបរមា**\n\nកំណត់ `let max = numbers[0];` រួចប្រៀបធៀបគ្រប់ធាតុក្នុង Array:\n```js\nif (numbers.length === 0) return null;\nlet max = numbers[0];\nfor (let num of numbers) {\n  if (num > max) max = num;\n}\nreturn max;\n```',
    keyConcepts: ['algorithm', 'arrays', 'max-search'],
    starterCode: `function findMax(numbers) {
  if (numbers.length === 0) return null;
  // សរសេរកូដរកលេខធំបំផុត
  return 0;
}`,
    solutionHintKhmer: 'កំណត់ max = numbers[0] រួច loop ពិនិត្យបើ num > max នោះ max = num',
    solutionCode: `function findMax(numbers) {
  if (numbers.length === 0) return null;
  let max = numbers[0];
  for (let num of numbers) {
    if (num > max) {
      max = num;
    }
  }
  return max;
}`,
    testCases: [
      {
        id: 't7-1',
        inputDescription: 'findMax([12, 45, 8, 99, 23])',
        testFnCall: 'findMax([12, 45, 8, 99, 23])',
        expectedOutput: '99',
      },
      {
        id: 't7-2',
        inputDescription: 'findMax([-5, -2, -10])',
        testFnCall: 'findMax([-5, -2, -10])',
        expectedOutput: '-2',
      },
    ],
  },
  {
    id: 'quest-8',
    levelNum: 8,
    titleKhmer: 'វត្ថុ និងប្រវត្តិវីរបុរស (Objects)',
    titleEn: 'Object Properties & Formatting',
    category: 'objects',
    difficulty: 'ពិបាក',
    xp: 250,
    gems: 50,
    storyKhmer: '💎 បង្កើតទម្រង់កាតព័ត៌មានវីរបុរសជាអត្ថបទស្អាតស្អំ!',
    descriptionKhmer: 'សរសេរអនុគមន៍ `formatHero(hero)` ដែលទទួល Object `{ name: "សុខា", level: 10, role: "អ្នកកូដ" }` រួច return អត្ថបទទម្រង់:\n`"សុខា (កម្រិត 10 - អ្នកកូដ)"`',
    theoryKhmer: '💡 **ការប្រើប្រាស់ Object Properties**\n\nយើងអាចទាញយកតម្លៃតាមរយៈ `hero.name`, `hero.level`, `hero.role` ឬប្រើ Template Literals (\`...\`)។',
    keyConcepts: ['objects', 'string-formatting'],
    starterCode: `function formatHero(hero) {
  // hero មាន properties: name, level, role
  return "";
}`,
    solutionHintKhmer: ' return `${hero.name} (កម្រិត ${hero.level} - ${hero.role})`;',
    solutionCode: `function formatHero(hero) {
  return \`\${hero.name} (កម្រិត \${hero.level} - \${hero.role})\`;
}`,
    testCases: [
      {
        id: 't8-1',
        inputDescription: 'formatHero({ name: "សុខា", level: 10, role: "អ្នកកូដ" })',
        testFnCall: 'formatHero({ name: "សុខា", level: 10, role: "អ្នកកូដ" })',
        expectedOutput: 'សុខា (កម្រិត 10 - អ្នកកូដ)',
      },
      {
        id: 't8-2',
        inputDescription: 'formatHero({ name: "វិចិត្រ", level: 25, role: "មេសរសេរកូដ" })',
        testFnCall: 'formatHero({ name: "វិចិត្រ", level: 25, role: "មេសរសេរកូដ" })',
        expectedOutput: 'វិចិត្រ (កម្រិត 25 - មេសរសេរកូដ)',
      },
    ],
  },
  {
    id: 'quest-9',
    levelNum: 9,
    titleKhmer: 'ត្រឡប់ពាក្យថយក្រោយ (Reverse String)',
    titleEn: 'Reverse String Algorithm',
    category: 'algorithms',
    difficulty: 'ពិបាក',
    xp: 300,
    gems: 60,
    storyKhmer: '🔮 វេទមន្តបកប្រែអក្ខរាថយក្រោយ! ប្រែក្លាយអត្ថបទពីមុខទៅក្រោយ (e.g. "KHMER" -> "REHMK")។',
    descriptionKhmer: 'សរសេរអនុគមន៍ `reverseString(text)` ដែលទទួល string រួច return string ដែលបានត្រឡប់ពីក្រោយមកមុខវិញ។',
    theoryKhmer: '💡 **Reverse String Method**\n\nអាចប្រើ `.split("").reverse().join("")` ឬប្រើរង្វិលជុំថយក្រោយ!',
    keyConcepts: ['string-manipulation', 'algorithm'],
    starterCode: `function reverseString(text) {
  // សរសេរកូដត្រឡប់អក្សរថយក្រោយ
  return "";
}`,
    solutionHintKhmer: ' return text.split("").reverse().join("");',
    solutionCode: `function reverseString(text) {
  return text.split("").reverse().join("");
}`,
    testCases: [
      {
        id: 't9-1',
        inputDescription: 'reverseString("KHMER")',
        testFnCall: 'reverseString("KHMER")',
        expectedOutput: 'REHMK',
      },
      {
        id: 't9-2',
        inputDescription: 'reverseString("កូដ")',
        testFnCall: 'reverseString("កូដ")',
        expectedOutput: 'ដូក',
      },
    ],
  },
  {
    id: 'quest-10',
    levelNum: 10,
    titleKhmer: '👑 បេសកកម្មចុងក្រោយ - មេស្តេចនាគកូដ',
    titleEn: 'Grand Master Khmer Boss Challenge',
    category: 'algorithms',
    difficulty: 'មេបញ្ជាការ (Boss)',
    xp: 500,
    gems: 100,
    storyKhmer: '🐲🐉 ស្តេចនាគកូដបានសួរប្រស្នាចុងក្រោយ! គណនាផលបូកលេខសរុបដែលចែកដាច់នឹង ៣ ឬ ៥ (FizzBuzz Magic Sum) ចាប់ពី ១ ដល់ N-1! ឈ្នះការប្រកួតនេះដើម្បីក្លាយជា មេស្តេចកូដខ្មែរ!',
    descriptionKhmer: 'សរសេរអនុគមន៍ `bossChallenge(n)`:\nគណនាផលបូកនៃគ្រប់លេខ `i` (ដែល `1 <= i < n`) ណាដែល `i` ចែកដាច់នឹង ៣ ឬ ៥ (`i % 3 === 0 || i % 5 === 0`)។',
    theoryKhmer: '💡 **ប្រឡងសមត្ថភាពចុងក្រោយ (Boss Fight)**\n\n```js\nlet sum = 0;\nfor (let i = 1; i < n; i++) {\n  if (i % 3 === 0 || i % 5 === 0) {\n    sum += i;\n  }\n}\nreturn sum;\n```',
    keyConcepts: ['boss-level', 'loops', 'conditionals', 'math'],
    starterCode: `function bossChallenge(n) {
  let sum = 0;
  // សរសេរកូដបូកលេខចែកដាច់នឹង ៣ ឬ ៥ ពី 1 ដល់ n-1
  return sum;
}`,
    solutionHintKhmer: ' ប្រើ for (let i = 1; i < n; i++) { if (i % 3 === 0 || i % 5 === 0) sum += i; }',
    solutionCode: `function bossChallenge(n) {
  let sum = 0;
  for (let i = 1; i < n; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum += i;
    }
  }
  return sum;
}`,
    testCases: [
      {
        id: 't10-1',
        inputDescription: 'bossChallenge(10)',
        testFnCall: 'bossChallenge(10)',
        expectedOutput: '23',
        explanationKhmer: 'លេខចែកដាច់នឹង ៣ ឬ ៥ ក្រោម ១០ មាន: 3, 5, 6, 9 (បូកបញ្ចូលគ្នា = 23)',
      },
      {
        id: 't10-2',
        inputDescription: 'bossChallenge(16)',
        testFnCall: 'bossChallenge(16)',
        expectedOutput: '60',
      },
    ],
  },
];

export const SHOP_ITEMS = [
  {
    id: 'avatar-dragon',
    nameKhmer: '🐉 អាវតាតារានាគកូដ',
    nameEn: 'Dragon Avatar',
    type: 'avatar',
    priceGems: 50,
    icon: '🐉',
    descriptionKhmer: 'អាវតារប្រៀបដូចស្តេចនាគកូដ មានអំណាចក្នុងការដោះស្រាយលំហាត់ពិបាកៗ!',
    value: '🐉',
  },
  {
    id: 'avatar-wizard',
    nameKhmer: '🧙‍♂️ គ្រូមន្តអាគមកូដ',
    nameEn: 'Coding Wizard Avatar',
    type: 'avatar',
    priceGems: 30,
    icon: '🧙‍♂️',
    descriptionKhmer: 'គ្រូមន្តអាគមខ្មែរ ពូកែខាងសរសេរកូដ និងបង្កើតអនុគមន៍ស្មុគស្មាញ',
    value: '🧙‍♂️',
  },
  {
    id: 'title-hero',
    nameKhmer: '⚡ វីរបុរសកូដខ្មែរ',
    nameEn: 'Khmer Code Hero Title',
    type: 'title',
    priceGems: 40,
    icon: '⚡',
    descriptionKhmer: 'ងារពិសេសបង្ហាញលើប្រវត្តិរូបរបស់អ្នក!',
    value: '⚡ វីរបុរសកូដខ្មែរ',
  },
  {
    id: 'heart-refill',
    nameKhmer: '❤️ បន្ថែមបេះដូងពេញ (៥/៥)',
    nameEn: 'Full Heart Refill',
    type: 'heart',
    priceGems: 20,
    icon: '❤️',
    descriptionKhmer: 'បំពេញបេះដូងជីវិតរបស់អ្នកអោយពេញលេញវិញភ្លាមៗ',
    value: '5',
  },
];

export const INITIAL_ACHIEVEMENTS = [
  {
    id: 'ach-first-code',
    titleKhmer: 'អ្នកសរសេរកូដដំបូង',
    titleEn: 'First Code Written',
    descKhmer: 'បញ្ចប់លំហាត់កូដដំបូងបង្អស់',
    icon: '🚀',
    requiredXpOrLevel: 1,
    unlocked: false,
    rewardGems: 15,
  },
  {
    id: 'ach-loop-master',
    titleKhmer: 'ម្ចាស់មន្តអាគមរង្វិលជុំ (Loop Master)',
    titleEn: 'Loop Master',
    descKhmer: 'បញ្ចប់លំហាត់រង្វិលជុំកម្រិត ៥',
    icon: '🌀',
    requiredXpOrLevel: 5,
    unlocked: false,
    rewardGems: 25,
  },
  {
    id: 'ach-boss-slayer',
    titleKhmer: 'អ្នកជ័យជម្នះលើស្តេចនាគ (Boss Slayer)',
    titleEn: 'Boss Slayer',
    descKhmer: 'ផ្ដួលលំហាត់ Boss កម្រិត ១០',
    icon: '👑',
    requiredXpOrLevel: 10,
    unlocked: false,
    rewardGems: 50,
  },
];
