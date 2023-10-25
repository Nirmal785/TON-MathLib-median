import { toNano } from 'ton-core';
import { Issue16Factorial } from '../wrappers/Issue16Factorial';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const issue16Factorial = provider.open(Issue16Factorial.createFromConfig({}, await compile('Issue16Factorial')));

    await issue16Factorial.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(issue16Factorial.address);

    // run methods on `issue16Factorial`
}
