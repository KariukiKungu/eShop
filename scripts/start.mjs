import { spawn, spawnSync } from 'node:child_process';

const isWindows = process.platform === 'win32';
const command = isWindows ? 'docker.exe' : 'docker';

const dockerCheck = spawnSync(command, ['info'], { stdio: 'ignore' });
if (dockerCheck.error || dockerCheck.status !== 0) {
  console.error('Docker Desktop must be installed and running before starting eShop.');
  process.exit(1);
}

const dotnet = isWindows ? 'dotnet.exe' : 'dotnet';
const appHost = 'src/eShop.AppHost/eShop.AppHost.csproj';
const child = spawn(dotnet, ['run', '--project', appHost], {
  stdio: 'inherit',
  shell: false,
  env: {
    ...process.env,
    ASPNETCORE_ENVIRONMENT: process.env.ASPNETCORE_ENVIRONMENT ?? 'Development',
    DOTNET_ENVIRONMENT: process.env.DOTNET_ENVIRONMENT ?? 'Development'
  }
});

const stopChild = (signal) => child.kill(signal);
process.on('SIGINT', () => stopChild('SIGINT'));
process.on('SIGTERM', () => stopChild('SIGTERM'));
child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 1);
  }
});
