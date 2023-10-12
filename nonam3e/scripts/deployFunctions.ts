import { toNano } from 'ton-core';
import { Functions } from '../wrappers/Functions';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const functions = provider.open(Functions.createFromConfig({}, await compile('Functions')));

    await functions.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(functions.address);

    // run methods on `functions`
}
