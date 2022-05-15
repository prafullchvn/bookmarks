const createTest = function (desc, test) {
  return { desc, test };
};

const runTest = function ({ desc, test }) {
  const report = {
    result: '✅',
    description: desc
  };

  try {
    test(desc);

  } catch (error) {
    report.result = '❌';
    report.expected = error.expected;
    report.actual = error.actual;

  }

  return report;
};

const runTests = function (tests) {
  return tests.map(runTest);
};

const failedTests = (reports) => {
  return reports.filter((report) => report.result === '❌')
}

const printReport = (report) => console.log(report.result, '->', report.description);

const reportsStats = function (reports) {
  return reports.reduce((counts, report) => {

    if (report.result === '✅') {
      counts.passed++;
    }
    if (report.result === '❌') {
      counts.failed++;
    }
    counts.total++;

    return counts;
  }, { passed: 0, failed: 0, total: 0 });
};

const printFailedTestResult = (report) => {
  printReport(report);
  console.log('Expected : ', report.expected);
  console.log('Actual : ', report.actual);
};

const testReports = (tests) => {
  const reports = runTests(tests);
  reports.forEach(printReport);
  const failedTestReports = failedTests(reports);

  const total = reports.length;
  const failed = failedTestReports.length;
  const passed = total - failed;
  console.log('\n' + 'Failed', failed, 'Passed', passed, 'Total', total);

  if (failed === 0) {
    failedTestReports.forEach(printFailedTestResult);
  }
}

exports.createTest = createTest
exports.testReports = testReports;
