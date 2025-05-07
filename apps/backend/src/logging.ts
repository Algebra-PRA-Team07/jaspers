import { createLogger, shimLog } from "@lvksh/logger";
import chalk from "chalk";

export const Logger = createLogger(
    {
        info: chalk.blue`INFO`,
        api: chalk.greenBright`API`,
        env: chalk.greenBright`ENV`,
        database: chalk.blueBright`DATABASE`,
        debug: chalk.yellow`! DEBUG !`,
        panic: chalk.bgRed.white`!! PANIC !!`,
        console: chalk.bgGreen.white`CONSOLE`,
    },
    {
        postProcessors: [
            (lines, method) => {
                if (method.name !== "panic") return lines;

                process.stdout.write(lines.join("\n") + "\n");

                // eslint-disable-next-line unicorn/no-process-exit
                process.exit(1);
            },
        ],
    },
);
shimLog(Logger, "console");
