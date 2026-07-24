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

  // Override console.log during test execution to capture outputs
  const originalLog = console.log;
  const capturedLogs: string[] = [];

  const safeLog = (...args: any[]) => {
    const formatted = args
      .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg)))
      .join(' ');
    capturedLogs.push(formatted);
    logs.push(formatted);
  };

  try {
    // Basic syntax sanity check or pre-evaluation
    // Create a sandbox execution function that contains user code + test harness
    for (const testCase of testCases) {
      const caseLogs: string[] = [];
      let actualOutput: any = undefined;
      let passed = false;
      let errorMessage: string | undefined = undefined;

      try {
        // Construct code that returns the evaluation of the test function call
        const runnerScript = `
          ${userCode}

          if (typeof ${testCase.testFnCall.split('(')[0]} !== 'function' && typeof ${testCase.testFnCall} === 'undefined') {
            // Check if user code defined the function or variable
          }

          return ${testCase.testFnCall};
        `;

        // Execute inFunction context with custom console
        const customConsole = {
          log: (...args: any[]) => {
            const str = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
            caseLogs.push(str);
            logs.push(`[${testCase.inputDescription}] ${str}`);
          },
        };

        const fn = new Function('console', runnerScript);
        actualOutput = fn(customConsole);

        // Normalize expected vs actual
        let normalizedActual = actualOutput;
        if (typeof actualOutput === 'object' && actualOutput !== null) {
          normalizedActual = JSON.stringify(actualOutput);
        } else {
          normalizedActual = String(actualOutput);
        }

        const expectedTrimmed = String(testCase.expectedOutput).trim();
        const actualTrimmed = String(normalizedActual).trim();

        // Compare values
        if (actualTrimmed === expectedTrimmed) {
          passed = true;
        } else {
          // Try loose JSON parsed comparison if applicable
          try {
            const parsedActual = JSON.parse(actualTrimmed);
            const parsedExpected = JSON.parse(expectedTrimmed);
            if (JSON.stringify(parsedActual) === JSON.stringify(parsedExpected)) {
              passed = true;
            }
          } catch {
            // Keep direct compare result
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
