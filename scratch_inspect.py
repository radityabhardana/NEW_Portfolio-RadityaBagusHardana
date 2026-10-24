import json, struct

with open(r'public/models/karakter.glb', 'rb') as f:
    f.read(12)
    clen, _ = struct.unpack('<II', f.read(8))
    gltf = json.loads(f.read(clen).decode('utf-8'))

print('accessors count:', len(gltf['accessors']))
for i, acc in enumerate(gltf['accessors']):
    print(f"acc {i}: type={acc.get('type')}, compType={acc.get('componentType')}, count={acc.get('count')}, bv={acc.get('bufferView')}, min={acc.get('min')}, max={acc.get('max')}")

print('\nbufferViews count:', len(gltf['bufferViews']))
for i, bv in enumerate(gltf['bufferViews']):
    print(f"bv {i}: len={bv.get('byteLength')}, off={bv.get('byteOffset')}, target={bv.get('target')}, ext={list(bv.get('extensions', {}).keys())}")

print('\nmeshes:', gltf['meshes'])
print('\nextensionsUsed:', gltf.get('extensionsUsed'))
print('\nextensionsRequired:', gltf.get('extensionsRequired'))
