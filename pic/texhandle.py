import json

fpath = "C:/works/VLiverSim/VLiverSim/resource/assets/chess.json"
with open(fpath, mode='r+') as f:
    obj = json.load(f)
    frames = obj['frames']
    for k in frames:
        mc = frames[k]
        w = mc['w']
        h = mc['h']
        mc['sourceW'] = w
        mc['sourceH'] = h
        mc['offX'] = 0
        mc['offY'] = 0
    print(frames)
    s = json.dumps(obj)
    f.seek(0)
    f.truncate()
    f.write(str(s))

    
