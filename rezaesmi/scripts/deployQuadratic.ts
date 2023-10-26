import { toNano } from 'ton-core';
import { Quadratic } from '../wrappers/Quadratic';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const quadratic = provider.open(Quadratic.createFromConfig({}, await compile('Quadratic')));

    await quadratic.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(quadratic.address);

    // run methods on `quadratic`
}
