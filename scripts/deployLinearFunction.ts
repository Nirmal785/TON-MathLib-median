import { toNano } from 'ton-core';
import { LinearFunction } from '../wrappers/LinearFunction';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const linearFunction = provider.open(LinearFunction.createFromConfig({}, await compile('LinearFunction')));

    await linearFunction.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(linearFunction.address);

    // run methods on `linearFunction`
}
