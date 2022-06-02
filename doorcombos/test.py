from os import listdir
from os.path import isfile, join
import os
import shutil

mypath = "/Users/danielwork/Documents/GitHub/danielfreyrg.github.io/doorcombos/images"
files = [f for f in listdir(mypath) if isfile(join(mypath, f))]
y = "{"
for x in files: 
    if x[0] == "K":
        print(x)
#     formatted = x[0:x.index(".")]
#     # print(formatted)
#     y += f'"{formatted}":"{x}",'
# y += "}"
# print(y)

#function that returns the width and height of an image
def measure(img):
    
