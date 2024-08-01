/**
 * cron: 11 8,13,20 * * *
 * 只添加这个定时就可以了
 */
const { exec } = require('child_process');

function runScript(scriptPath) {
  return new Promise((resolve, reject) => {
    const command = `node ${scriptPath}`;
    const childProcess = exec(command);
    childProcess.stdout.on('data', (data) => {
      console.log(`${data}`);
    });

    childProcess.stderr.on('data', (data) => {
      console.error(`[${scriptPath}] stderr: ${data}`);
    });

    childProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Script ${scriptPath} exited with code ${code}`));
      }
    });
  });
}

const scripts = [
  '/ql/scripts/ele1200/elm_2048.js',
  '/ql/scripts/ele1200/elm_elge.js',
  '/ql/scripts/ele1200/elm_hctmm',
  '/ql/scripts/ele1200/elm_cycg.js',
  '/ql/scripts/ele1200/elm_mst.js',
  '/ql/scripts/ele1200/elm_lyb.js',
  '/ql/scripts/ele1200/elm_assest.js'
];

async function runScripts() {
  for (const script of scripts) {
   // console.log(`查找: ${script}`);
    try {
      await runScript(script);
    } catch (error) {
      console.error(`Error running script ${script}:`, error);
    }
  }
}

// 执行所有脚本
runScripts();
