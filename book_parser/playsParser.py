import csv
from bs4 import BeautifulSoup

# init csv 
f = open('the_robbers.csv', 'w', encoding='utf-8')
header = ['Act', 'Scene', 'Line', 'Text']
data = ['','','','']
writer = csv.writer(f)
writer.writerow(header)
# parse html
with open("the_robbers.html", 'rb') as fp:
    soup = BeautifulSoup(fp, 'html.parser')

# variables to store line data in
line = 0
act = ""
scene = ""
text = ""  
#loop through texts in html
for tag in soup.select("p, h2, pre"):
    # if it is a new act update act number and continue loop
    if tag.get_text().strip().startswith("ACT"):
        act=tag.get_text().strip()
        line=0
        continue
    # if it is a new scene update scene number and continue loop
    elif tag.get_text().strip().startswith("SCENE"):
        scene=tag.get_text().strip()
        line=0
        continue
    else: 
        text = tag.get_text().strip()
        text.replace("\n", " ").replace("\r", " ")
        line+=1
        data = [act, scene, str(line), text]
    writer.writerow(data)
f.close() 
