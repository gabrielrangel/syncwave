import { configDotenv } from 'dotenv';
import { existsSync } from 'fs';
import _ from 'lodash';

(function () {
    if (!_.isEmpty(process.env.dotEnvHasLoaded)) {
        return;
    }

    const argvEnvMap: Record<string, string> = {
        '-p': 'API_PORT',
        '-port': 'API_PORT',
        '-u': 'API_URI',
        '-uri': 'API_URI',
        '-e': 'NODE_ENV',
        '-env': 'NODE_ENV',
        '-environment': 'NODE_ENV',
    };

    const processEnv: Record<string, string> = _.chain(process.argv)
        .clone()
        .reverse()
        .chunk(2)
        .reduce((acc, [v, k]) => _.merge(acc, { [argvEnvMap[k]]: v }), {})
        .defaults({ NODE_ENV: 'development', dotEnvHasLoaded: 'true' })
        .value();

    delete processEnv.undefined;
    const { NODE_ENV } = processEnv;

    configDotenv({
        path: (() => {
            const argmentEnvFile = process.argv[2];
            if (existsSync(argmentEnvFile)) {
                return argmentEnvFile;
            }

            const ambientEnvFile = `.env.${_.camelCase(NODE_ENV)}`;
            if (existsSync(ambientEnvFile)) {
                return ambientEnvFile;
            }

            return '.env';
        })(),
    });
    Object.assign(process.env, processEnv);
})();
