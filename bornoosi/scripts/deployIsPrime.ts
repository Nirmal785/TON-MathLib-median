import { toNano } from 'ton-core';
import { IsPrime } from '../wrappers/IsPrime';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const isPrime = provider.open(IsPrime.createFromConfig({}, await compile('IsPrime')));

    await isPrime.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(isPrime.address);

    // run methods on `isPrime`
}
