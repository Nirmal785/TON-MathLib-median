import { toNano } from 'ton-core';
import { InnerProd } from '../wrappers/InnerProd';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const innerProd = provider.open(InnerProd.createFromConfig({}, await compile('InnerProd')));

    await innerProd.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(innerProd.address);

    // run methods on `innerProd`
}
