import os
import json
from collections import OrderedDict

path = './'
cnt = 0
bg_data = OrderedDict()

temp_list = []
for file in os.listdir(path):
    if file.endswith(".jpg"):
        cnt += 1
        temp_list.append('./static/imgs/background/'+file)

bg_data["bgCnt"] = cnt
bg_data["bgUrl"] = temp_list

print(json.dumps(bg_data, ensure_ascii=False, indent="\t"))


json_path = 'C:/Git/chrome_app/storage/json/bgList.json'
with open(json_path, 'w', encoding="utf-8") as make_file:
    json.dump(bg_data, make_file, ensure_ascii=False, indent="\t")
