ratio = 1.4074
pieces = 1000
for i in range(pieces):
    if i* (i*ratio) < pieces*1.1 and i*(i*ratio)> pieces*0.9:
        print(f'{i},{i*ratio}')