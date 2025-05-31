import { promisify } from "util";
import { exec } from "child_process";
import { rm, mkdir, readdir, readFile, writeFile } from "fs/promises";
import path from "path";

async function getData(tag: string) {
  // Remove old files.
  try {
    await rm(path.join(import.meta.dirname, "cobblemon"), {
      recursive: true,
      force: true,
    });
  } catch (error) {
    console.error(error);
  }
  console.log(`Getting raw data for ${tag}`);

  // Clone project at given tag.
  await promisify(exec)(
    `git clone --branch ${tag} --single-branch https://gitlab.com/cable-mc/cobblemon.git`
  );

  const speciesGroupDir = path.join(
    import.meta.dirname,
    "cobblemon/common/src/main/resources/data/cobblemon/species"
  );
  const speciesList: string[] = [];
  const labelsMap: Record<string, string[]> = {};
  // For each Pokemon data file...
  for (let speciesGroupFolder of await readdir(speciesGroupDir)) {
    for (let speciesFile of await readdir(
      path.join(speciesGroupDir, speciesGroupFolder)
    )) {
      const { labels } = JSON.parse(
        await readFile(
          path.join(speciesGroupDir, speciesGroupFolder, speciesFile),
          {
            encoding: "utf-8",
          }
        )
      ) as { labels?: string[] };
      const speciesName = speciesFile.slice(0, -".json".length);
      // Add name of Pokemon to big list of names.
      speciesList.push(speciesName);
      // Add tags of Pokemon to big map of tags : names.
      if (labels) {
        for (let label of labels) {
          if (!(label in labelsMap)) labelsMap[label] = [];
          labelsMap[label].push(speciesName);
        }
      }
    }
  }

  // Read in existing list of versions.
  const versionListPath = path.join(import.meta.dirname, "../public/versions.json");
  let versionList = JSON.parse(
    await readFile(versionListPath, {
      encoding: "utf-8",
    })
  ) as string[];
  // Add this version to the list.
  versionList = [...new Set([...versionList, tag])];
  // Output updated versions list.
  await writeFile(versionListPath, JSON.stringify(versionList, null, 2));
  // Create directory for this version.
  const outputDir = path.join(import.meta.dirname, "../public", tag);
  try {
    await mkdir(outputDir);
  } catch (error) {}
  // Output JSON files to directory for this version.
  await writeFile(
    path.join(outputDir, "labels.json"),
    JSON.stringify(labelsMap, null, 2)
  );
  await writeFile(
    path.join(outputDir, "species.json"),
    JSON.stringify(speciesList, null, 2)
  );
}

getData(process.argv[2]);
