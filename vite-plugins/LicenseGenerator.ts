import { Plugin } from 'vite';
import { execFile } from 'child_process';
import { readJson } from 'fs-extra';
import { LicenseItem } from '../src/model/License';

const ModuleName = 'Licenses';

type Package = {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
};

type License = {
  licenses: string;
  repository?: string;
  url?: string;
};

export const LicenseGeneratorPlugin = (excludes?: readonly string[]): Plugin => {
  return {
    name: 'license-generator',
    resolveId(id) {
      if (id === ModuleName) {
        return ModuleName;
      }
    },
    async load(id) {
      if (id !== ModuleName) {
        return undefined;
      }

      const allLicensesRaw = await new Promise<string>((res, rej) => {
        execFile('pnpx', ['license-checker', '--json'], (err, stdout) => {
          if (err !== null) {
            rej(err);
            return;
          }

          res(stdout);
        });
      });
      const allLicensesObj: Record<string, License> = JSON.parse(allLicensesRaw);
      const allLicenses = new Map<string, License>(
        Object.entries(allLicensesObj).map((kvp) => [kvp[0].slice(0, kvp[0].lastIndexOf('@')), kvp[1]]),
      );

      const packageObj: Package = await readJson('./package.json');
      const deps = Object.entries(packageObj.dependencies).concat(Object.entries(packageObj.devDependencies));
      const result: LicenseItem[] = [];

      for (const [d, v] of deps) {
        let depKey = d;
        if (v.startsWith('npm:')) {
          depKey = v.slice(0, v.lastIndexOf('@')).replace('npm:', '');
        }

        if (excludes?.includes(depKey)) {
          continue;
        }
        const license = allLicenses.get(depKey);
        if (license === undefined) {
          throw new Error(`次のパッケージのライセンス情報を発見できませんでした: ${d}(${depKey})`);
        }
        const item: LicenseItem = {
          name: d,
          license: license.licenses,
          url: license.repository ?? license.url ?? '',
          category: 'dependency',
        };
        result.push(item);
      }

      return `export const Licenses = ${JSON.stringify(result)}`;
    },
  };
};
