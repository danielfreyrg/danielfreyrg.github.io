from os import listdir
from os.path import isfile, join
import os
import shutil

mypath = "/Users/danielfreyrgylfason/Documents/forrit/danielfreyrg.github.io/doorcombos/images"
files = [f for f in listdir(mypath) if isfile(join(mypath, f))]
y = "{"
for x in files: 
    formatted = x[0:x.index(".")]
    # print(formatted)
    y += f'"{formatted}":"{x}",'
y += "}"
print(y)