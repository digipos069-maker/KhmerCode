import { TestCase, TestResult } from '../types';

export interface CodeExecutionReport {
  results: TestResult[];
  passCount: number;
  totalCount: number;
  allPassed: boolean;
  logs: string[];
  runtimeMs: number;
  syntaxError?: string;
}

export function runCodeAndTest(userCode: string, testCases: TestCase[]): CodeExecutionReport {
  const startTime = performance.now();
  const logs: string[] = [];
  const testResults: TestResult[] = [];

  try {
    for (const testCase of testCases) {
      const caseLogs: string[] = [];
      let actualOutput: any = undefined;
      let passed = false;
      let errorMessage: string | undefined = undefined;

      try {
        const fnCall = testCase.testFnCall.trim();

        // 1. Check if test assertion is a HTML / DOM or String Pattern Check
        if (fnCall.startsWith('CONTAINS:')) {
          const targetPattern = fnCall.replace('CONTAINS:', '').trim();
          const cleanCode = userCode.toLowerCase();
          const cleanTarget = targetPattern.toLowerCase();

          passed = cleanCode.includes(cleanTarget);
          actualOutput = passed ? `រកឃើញ "${targetPattern}"` : `រកមិនឃើញ "${targetPattern}" នៅក្នុងកូដ`;
        }
        // 2. Check REGEX assertion
        else if (fnCall.startsWith('REGEX:')) {
          const regexStr = fnCall.replace('REGEX:', '').trim();
          const regex = new RegExp(regexStr, 'i');
          passed = regex.test(userCode);
          actualOutput = passed ? `កូដស្របតាមលក្ខខណ្ឌ ${regexStr}` : `កូដមិនត្រូវតាមលក្ខខណ្ឌ ${regexStr}`;
        }
        // 3. Check ROUTE / BACKEND SIMULATION (Express/NestJS/Laravel)
        else if (fnCall.startsWith('EVAL:')) {
          const expr = fnCall.replace('EVAL:', '').trim();
          const customConsole = {
            log: (...args: any[]) => {
              const str = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
              caseLogs.push(str);
              logs.push(`[${testCase.inputDescription}] ${str}`);
            },
          };
          const runnerScript = `
            ${userCode}
            return ${expr};
          `;
          const fn = new Function('console', runnerScript);
          actualOutput = fn(customConsole);

          const expectedTrimmed = String(testCase.expectedOutput).trim();
          const actualTrimmed = String(actualOutput).trim();
          passed = actualTrimmed === expectedTrimmed || actualTrimmed.includes(expectedTrimmed);
        }
        // 4. Standard JS / React function evaluation
        else {
          const customConsole = {
            log: (...args: any[]) => {
              const str = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
              caseLogs.push(str);
              logs.push(`[${testCase.inputDescription}] ${str}`);
            },
          };

          const runnerScript = `
            ${userCode}
            return ${fnCall};
          `;

          const fn = new Function('console', runnerScript);
          actualOutput = fn(customConsole);

          let normalizedActual = actualOutput;
          if (typeof actualOutput === 'object' && actualOutput !== null) {
            normalizedActual = JSON.stringify(actualOutput);
          } else {
            normalizedActual = String(actualOutput);
          }

          const expectedTrimmed = String(testCase.expectedOutput).trim();
          const actualTrimmed = String(normalizedActual).trim();

          if (actualTrimmed === expectedTrimmed) {
            passed = true;
          } else {
            try {
              const parsedActual = JSON.parse(actualTrimmed);
              const parsedExpected = JSON.parse(expectedTrimmed);
              if (JSON.stringify(parsedActual) === JSON.stringify(parsedExpected)) {
                passed = true;
              }
            } catch {
              // Direct match failed
            }
          }
        }
      } catch (err: any) {
        errorMessage = err.message || 'កំហុសកំឡុងពេលរត់កូដ (Execution Error)';
        passed = false;
      }

      testResults.push({
        testCaseId: testCase.id,
        passed,
        inputDesc: testCase.inputDescription,
        expected: testCase.expectedOutput,
        actual: errorMessage ? `Error: ${errorMessage}` : String(actualOutput),
        logs: caseLogs,
        errorMessage,
      });
    }

    const passCount = testResults.filter((r) => r.passed).length;
    const totalCount = testResults.length;
    const runtimeMs = Math.round(performance.now() - startTime);

    return {
      results: testResults,
      passCount,
      totalCount,
      allPassed: passCount === totalCount && totalCount > 0,
      logs,
      runtimeMs,
    };
  } catch (globalErr: any) {
    const runtimeMs = Math.round(performance.now() - startTime);
    return {
      results: [],
      passCount: 0,
      totalCount: testCases.length,
      allPassed: false,
      logs: [globalErr.message || 'Syntax Error in Code'],
      runtimeMs,
      syntaxError: globalErr.message || 'កំហុសវាក្យសម្ព័ន្ធកូដ (Syntax Error)',
    };
  }
}
