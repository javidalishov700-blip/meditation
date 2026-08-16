import { readJson, writeJson } from './storage'

/** When false, skip the optional CDN and use baked audio only. */
export function readCellularMedia(): boolean {
  return readJson<boolean>('cellularMedia', true)
}

export function writeCellularMedia(on: boolean) {
  writeJson('cellularMedia', on)
}
