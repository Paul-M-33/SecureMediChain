export function arrayBufferToHex(arrayBuffer) {
    return Array.from(new Uint8Array(arrayBuffer))
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  }