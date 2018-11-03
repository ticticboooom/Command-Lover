import { exec, ChildProcess } from 'child_process';

export default class PowershellExecution {
  public async executeCommand(command: string, workDir: string): Promise<ChildProcess> {
    const childProcess = await exec(command, {
      cwd: workDir,
    });
    return childProcess;
  }
}
