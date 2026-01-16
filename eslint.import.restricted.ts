import fs from 'node:fs'
import path from 'node:path'

const featuresDir = path.join(import.meta.dirname, 'src/features')

const featureNames = fs
  .readdirSync(featuresDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)

export const crossFeatureZones = featureNames.flatMap((target) =>
  featureNames
    .filter((from) => from !== target)
    .map((from) => ({
      target: `./src/features/${target}`,
      from: `./src/features/${from}`,
      message: `Cross-feature import is not allowed: "${target}" must not import from "${from}".`
    }))
)
